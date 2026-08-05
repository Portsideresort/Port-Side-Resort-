(() => {
  const tracks = [
    { src: "music/audio/gunaydin.mp3", title: "Günaydın", duration: 139.8 },
    { src: "music/audio/club-dans.mp3", title: "Merhaba", duration: 117.432 },
    { src: "music/audio/anons-jingle.mp3", title: "Hey! Hey!", duration: 138.504 },
  ];

  const labels = {
    en: { play: "Play", pause: "Pause", seek: "Track position" },
    de: { play: "Abspielen", pause: "Pause", seek: "Songposition" },
    tr: { play: "Oynat", pause: "Duraklat", seek: "Parça konumu" },
    ru: { play: "Воспроизвести", pause: "Пауза", seek: "Позиция трека" },
  };

  const audio = document.getElementById("mainMusicAudio");
  const trackCards = [...document.querySelectorAll("[data-main-track]")];
  const trackToggles = [...document.querySelectorAll("[data-track-toggle]")];
  const seekRanges = [...document.querySelectorAll("[data-main-seek]")];
  const currentTimes = [...document.querySelectorAll("[data-track-current]")];

  if (
    !audio ||
    trackCards.length !== tracks.length ||
    trackToggles.length !== tracks.length ||
    seekRanges.length !== tracks.length ||
    currentTimes.length !== tracks.length
  ) return;

  let currentTrackIndex = 0;
  let pendingSeek = null;
  const positions = tracks.map(() => 0);

  function language() {
    const value = document.documentElement.lang.toLowerCase();
    return labels[value] ? value : "de";
  }

  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remaining = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remaining}`;
  }

  function updateProgress(index, seconds = positions[index]) {
    const duration = tracks[index].duration;
    const safeSeconds = Math.min(Math.max(seconds, 0), duration);
    const percentage = duration > 0 ? (safeSeconds / duration) * 100 : 0;

    seekRanges[index].value = percentage;
    seekRanges[index].style.setProperty("--progress", `${percentage}%`);
    currentTimes[index].textContent = formatTime(safeSeconds);
  }

  function updateCards() {
    trackCards.forEach((card, index) => {
      const selected = index === currentTrackIndex;
      const isPlaying = selected && !audio.paused;
      const action = labels[language()][isPlaying ? "pause" : "play"];
      const glyph = card.querySelector(".music-track-play");

      card.classList.toggle("active", selected);
      trackToggles[index].setAttribute("aria-pressed", String(isPlaying));
      trackToggles[index].setAttribute("aria-label", `${tracks[index].title}: ${action}`);
      seekRanges[index].setAttribute("aria-label", `${tracks[index].title}: ${labels[language()].seek}`);
      if (glyph) glyph.textContent = isPlaying ? "❚❚" : "▶";
    });
  }

  function loadTrack(index) {
    currentTrackIndex = index;
    pendingSeek = positions[index];
    audio.src = tracks[index].src;
    updateCards();
  }

  async function selectTrack(index, shouldPlay = false) {
    if (index !== currentTrackIndex || !audio.getAttribute("src")) {
      loadTrack(index);
    }

    if (shouldPlay) {
      try {
        await audio.play();
      } catch {
        updateCards();
      }
    }
  }

  trackToggles.forEach((button, index) => {
    button.addEventListener("click", () => {
      if (index === currentTrackIndex && audio.getAttribute("src")) {
        if (audio.paused) audio.play().catch(updateCards);
        else audio.pause();
        return;
      }

      selectTrack(index, true);
    });
  });

  seekRanges.forEach((range, index) => {
    range.addEventListener("input", () => {
      if (index !== currentTrackIndex) loadTrack(index);

      const seconds = (Number(range.value) / 100) * tracks[index].duration;
      positions[index] = seconds;
      pendingSeek = seconds;
      updateProgress(index, seconds);

      if (audio.readyState >= 1) {
        audio.currentTime = Math.min(seconds, audio.duration || tracks[index].duration);
        pendingSeek = null;
      }
    });
  });

  audio.addEventListener("loadedmetadata", () => {
    if (pendingSeek === null) return;
    audio.currentTime = Math.min(pendingSeek, audio.duration || tracks[currentTrackIndex].duration);
    pendingSeek = null;
  });

  audio.addEventListener("timeupdate", () => {
    positions[currentTrackIndex] = audio.currentTime;
    updateProgress(currentTrackIndex, audio.currentTime);
  });

  audio.addEventListener("play", updateCards);
  audio.addEventListener("pause", updateCards);
  audio.addEventListener("ended", () => {
    positions[currentTrackIndex] = 0;
    updateProgress(currentTrackIndex, 0);
    selectTrack((currentTrackIndex + 1) % tracks.length, true);
  });
  audio.addEventListener("contextmenu", (event) => event.preventDefault());
  audio.addEventListener("dragstart", (event) => event.preventDefault());
  window.addEventListener("portside:languagechange", updateCards);

  audio.src = tracks[0].src;
  tracks.forEach((_, index) => updateProgress(index, 0));
  updateCards();
})();
