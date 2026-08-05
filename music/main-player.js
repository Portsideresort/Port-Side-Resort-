(() => {
  const tracks = [
    { src: "music/audio/gunaydin.mp3", title: "Günaydın" },
    { src: "music/audio/club-dans.mp3", title: "Merhaba" },
    { src: "music/audio/anons-jingle.mp3", title: "Hey! Hey!" },
  ];

  const labels = {
    en: { play: "Play", pause: "Pause" },
    de: { play: "Abspielen", pause: "Pause" },
    tr: { play: "Oynat", pause: "Duraklat" },
    ru: { play: "Воспроизвести", pause: "Пауза" },
  };

  const audio = document.getElementById("mainMusicAudio");
  const trackCards = [...document.querySelectorAll("[data-main-track]")];

  if (!audio || trackCards.length !== tracks.length) return;

  let currentTrackIndex = 0;

  function language() {
    const value = document.documentElement.lang.toLowerCase();
    return labels[value] ? value : "de";
  }

  function updateCards() {
    trackCards.forEach((card, index) => {
      const selected = index === currentTrackIndex;
      const isPlaying = selected && !audio.paused;
      const action = labels[language()][isPlaying ? "pause" : "play"];
      const glyph = card.querySelector(".music-track-play");

      card.classList.toggle("active", selected);
      card.setAttribute("aria-pressed", String(isPlaying));
      card.setAttribute("aria-label", `${tracks[index].title}: ${action}`);
      if (glyph) glyph.textContent = isPlaying ? "❚❚" : "▶";
    });
  }

  async function selectTrack(index, shouldPlay = false) {
    const changed = index !== currentTrackIndex;
    currentTrackIndex = index;

    if (changed || !audio.getAttribute("src")) {
      audio.src = tracks[index].src;
    }

    updateCards();

    if (shouldPlay) {
      try {
        await audio.play();
      } catch {
        updateCards();
      }
    }
  }

  trackCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      if (index === currentTrackIndex && audio.getAttribute("src")) {
        if (audio.paused) audio.play().catch(updateCards);
        else audio.pause();
        return;
      }

      selectTrack(index, true);
    });
  });

  audio.addEventListener("play", updateCards);
  audio.addEventListener("pause", updateCards);
  audio.addEventListener("ended", () => selectTrack((currentTrackIndex + 1) % tracks.length, true));
  audio.addEventListener("contextmenu", (event) => event.preventDefault());
  audio.addEventListener("dragstart", (event) => event.preventDefault());
  window.addEventListener("portside:languagechange", updateCards);

  audio.src = tracks[0].src;
  updateCards();
})();
