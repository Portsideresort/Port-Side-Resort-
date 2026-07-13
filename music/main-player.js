(() => {
  const tracks = [
    { src: "music/audio/gunaydin.mp3", title: "Günaydın", duration: 139.8, durationLabel: "2:20", number: "01" },
    { src: "music/audio/club-dans.mp3", title: "Merhaba", duration: 117.432, durationLabel: "1:57", number: "02" },
    { src: "music/audio/anons-jingle.mp3", title: "Hey! Hey!", duration: 138.504, durationLabel: "2:19", number: "03" },
    { src: "music/audio/moonlight.mp3", title: "Moonlight", duration: 138.792, durationLabel: "2:19", number: "04" },
    { src: "music/audio/run-run.mp3", title: "Run Run", duration: 184.704, durationLabel: "3:05", number: "05" },
    { src: "music/audio/violin.mp3", title: "Violin", duration: 157.104, durationLabel: "2:37", number: "06" },
    { src: "music/audio/feels-like-home.mp3", title: "Feels Like Home", duration: 174.672, durationLabel: "2:55", number: "07" },
    { src: "music/audio/im-not-leaving.mp3", title: "I'm Not Leaving", duration: 182.64, durationLabel: "3:03", number: "08" },
    { src: "music/audio/port-side-feel.mp3", title: "Port Side Feel", duration: 94.992, durationLabel: "1:35", number: "09" },
    { src: "music/audio/lights-are-low.mp3", title: "Lights Are Low", duration: 167.784, durationLabel: "2:48", number: "10" },
  ];

  const labels = {
    en: { play: "Play", pause: "Pause", previous: "Previous track", next: "Next track", mute: "Mute", unmute: "Unmute", progress: "Track progress", volume: "Volume", player: "Music player" },
    de: { play: "Abspielen", pause: "Pause", previous: "Vorheriger Song", next: "Nächster Song", mute: "Ton aus", unmute: "Ton an", progress: "Song-Fortschritt", volume: "Lautstärke", player: "Musikplayer" },
    tr: { play: "Oynat", pause: "Duraklat", previous: "Önceki parça", next: "Sonraki parça", mute: "Sesi kapat", unmute: "Sesi aç", progress: "Parça ilerlemesi", volume: "Ses seviyesi", player: "Müzik oynatıcı" },
  };

  const audio = document.getElementById("mainMusicAudio");
  const player = document.getElementById("mainMusicPlayer");
  const playButton = document.getElementById("mainMusicPlay");
  const previousButton = document.getElementById("mainMusicPrevious");
  const nextButton = document.getElementById("mainMusicNext");
  const muteButton = document.getElementById("mainMusicMute");
  const volumeIcon = document.getElementById("mainMusicVolumeIcon");
  const volumeRange = document.getElementById("mainMusicVolume");
  const progressRange = document.getElementById("mainMusicProgress");
  const currentTime = document.getElementById("mainMusicCurrent");
  const durationTime = document.getElementById("mainMusicDuration");
  const playerTitle = document.getElementById("mainMusicTitle");
  const playerSubtitle = document.getElementById("mainMusicSubtitle");
  const playerNumber = document.getElementById("mainMusicNumber");
  const trackCards = [...document.querySelectorAll("[data-main-track]")];
  const filterButtons = [...document.querySelectorAll("[data-music-filter]")];

  if (!audio || !player || !playButton || trackCards.length !== tracks.length) return;

  let currentTrackIndex = 0;
  let wasPlayingBeforeSeek = false;

  function language() {
    const value = document.documentElement.lang.toLowerCase();
    return labels[value] ? value : "de";
  }

  function text(key) {
    return labels[language()][key];
  }

  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remaining = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remaining}`;
  }

  function trackSubtitle(index) {
    return trackCards[index]?.querySelector(".music-track-copy small")?.textContent?.trim() || "PORT SIDE SOUNDS";
  }

  function refreshLabels() {
    player.setAttribute("aria-label", text("player"));
    previousButton.setAttribute("aria-label", text("previous"));
    nextButton.setAttribute("aria-label", text("next"));
    progressRange.setAttribute("aria-label", text("progress"));
    volumeRange.setAttribute("aria-label", text("volume"));
    playButton.setAttribute("aria-label", audio.paused ? text("play") : text("pause"));
    muteButton.setAttribute("aria-label", audio.muted ? text("unmute") : text("mute"));
    playerSubtitle.textContent = trackSubtitle(currentTrackIndex);
  }

  function updateVolumeIcon() {
    volumeIcon.textContent = audio.muted || audio.volume === 0 ? "🔇" : audio.volume < 0.5 ? "🔉" : "🔊";
    muteButton.setAttribute("aria-label", audio.muted ? text("unmute") : text("mute"));
  }

  function updateActiveTrack() {
    trackCards.forEach((card, index) => {
      const selected = index === currentTrackIndex;
      card.classList.toggle("active", selected);
      card.setAttribute("aria-pressed", String(selected));
      const glyph = card.querySelector(".music-track-play");
      if (glyph) glyph.textContent = selected && !audio.paused ? "❚❚" : "▶";
    });

    playButton.querySelector("span").textContent = audio.paused ? "▶" : "❚❚";
    playButton.setAttribute("aria-label", audio.paused ? text("play") : text("pause"));
    playerNumber.textContent = tracks[currentTrackIndex].number;
    playerTitle.textContent = tracks[currentTrackIndex].title;
    playerSubtitle.textContent = trackSubtitle(currentTrackIndex);
    durationTime.textContent = tracks[currentTrackIndex].durationLabel;
  }

  async function selectTrack(index, shouldPlay = false) {
    const normalizedIndex = (index + tracks.length) % tracks.length;
    const changed = normalizedIndex !== currentTrackIndex;
    currentTrackIndex = normalizedIndex;

    if (changed || !audio.src) {
      audio.src = tracks[currentTrackIndex].src;
      progressRange.value = 0;
      progressRange.style.setProperty("--progress", "0%");
      currentTime.textContent = "0:00";
    }

    updateActiveTrack();

    if (shouldPlay) {
      try {
        await audio.play();
      } catch {
        updateActiveTrack();
      }
    }
  }

  function togglePlayback() {
    if (audio.paused) audio.play().catch(updateActiveTrack);
    else audio.pause();
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.musicFilter;
      filterButtons.forEach((candidate) => candidate.classList.toggle("active", candidate === button));
      trackCards.forEach((card) => {
        card.classList.toggle("is-filtered", filter !== "all" && card.dataset.musicCategory !== filter);
      });
    });
  });

  trackCards.forEach((card) => {
    card.addEventListener("click", () => selectTrack(Number(card.dataset.mainTrack), true));
  });

  playButton.addEventListener("click", togglePlayback);
  previousButton.addEventListener("click", () => selectTrack(currentTrackIndex - 1, true));
  nextButton.addEventListener("click", () => selectTrack(currentTrackIndex + 1, true));

  audio.addEventListener("play", updateActiveTrack);
  audio.addEventListener("pause", updateActiveTrack);
  audio.addEventListener("ended", () => selectTrack(currentTrackIndex + 1, true));

  audio.addEventListener("timeupdate", () => {
    const duration = Number.isFinite(audio.duration) ? audio.duration : tracks[currentTrackIndex].duration;
    const percentage = duration > 0 ? (audio.currentTime / duration) * 100 : 0;
    progressRange.value = percentage;
    progressRange.style.setProperty("--progress", `${percentage}%`);
    currentTime.textContent = formatTime(audio.currentTime);
    durationTime.textContent = formatTime(duration);
  });

  audio.addEventListener("loadedmetadata", () => {
    durationTime.textContent = formatTime(audio.duration);
  });

  progressRange.addEventListener("pointerdown", () => {
    wasPlayingBeforeSeek = !audio.paused;
  });

  progressRange.addEventListener("input", () => {
    const duration = Number.isFinite(audio.duration) ? audio.duration : tracks[currentTrackIndex].duration;
    const percentage = Number(progressRange.value);
    progressRange.style.setProperty("--progress", `${percentage}%`);
    currentTime.textContent = formatTime((percentage / 100) * duration);
  });

  progressRange.addEventListener("change", () => {
    if (!Number.isFinite(audio.duration)) return;
    audio.currentTime = (Number(progressRange.value) / 100) * audio.duration;
    if (wasPlayingBeforeSeek) audio.play().catch(() => {});
  });

  volumeRange.addEventListener("input", () => {
    const value = Number(volumeRange.value);
    audio.volume = value;
    audio.muted = value === 0;
    volumeRange.style.setProperty("--progress", `${value * 100}%`);
    updateVolumeIcon();
  });

  muteButton.addEventListener("click", () => {
    audio.muted = !audio.muted;
    updateVolumeIcon();
  });

  window.addEventListener("portside:languagechange", refreshLabels);
  audio.addEventListener("contextmenu", (event) => event.preventDefault());
  audio.addEventListener("dragstart", (event) => event.preventDefault());

  audio.volume = 0.8;
  audio.src = tracks[0].src;
  volumeRange.style.setProperty("--progress", "80%");
  refreshLabels();
  updateActiveTrack();
})();
