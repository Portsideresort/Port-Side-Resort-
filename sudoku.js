(() => {
  "use strict";
  const section = document.getElementById("sudoku"), text = window.PortSideSudokuText;
  if (!section || !text) return;

  // Deliberately independent of preview scores and the Star Catch game.
  const SESSION_KEY = "portSideSudokuCloudSessionsV1", DRAFT_PREFIX = "portSideSudokuCloudDraftV1:";
  const MAX_HINTS = 5;
  const $ = id => document.getElementById(id);
  const grid = $("sudokuGrid"), pad = $("sudokuNumberPad"), status = $("sudokuStatus");
  let language = "de", selectedIndex = 0, currentGame = null, currentPlayer = null;
  let serverEntries = Array(81).fill(0), validation = Array(81).fill("");
  let messageKey = "boardLocked", messageParams = {}, messageTone = "";
  let runningSince = null, lastCheckpoint = 0, storageAvailable = true, dirty = false;
  let pendingRequests = 0, requestQueue = Promise.resolve(), pauseRequested = true, pauseQueued = false;
  let leaderboard = [], leaderboardLoading = false, leaderboardUnavailable = false, lastLeaderboardRefresh = 0;
  let returnFocusToGrid = false;

  function readSessions() {
    try {
      const saved = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
      if (saved?.version === 1 && saved.profiles && typeof saved.profiles === "object") return saved;
    } catch { /* Online play can still work without device storage. */ }
    return { version: 1, activeId: null, profiles: {} };
  }
  const sessions = readSessions();
  const profile = () => sessions.profiles[sessions.activeId] || null;
  const game = () => currentGame;
  const busy = () => pendingRequests > 0;
  const completionKey = current => current.hints || current.checks || current.replay ? "unrankedComplete" : "complete";
  const hintsRemaining = current => Math.max(0, MAX_HINTS - (Number(current?.hints) || 0));
  const tr = (key, params = {}) => (text[language][key] || text.de[key] || key)
    .replace(/\{(\w+)\}/g, (_, name) => String(params[name] ?? ""));
  const validEntries = entries => Array.isArray(entries) && entries.length === 81 && entries.every(value => Number.isInteger(value) && value >= 0 && value <= 9);
  const remaining = () => game() ? game().puzzle.filter((value, index) => !value && !game().entries[index]).length : 49;

  function store(operation) {
    try { operation(); storageAvailable = true; } catch { storageAvailable = false; }
    $("sudokuStorageWarning").hidden = storageAvailable;
  }
  function saveSessions() {
    store(() => {
      const latest = readSessions();
      latest.activeId = sessions.activeId; Object.assign(latest.profiles, sessions.profiles);
      localStorage.setItem(SESSION_KEY, JSON.stringify(latest));
    });
  }
  function saveDraft() {
    if (!sessions.activeId || !game()) return;
    store(() => {
      const key = DRAFT_PREFIX + sessions.activeId;
      if (!dirty || game().completedAt) localStorage.removeItem(key);
      else localStorage.setItem(key, JSON.stringify({ gameId: game().id, version: game().version,
        entries: game().entries, baseEntries: serverEntries, savedAt: Date.now() }));
    });
  }
  function recoverDraft() {
    try {
      const draft = JSON.parse(localStorage.getItem(DRAFT_PREFIX + sessions.activeId) || "null");
      if (!draft || draft.gameId !== game()?.id || game().completedAt || !validEntries(draft.entries) || !validEntries(draft.baseEntries)) return;
      // Only this device's changed cells overlay the latest server snapshot.
      game().entries = game().entries.map((value, index) =>
        !game().puzzle[index] && draft.entries[index] !== draft.baseEntries[index] ? draft.entries[index] : value);
      dirty = game().entries.some((value, index) => value !== serverEntries[index]); saveDraft();
    } catch { /* An invalid draft never replaces the server game. */ }
  }
  function applyGame(incoming, localChanges = null) {
    if (!incoming || typeof incoming.id !== "string" || !validEntries(incoming.puzzle) || !validEntries(incoming.entries) ||
        !Number.isInteger(incoming.version) || !Number.isFinite(incoming.elapsedMs) || incoming.elapsedMs < 0) throw new Error("invalid_game");
    // Explicit allowlist: never retain a solution or private server fields.
    currentGame = { id: incoming.id, puzzle: incoming.puzzle.slice(), entries: incoming.entries.slice(),
      elapsedMs: incoming.elapsedMs, hints: Number(incoming.hints) || 0, checks: Number(incoming.checks) || 0,
      replay: Boolean(incoming.replay), completedAt: incoming.completedAt || null, version: incoming.version };
    serverEntries = currentGame.entries.slice();
    if (localChanges && localChanges.id === currentGame.id && !currentGame.completedAt) {
      currentGame.entries = currentGame.entries.map((value, index) => !currentGame.puzzle[index] &&
        localChanges.entries[index] !== localChanges.base[index] ? localChanges.entries[index] : value);
    }
    dirty = currentGame.entries.some((value, index) => value !== serverEntries[index]);
  }
  function elapsedMs() {
    return (game()?.elapsedMs || 0) + (runningSince === null ? 0 : Math.max(0, performance.now() - runningSince));
  }
  function freezeClock() {
    if (game() && runningSince !== null) game().elapsedMs = elapsedMs();
    runningSince = null;
  }
  function formatTime(milliseconds) {
    const total = Math.floor(Math.max(0, milliseconds) / 1000);
    return String(Math.floor(total / 60)).padStart(2, "0") + ":" + String(total % 60).padStart(2, "0");
  }
  function updateClock() { $("sudokuTimer").textContent = formatTime(elapsedMs()); }
  function setStatus(key, params = {}, tone = "") {
    messageKey = key; messageParams = params; messageTone = tone;
    status.textContent = tr(key, params);
    status.classList.toggle("is-success", tone === "success"); status.classList.toggle("is-error", tone === "error");
  }
  async function api(path, { method = "GET", body, authenticated = true, keepalive = false } = {}) {
    const base = String(window.PORT_SIDE_SUDOKU_API || "").replace(/\/+$/, "");
    if (!base) throw new Error("service_unavailable");
    const headers = { Accept: "application/json" };
    if (body !== undefined) headers["Content-Type"] = "application/json";
    if (authenticated) {
      if (!profile()?.token) throw Object.assign(new Error("unauthorized"), { status: 401 });
      headers.Authorization = "Bearer " + profile().token;
    }
    const controller = new AbortController(), timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(base + path, { method, headers, body: body === undefined ? undefined : JSON.stringify(body),
        mode: "cors", credentials: "omit", cache: "no-store", keepalive, signal: controller.signal });
      const payload = await response.json();
      if (!response.ok) throw Object.assign(new Error(payload.error || "request_failed"), { status: response.status, payload });
      return payload;
    } finally { window.clearTimeout(timeout); }
  }
  function handleFailure(error) {
    freezeClock(); pauseRequested = true; saveDraft();
    if (error.status === 401) {
      if (profile()) profile().token = null;
      sessions.activeId = null; saveSessions(); currentGame = null; currentPlayer = null;
      setStatus("sessionExpired", {}, "error");
    } else setStatus(error.message === "hint_limit" ? "hintLimit" : "syncError", {}, "error");
  }
  function enqueue(work) {
    if (grid.contains(document.activeElement)) returnFocusToGrid = true;
    pendingRequests += 1; render();
    const task = requestQueue.then(async () => {
      try { return await work(); }
      catch (error) { handleFailure(error); return false; }
      finally {
        pendingRequests -= 1; render();
        if (!busy() && returnFocusToGrid) {
          if (runningSince !== null && !document.hidden &&
              (document.activeElement === document.body || grid.contains(document.activeElement))) {
            grid.querySelector('[data-index="' + selectedIndex + '"]')?.focus({ preventScroll: true });
          }
          returnFocusToGrid = false;
        }
      }
    });
    requestQueue = task.catch(() => {}); return task;
  }
  async function sendAction(action, { keepalive = false, cellIndex } = {}) {
    if (!game()) return false;
    const wasRunning = runningSince !== null;
    const local = { id: game().id, entries: game().entries.slice(), base: serverEntries.slice() };
    const body = { action, gameId: game().id, version: game().version };
    if (["progress", "pause", "resume", "hint", "check"].includes(action)) body.entries = local.entries;
    if (Number.isInteger(cellIndex)) body.cellIndex = cellIndex;
    saveDraft(); setStatus("saving");
    let result;
    try { result = await api("/api/game", { method: "POST", body, keepalive }); }
    catch (error) {
      if (error.status === 409 && error.payload?.game) {
        const hintLimit = error.message === "hint_limit";
        applyGame(error.payload.game, local);
        runningSince = hintLimit && wasRunning && !document.hidden && !pauseRequested ? performance.now() : null;
        if (!hintLimit) pauseRequested = true;
        validation.fill(""); saveDraft(); setStatus(hintLimit ? "hintLimit" : "syncError", {}, "error"); return false;
      }
      throw error;
    }
    applyGame(result.game);
    validation = Array.isArray(result.validation) && result.validation.length === 81 ?
      result.validation.map(value => ["wrong", "correct"].includes(value) ? value : "") : Array(81).fill("");
    runningSince = !game().completedAt && !document.hidden && !pauseRequested &&
      (action === "resume" || (wasRunning && !["pause", "new", "restart"].includes(action))) ? performance.now() : null;
    lastCheckpoint = performance.now(); saveDraft();
    if (game().completedAt) {
      pauseRequested = true;
      setStatus(result.ranked === false ? "unrankedComplete" : completionKey(game()), { time: formatTime(game().elapsedMs) }, "success");
      void refreshLeaderboard();
    } else if (action === "hint") setStatus("hintDone", { remaining: hintsRemaining(game()) }, "success");
    else if (action === "check") {
      const wrong = validation.filter(value => value === "wrong").length;
      setStatus(wrong ? "answersWrong" : "remaining", { count: wrong || remaining() }, wrong ? "error" : "");
    } else setStatus(action === "pause" ? "restored" : "savedOnline");
    return true;
  }
  async function refreshLeaderboard() {
    if (leaderboardLoading) return;
    leaderboardLoading = true;
    try {
      const result = await api("/api/leaderboard", { authenticated: false });
      if (!Array.isArray(result.entries)) throw new Error("invalid_leaderboard");
      leaderboard = result.entries.filter(score => typeof score.name === "string" && Number.isFinite(score.elapsedMs) && score.elapsedMs >= 0)
        .sort((a, b) => a.elapsedMs - b.elapsedMs || a.completedAt - b.completedAt).slice(0, 10);
      leaderboardUnavailable = false;
    } catch { leaderboardUnavailable = true; }
    finally { leaderboardLoading = false; lastLeaderboardRefresh = performance.now(); renderLeaderboard(); }
  }
  function selectFirstEmpty() {
    selectedIndex = game() ? game().puzzle.findIndex((value, index) => !value && !game().entries[index]) : 0;
    if (selectedIndex < 0) selectedIndex = game().puzzle.findIndex(value => !value);
  }
  function renderGrid() {
    const current = game(), values = current ? current.puzzle.map((value, index) => value || current.entries[index]) : Array(81).fill(0);
    const selectedValue = values[selectedIndex];
    grid.replaceChildren(); grid.setAttribute("aria-label", tr("boardAria"));
    grid.inert = busy() || !current || (runningSince === null && !current.completedAt);
    for (let index = 0; index < 81; index++) {
      const row = Math.floor(index / 9), column = index % 9, fixed = Boolean(current?.puzzle[index]), value = values[index];
      const cell = document.createElement("button");
      cell.type = "button"; cell.className = "sudoku-cell"; cell.dataset.index = String(index);
      cell.tabIndex = index === selectedIndex ? 0 : -1;
      cell.setAttribute("role", "gridcell"); cell.setAttribute("aria-selected", String(index === selectedIndex));
      if (fixed) cell.classList.add("is-fixed");
      if (index === selectedIndex && current) cell.classList.add("is-selected");
      if (current && (row === Math.floor(selectedIndex / 9) || column === selectedIndex % 9 ||
        (Math.floor(row / 3) === Math.floor(selectedIndex / 27) && Math.floor(column / 3) === Math.floor((selectedIndex % 9) / 3)))) cell.classList.add("is-related");
      if (selectedValue && value === selectedValue && index !== selectedIndex) cell.classList.add("is-same-number");
      if (validation[index]) cell.classList.add(validation[index] === "wrong" ? "is-wrong" : "is-correct");
      if (value) cell.textContent = String(value);
      cell.setAttribute("aria-label", tr("cellLabel", { row: row + 1, column: column + 1,
        value: fixed ? tr("fixed", { value }) : value ? tr("entered", { value }) : tr("empty") }));
      if (column === 2 || column === 5) cell.classList.add("sudoku-box-right");
      if (row === 2 || row === 5) cell.classList.add("sudoku-box-bottom"); grid.append(cell);
    }
  }
  function renderPad() {
    pad.replaceChildren(); pad.setAttribute("aria-label", tr("numberPad"));
    for (const value of [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) {
      const button = document.createElement("button"); button.type = "button";
      button.className = "sudoku-number-button" + (value === 0 ? " is-erase" : "");
      button.dataset.value = String(value); button.textContent = value ? String(value) : tr("erase");
      button.disabled = busy() || runningSince === null || Boolean(game()?.completedAt); pad.append(button);
    }
  }
  function renderLeaderboard() {
    const list = $("sudokuLeaderboardBody"); list.replaceChildren();
    $("sudokuLeaderboardEmpty").hidden = leaderboard.length > 0 && !leaderboardUnavailable;
    $("sudokuLeaderboardEmpty").textContent = tr(leaderboardUnavailable ? "rankingUnavailable" : "leaderboardEmpty");
    $("sudokuLeaderboardTable").hidden = leaderboard.length === 0 || leaderboardUnavailable;
    leaderboard.forEach((score, index) => {
      const row = document.createElement("tr");
      for (const value of [String(index + 1).padStart(2, "0"), score.name, formatTime(score.elapsedMs)]) {
        const cell = document.createElement("td"); cell.textContent = value; row.append(cell);
      }
      list.append(row);
    });
  }
  function render() {
    const current = game(), paused = Boolean(current && runningSince === null && !current.completedAt);
    section.classList.toggle("has-sudoku-player", Boolean(currentPlayer)); section.setAttribute("aria-busy", String(busy()));
    $("sudokuJoinForm").hidden = Boolean(currentPlayer);
    $("sudokuJoinForm").querySelectorAll("input, button").forEach(element => { element.disabled = busy(); });
    $("sudokuPlayerBar").hidden = !currentPlayer; $("sudokuPlayerName").textContent = currentPlayer?.name || "";
    $("sudokuChangePlayer").disabled = busy();
    $("sudokuBoardOverlay").hidden = Boolean(current && !paused);
    $("sudokuOverlayTitle").textContent = tr(paused ? "paused" : "joinTitle");
    $("sudokuOverlayNote").textContent = tr(paused ? "pausedNote" : "boardLocked");
    $("sudokuResume").hidden = !paused; $("sudokuResume").disabled = busy();
    $("sudokuPause").hidden = !current || Boolean(current.completedAt) || paused; $("sudokuPause").disabled = busy();
    $("sudokuBoardWrap").classList.toggle("is-locked", !current || paused);
    $("sudokuResult").hidden = !current?.completedAt;
    if (current?.completedAt) $("sudokuResultTime").textContent = formatTime(current.elapsedMs);
    const total = current ? current.puzzle.filter(value => !value).length : 49;
    const filled = current ? current.entries.filter((value, index) => value && !current.puzzle[index]).length : 0;
    $("sudokuProgressText").textContent = tr("progressCount", { filled, total });
    $("sudokuProgress").max = total; $("sudokuProgress").value = filled;
    $("sudokuProgress").setAttribute("aria-label", tr("progressLabel"));
    for (const id of ["sudokuHint", "sudokuCheck"]) $(id).disabled = busy() || !current || paused || Boolean(current.completedAt);
    $("sudokuHint").disabled ||= hintsRemaining(current) === 0;
    $("sudokuHint").querySelector("[data-sudoku-i18n]").textContent = tr("hintRemaining", { remaining: hintsRemaining(current) });
    for (const id of ["sudokuRestart", "sudokuNew"]) $(id).disabled = busy() || !current;
    renderGrid(); renderPad(); renderLeaderboard(); updateClock(); setStatus(messageKey, messageParams, messageTone);
  }
  function resume() {
    if (busy() || !game() || game().completedAt || runningSince !== null || document.hidden) return Promise.resolve(false);
    return enqueue(async () => {
      if ((dirty || remaining() === 0) && !await sendAction("progress")) return false;
      if (game().completedAt) return true;
      pauseRequested = false;
      if (!await sendAction("resume")) return false;
      setStatus("remaining", { count: remaining() }); return true;
    });
  }
  function pause({ keepalive = false } = {}) {
    pauseRequested = true; freezeClock(); saveDraft();
    if (!game() || game().completedAt || pauseQueued) { render(); return Promise.resolve(true); }
    pauseQueued = true;
    return enqueue(async () => {
      try { return await sendAction("pause", { keepalive }); }
      finally { pauseQueued = false; }
    });
  }
  function setEntry(value) {
    if (busy() || !game() || game().completedAt || runningSince === null || game().puzzle[selectedIndex]) return;
    game().entries[selectedIndex] = value; validation[selectedIndex] = "";
    dirty = game().entries.some((entry, index) => entry !== serverEntries[index]); saveDraft();
    setStatus("remaining", { count: remaining() }); render();
    // A full board is only complete after the server confirms it.
    if (remaining() === 0) void enqueue(() => sendAction("progress"));
  }
  function startPlayer(event) {
    event.preventDefault(); if (busy()) return;
    const name = $("sudokuPlayerInput").value.trim().replace(/\s+/g, " "), room = $("sudokuRoomInput").value.trim().toUpperCase();
    if (!/\p{L}/u.test(name) || name.length < 2 || name.length > 30 || !/^[A-Z0-9-]{1,8}$/.test(room)) {
      $("sudokuJoinError").hidden = false; $("sudokuJoinError").textContent = tr("invalidProfile"); return;
    }
    return enqueue(async () => {
      setStatus("connecting");
      const id = name.toLocaleLowerCase("en-US") + "|" + room;
      const existingToken = sessions.profiles[id]?.token;
      let result;
      if (typeof existingToken === "string" && existingToken) {
        // Name/room only select a token already stored on this device. They are
        // never credentials for looking up someone else's game remotely.
        sessions.activeId = id; saveSessions(); result = await api("/api/session");
      } else result = await api("/api/session", { method: "POST", body: { name, room }, authenticated: false });
      const token = existingToken || result.token;
      if (typeof token !== "string" || !token || typeof result.player?.name !== "string") throw new Error("invalid_session");
      sessions.activeId = id;
      sessions.profiles[id] = { token, name: result.player.name };
      currentPlayer = { name: result.player.name }; applyGame(result.game); recoverDraft(); saveSessions();
      $("sudokuJoinError").hidden = true; validation.fill(""); selectFirstEmpty();
      if ((dirty || remaining() === 0) && !game().completedAt && !await sendAction("progress")) return false;
      if (game().completedAt) { setStatus(completionKey(game()), { time: formatTime(game().elapsedMs) }, "success"); return true; }
      pauseRequested = document.hidden; return await sendAction(document.hidden ? "pause" : "resume");
    });
  }
  function checkAnswers() {
    if (!busy() && game() && runningSince !== null && !game().completedAt) return enqueue(() => sendAction("check"));
  }
  function giveHint() {
    if (busy() || !game() || runningSince === null || game().completedAt) return;
    if (hintsRemaining(game()) === 0) { setStatus("hintLimit"); return; }
    return enqueue(() => sendAction("hint", { cellIndex: selectedIndex }));
  }
  function replaceGame(action, confirmKey, doneKey) {
    if (busy() || !game() || !window.confirm(tr(confirmKey))) return;
    pauseRequested = true; freezeClock(); saveDraft();
    return enqueue(async () => {
      if (dirty && !await sendAction("pause")) return false;
      if (!await sendAction(action)) return false;
      validation.fill(""); selectFirstEmpty(); pauseRequested = document.hidden;
      if (!document.hidden && !await sendAction("resume")) return false;
      setStatus(doneKey); return true;
    });
  }
  async function restoreSession() {
    if (!profile()?.token) return;
    return enqueue(async () => {
      setStatus("connecting"); const result = await api("/api/session");
      if (typeof result.player?.name !== "string") throw new Error("invalid_session");
      currentPlayer = { name: result.player.name }; applyGame(result.game); recoverDraft(); selectFirstEmpty(); pauseRequested = true;
      if (!game().completedAt) return await sendAction("pause");
      setStatus(completionKey(game()), { time: formatTime(game().elapsedMs) }, "success"); return true;
    });
  }
  function localize() {
    language = typeof currentLanguage === "string" && text[currentLanguage] ? currentLanguage : "de";
    document.querySelectorAll("[data-sudoku-i18n]").forEach(element => { element.textContent = tr(element.dataset.sudokuI18n); }); render();
  }
  grid.addEventListener("click", event => {
    const cell = event.target.closest("[data-index]"); if (!cell || busy() || runningSince === null) return;
    selectedIndex = Number(cell.dataset.index); renderGrid();
    grid.querySelector('[data-index="' + selectedIndex + '"]')?.focus({ preventScroll: true });
  });
  grid.addEventListener("keydown", event => {
    if (busy() || runningSince === null) return;
    const movement = { ArrowUp: -9, ArrowDown: 9, ArrowLeft: -1, ArrowRight: 1 }[event.key];
    if (movement) { event.preventDefault(); selectedIndex = (selectedIndex + movement + 81) % 81; renderGrid(); }
    else if (/^[1-9]$/.test(event.key)) { event.preventDefault(); setEntry(Number(event.key)); }
    else if (["Backspace", "Delete", "0"].includes(event.key)) { event.preventDefault(); setEntry(0); }
    else return;
    grid.querySelector('[data-index="' + selectedIndex + '"]')?.focus({ preventScroll: true });
  });
  pad.addEventListener("click", event => {
    const button = event.target.closest("[data-value]"); if (button && !button.disabled) setEntry(Number(button.dataset.value));
  });
  $("sudokuJoinForm").addEventListener("submit", startPlayer);
  $("sudokuResume").addEventListener("click", resume);
  $("sudokuPause").addEventListener("click", () => { void pause(); });
  $("sudokuHint").addEventListener("click", giveHint);
  $("sudokuCheck").addEventListener("click", checkAnswers);
  $("sudokuRestart").addEventListener("click", () => replaceGame("restart", "resetConfirm", "resetDone"));
  $("sudokuNew").addEventListener("click", () => replaceGame("new", "newConfirm", "randomStarted"));
  $("sudokuChangePlayer").addEventListener("click", async () => {
    if (busy() || !window.confirm(tr("confirmChange"))) return;
    if (!await pause()) return;
    sessions.activeId = null; currentPlayer = null; currentGame = null; dirty = false;
    $("sudokuJoinForm").reset(); saveSessions(); validation.fill("");
    setStatus("boardLocked"); render(); $("sudokuPlayerInput").focus({ preventScroll: true });
  });
  document.addEventListener("visibilitychange", () => { if (document.hidden) void pause({ keepalive: true }); else void refreshLeaderboard(); });
  window.addEventListener("pagehide", () => { void pause({ keepalive: true }); });
  window.addEventListener("online", () => { void refreshLeaderboard(); if (!game() && profile()?.token) void restoreSession(); });
  window.addEventListener("portside:languagechange", localize);
  window.setInterval(() => {
    updateClock();
    if (!document.hidden && performance.now() - lastLeaderboardRefresh >= 60000) void refreshLeaderboard();
    if (!busy() && runningSince !== null && performance.now() - lastCheckpoint >= 15000) {
      lastCheckpoint = performance.now(); void enqueue(() => sendAction("progress"));
    }
  }, 250);
  localize(); void refreshLeaderboard(); void restoreSession();
  if (["localhost", "127.0.0.1"].includes(location.hostname) && new URLSearchParams(location.search).has("sudoku-demo")) {
    window.addEventListener("load", () => window.setTimeout(() => section.scrollIntoView({ block: "start" }), 120));
  }
})();
