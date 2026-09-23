"use strict";

// Run with: node --test tests/sudoku-cloud-ui.test.cjs
// Exercises the unmodified browser source in a small DOM fixture with a mock
// service. No network calls, real tokens, or browser profiles are involved.
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const test = require("node:test");
const engine = require("../sudoku-engine.js");
const source = fs.readFileSync(path.join(__dirname, "../sudoku.js"), "utf8").replace(/\}\)\(\);\s*$/,
  "globalThis.testAPI = { game, startPlayer, resume, pause, setEntry, giveHint, checkAnswers, replaceGame, " +
  "select: index => { selectedIndex = index; }, idle: () => requestQueue, " +
  "snapshot: () => ({ dirty, runningSince, messageKey, currentPlayer, validation, sessions }) }; })();");
const translations = fs.readFileSync(path.join(__dirname, "../sudoku-i18n.js"), "utf8");
const clone = value => JSON.parse(JSON.stringify(value));

function fixture() {
  let now = 1000, counter = 0, failure = null;
  const storage = {}, requests = [], ranking = [];
  function fresh() {
    const board = engine.generate("mock-" + (++counter));
    return { id: "g" + counter, puzzle: board.puzzle, entries: Array(81).fill(0), elapsedMs: 0,
      hints: 0, checks: 0, replay: false, completedAt: null, version: 1,
      _solution: board.solution, _running: null };
  }
  let server = fresh();
  const publicGame = () => Object.fromEntries(Object.entries(server).filter(([key]) => !key.startsWith("_")));
  const reply = (status, payload) => ({ ok: status >= 200 && status < 300, status, json: async () => clone(payload) });
  async function fetchMock(url, options) {
    const route = new URL(url).pathname, body = options.body ? JSON.parse(options.body) : null;
    requests.push({ route, body, headers: options.headers, keepalive: options.keepalive });
    if (route === "/api/leaderboard") return reply(200, { entries: ranking });
    if (route === "/api/session") {
      if (failure === "unauthorized") { failure = null; return reply(401, { error: "unauthorized" }); }
      return reply(options.method === "POST" ? 201 : 200,
        { ...(options.method === "POST" ? { token: "mock-token" } : {}), player: { name: "Test Guest" }, game: publicGame() });
    }
    assert.equal(route, "/api/game");
    assert.equal(options.headers.Authorization, "Bearer mock-token");
    if (failure === "offline") { failure = null; throw new TypeError("offline"); }
    if (failure === "unauthorized") { failure = null; return reply(401, { error: "unauthorized" }); }
    if (body.version !== server.version || body.gameId !== server.id) return reply(409, { error: "conflict", game: publicGame() });
    if (server._running !== null) { server.elapsedMs += Math.min(45000, now - server._running); server._running = now; }
    if (body.action === "hint" && server.hints >= 5) return reply(409, { error: "hint_limit", game: publicGame() });
    if (body.entries) server.entries = body.entries.map((value, index) => server.puzzle[index] ? 0 : value);
    if (body.action === "resume") server._running = now;
    if (body.action === "pause") server._running = null;
    let validation;
    if (body.action === "hint") {
      let index = body.cellIndex;
      if (server.puzzle[index] || server.entries[index] === server._solution[index]) {
        index = server.puzzle.findIndex((value, i) => !value && server.entries[i] !== server._solution[i]);
      }
      server.entries[index] = server._solution[index]; server.hints += 1;
    }
    if (body.action === "check") {
      server.checks += 1;
      validation = server.entries.map((value, index) => !value || server.puzzle[index] ? "" : value === server._solution[index] ? "correct" : "wrong");
    }
    if (body.action === "restart") {
      server.entries.fill(0); server.elapsedMs = 0; server.checks = 0; server.replay = true;
      server.completedAt = null; server._running = null;
    }
    if (body.action === "new") server = fresh();
    let ranked;
    if (["progress", "hint", "check"].includes(body.action) &&
        server._solution.every((value, index) => value === (server.puzzle[index] || server.entries[index]))) {
      server.completedAt = Date.now(); server._running = null;
      ranked = !server.hints && !server.checks && !server.replay;
      if (ranked && !ranking.some(score => score.id === server.id)) ranking.push({ id: server.id,
        name: "Test Guest", elapsedMs: server.elapsedMs, completedAt: server.completedAt });
    }
    server.version += 1;
    // Deliberate extra field tests the client's strict public-game allowlist.
    return reply(200, { game: { ...publicGame(), solution: server._solution }, validation, ranked });
  }
  function view() {
    const elements = {}, listeners = {}, intervals = [];
    function element(id = "") {
      return { id, value: "", dataset: {}, children: [], textContent: "", classList: { add() {}, toggle() {} },
        setAttribute() {}, append(child) { this.children.push(child); }, replaceChildren() { this.children = []; },
        addEventListener(type, fn) { listeners[id + ":" + type] = fn; },
        querySelector() { return { textContent: "", focus() {} }; }, querySelectorAll() { return []; },
        focus() {}, reset() {}, contains() { return false; } };
    }
    const document = { hidden: false, activeElement: null, body: {}, getElementById: id => elements[id] ??= element(id),
      createElement: () => element(), querySelectorAll: () => [],
      addEventListener(type, fn) { listeners["document:" + type] = fn; } };
    const context = { document, window: { PORT_SIDE_SUDOKU_API: "https://mock.test", setTimeout() { return 1; },
      clearTimeout() {}, setInterval(fn) { intervals.push(fn); },
      addEventListener(type, fn) { listeners["window:" + type] = fn; }, confirm: () => true },
      localStorage: { getItem: key => storage[key] ?? null, setItem(key, value) { storage[key] = value; }, removeItem(key) { delete storage[key]; } },
      fetch: fetchMock, performance: { now: () => now }, AbortController, URLSearchParams,
      location: { hostname: "mock.test", search: "" }, console, currentLanguage: "en" };
    vm.createContext(context); vm.runInContext(translations, context); vm.runInContext(source, context);
    return { api: context.testAPI, document, elements, listeners, tick: () => intervals.forEach(fn => fn()) };
  }
  async function joinedView() {
    const app = view(); await app.api.idle();
    app.document.getElementById("sudokuPlayerInput").value = "Test Guest";
    app.document.getElementById("sudokuRoomInput").value = "101";
    await app.api.startPlayer({ preventDefault() {} }); return app;
  }
  const blanks = () => server.puzzle.map((value, index) => !value ? index : -1).filter(index => index >= 0);
  async function solve(app) {
    for (const index of blanks()) {
      app.api.select(index); app.api.setEntry(server._solution[index]); await app.api.idle();
    }
  }
  return { view, joinedView, blanks, solve, storage, requests, ranking,
    server: () => server, advance: milliseconds => { now += milliseconds; }, fail: value => { failure = value; } };
}

test("server sessions, heartbeat timing, refresh pause and token-only session storage", async () => {
  const f = fixture(), app = await f.joinedView();
  assert.notEqual(app.api.snapshot().runningSince, null);
  assert.equal(app.api.game().solution, undefined);
  const index = f.blanks()[0]; app.api.select(index); app.api.setEntry(f.server()._solution[index]);
  assert.ok(Object.keys(f.storage).some(key => key.startsWith("portSideSudokuCloudDraft")));
  f.advance(15000); app.tick(); await app.api.idle();
  assert.equal(f.server().entries[index], f.server()._solution[index]); assert.equal(app.api.game().elapsedMs, 15000);
  assert.equal(Object.keys(f.storage).filter(key => key.startsWith("portSideSudokuCloudDraft")).length, 0);
  await app.api.pause(); const id = f.server().id;
  const restored = f.view(); await restored.api.idle();
  assert.equal(restored.api.game().id, id); assert.equal(restored.api.snapshot().runningSince, null);
  const saved = JSON.parse(f.storage.portSideSudokuCloudSessionsV1);
  assert.equal(saved.games, undefined); assert.equal(saved.scores, undefined);
  assert.equal(saved.profiles[saved.activeId].token, "mock-token");
  assert.equal(f.requests.at(-1).body.action, "pause");
});

test("five hints, same-puzzle allowance survives restart, new puzzle refreshes allowance", async () => {
  const f = fixture(), app = await f.joinedView(), id = f.server().id;
  for (let index = 0; index < 5; index += 1) await app.api.giveHint();
  assert.equal(f.server().hints, 5);
  const count = f.requests.length; await app.api.giveHint(); assert.equal(f.requests.length, count);
  await app.api.replaceGame("restart", "resetConfirm", "resetDone");
  assert.equal(f.server().hints, 5); assert.equal(f.server().replay, true); assert.equal(f.server().id, id);
  await app.api.replaceGame("new", "newConfirm", "randomStarted");
  assert.notEqual(f.server().id, id); assert.equal(f.server().hints, 0);
  f.server().hints = 5; await app.api.giveHint();
  assert.equal(app.api.snapshot().messageKey, "hintLimit"); assert.equal(app.api.game().hints, 5);
});

test("returning player reuses only this device's stored token; one-character names are rejected", async () => {
  const f = fixture(), app = await f.joinedView(), id = f.server().id;
  const before = f.requests.filter(request => request.route === "/api/session" && request.body).length;
  await app.listeners["sudokuChangePlayer:click"]();
  app.document.getElementById("sudokuPlayerInput").value = "Test Guest";
  app.document.getElementById("sudokuRoomInput").value = "101";
  await app.api.startPlayer({ preventDefault() {} });
  assert.equal(app.api.game().id, id);
  assert.equal(f.requests.filter(request => request.route === "/api/session" && request.body).length, before);
  assert.ok(f.requests.some(request => request.route === "/api/session" && !request.body && request.headers.Authorization === "Bearer mock-token"));
  await app.listeners["sudokuChangePlayer:click"]();
  app.document.getElementById("sudokuPlayerInput").value = "A";
  const requests = f.requests.length;
  await app.api.startPlayer({ preventDefault() {} });
  assert.equal(f.requests.length, requests);
  assert.equal(app.document.getElementById("sudokuJoinError").hidden, false);
});

test("transient errors retain entries;409 merges local and remote changes before explicit retry", async () => {
  const f = fixture(), app = await f.joinedView(), blanks = f.blanks();
  app.api.select(blanks[0]); app.api.setEntry(f.server()._solution[blanks[0]]);
  f.fail("offline"); f.advance(15000); app.tick(); await app.api.idle();
  assert.equal(app.api.snapshot().runningSince, null); assert.equal(app.api.snapshot().dirty, true);
  assert.equal(app.api.snapshot().messageKey, "syncError");
  await app.api.resume(); assert.equal(f.server().entries[blanks[0]], f.server()._solution[blanks[0]]);
  app.api.select(blanks[1]); app.api.setEntry(f.server()._solution[blanks[1]]);
  f.server().entries[blanks[2]] = f.server()._solution[blanks[2]]; f.server().version += 1;
  f.advance(15000); app.tick(); await app.api.idle();
  assert.equal(app.api.snapshot().runningSince, null);
  assert.equal(app.api.game().entries[blanks[1]], f.server()._solution[blanks[1]]);
  assert.equal(app.api.game().entries[blanks[2]], f.server()._solution[blanks[2]]);
  await app.api.resume(); assert.equal(f.server().entries[blanks[1]], f.server()._solution[blanks[1]]);
});

test("refresh recovers an unsent local draft and pagehide sends a keepalive pause", async () => {
  const f = fixture(), app = await f.joinedView(), index = f.blanks()[0];
  app.api.select(index); app.api.setEntry(f.server()._solution[index]);
  const restored = f.view(); await restored.api.idle();
  assert.equal(restored.api.game().entries[index], f.server()._solution[index]);
  assert.equal(f.server().entries[index], f.server()._solution[index]);
  await restored.api.resume(); restored.listeners["window:pagehide"](); await restored.api.idle();
  assert.equal(f.requests.at(-1).body.action, "pause"); assert.equal(f.requests.at(-1).keepalive, true);
});

test("completion and leaderboard only come from the service; assisted and replay runs do not rank", async () => {
  const f = fixture(), app = await f.joinedView(); f.advance(30000);
  await f.solve(app); assert.ok(app.api.game().completedAt); assert.equal(f.ranking.length, 1);
  await app.api.replaceGame("restart", "resetConfirm", "resetDone"); await f.solve(app); assert.equal(f.ranking.length, 1);
  await app.api.replaceGame("new", "newConfirm", "randomStarted"); await app.api.giveHint(); await f.solve(app); assert.equal(f.ranking.length, 1);
  await app.api.replaceGame("new", "newConfirm", "randomStarted"); await app.api.checkAnswers(); await f.solve(app); assert.equal(f.ranking.length, 1);
});

test("expired session returns to registration and preserves unsent entries", async () => {
  const f = fixture(), app = await f.joinedView(), index = f.blanks()[0];
  app.api.select(index); app.api.setEntry(f.server()._solution[index]);
  f.fail("unauthorized"); f.advance(15000); app.tick(); await app.api.idle();
  assert.equal(app.api.game(), null); assert.equal(app.api.snapshot().sessions.activeId, null);
  assert.equal(app.api.snapshot().messageKey, "sessionExpired");
  assert.ok(Object.keys(f.storage).some(key => key.startsWith("portSideSudokuCloudDraft")));
});
