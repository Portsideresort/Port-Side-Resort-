const tracks = [
  {
    src: "./audio/gunaydin.mp3",
    title: "Günaydın",
    subtitleKey: "morningType",
    duration: 139.8,
    durationLabel: "2:20",
    miniClass: "mini-morning",
    number: "01",
  },
  {
    src: "./audio/club-dans.mp3",
    title: "Merhaba",
    subtitleKey: "clubType",
    duration: 117.432,
    durationLabel: "1:57",
    miniClass: "mini-club",
    number: "02",
  },
  {
    src: "./audio/anons-jingle.mp3",
    title: "Hey! Hey!",
    subtitleKey: "anonsType",
    duration: 138.504,
    durationLabel: "2:19",
    miniClass: "mini-anons",
    number: "03",
  },
  {
    src: "./audio/moonlight.mp3",
    title: "Moonlight",
    subtitleKey: "moonlightType",
    duration: 138.792,
    durationLabel: "2:19",
    miniClass: "mini-moonlight",
    number: "04",
  },
  {
    src: "./audio/run-run.mp3",
    title: "Run Run",
    subtitleKey: "runType",
    duration: 184.704,
    durationLabel: "3:05",
    miniClass: "mini-run",
    number: "05",
  },
  {
    src: "./audio/violin.mp3",
    title: "Violin",
    subtitleKey: "violinType",
    duration: 157.104,
    durationLabel: "2:37",
    miniClass: "mini-violin",
    number: "06",
  },
  {
    src: "./audio/feels-like-home.mp3",
    title: "Feels Like Home",
    subtitleKey: "homeType",
    duration: 174.672,
    durationLabel: "2:55",
    miniClass: "mini-home",
    number: "07",
  },
  {
    src: "./audio/im-not-leaving.mp3",
    title: "I'm Not Leaving",
    subtitleKey: "leavingType",
    duration: 182.64,
    durationLabel: "3:03",
    miniClass: "mini-leaving",
    number: "08",
  },
  {
    src: "./audio/port-side-feel.mp3",
    title: "Port Side Feel",
    subtitleKey: "feelType",
    duration: 94.992,
    durationLabel: "1:35",
    miniClass: "mini-feel",
    number: "09",
  },
  {
    src: "./audio/lights-are-low.mp3",
    title: "Lights Are Low",
    subtitleKey: "lightsType",
    duration: 167.784,
    durationLabel: "2:48",
    miniClass: "mini-lights",
    number: "10",
  },
];

const translations = {
  TR: {
    exclusive: "OTELİMİZE ÖZEL",
    backProgramme: "PROGRAMA DÖN",
    eyebrow: "PORT SIDE SOUNDS",
    headline: "Tatilin <em>ritmini</em> dinleyin.",
    description: "Port Side Resort'a özel hazırlanan melodilerle tatil anılarınızı yeniden yaşayın.",
    collectionEyebrow: "ÖZEL KOLEKSİYON",
    collectionTitle: "On parça, tüm gün Port Side ritmi",
    collectionHint: "Bir parça seçin ve dinlemeye başlayın.",
    filterAll: "TÜMÜ",
    filterSignature: "HOTEL İMZALARI",
    filterHook: "HOOK SOUNDS",
    filterSunset: "SUNSET & SOUL",
    morningType: "SABAH AÇILIŞI",
    morningDescription: "Güne Port Side enerjisiyle başlatan sıcacık sabah melodisi.",
    clubType: "CLUB DANSI 2026",
    clubDescription: "Havuz başından dans pistine, tatilin temposunu yükselten imza parçamız.",
    anonsType: "ANONS JINGLE",
    anonsDescription: "Animasyon anonslarımızın neşeli ve hemen tanınan Port Side melodisi.",
    moonlightType: "HOOK SOUND",
    moonlightDescription: "Ay ışığı ve deniz esintisiyle sakinleşen Port Side akşamları.",
    runType: "HOOK SOUND",
    runDescription: "Hareketi ve enerjiyi yükselten, tatil temposuna eşlik eden dinamik parça.",
    violinType: "HOOK SOUND",
    violinDescription: "Port Side atmosferine zarif ve duygulu bir dokunuş katan keman melodisi.",
    homeType: "JAZZ · POP · RETRO SOUL",
    homeDescription: "Sıcak, tanıdık ve rahat; Port Side'da evinizde hissettiren bir melodi.",
    leavingType: "JAZZ · POP · RETRO SOUL",
    leavingDescription: "Tatil biraz daha sürsün dedirten, keyifli ve unutulmaz bir Port Side parçası.",
    feelType: "SUNSET SOUND",
    feelDescription: "Gün batımının renkleri ve Port Side ruhunu bir araya getiren özel melodi.",
    lightsType: "SUNSET SOUND",
    lightsDescription: "Işıklar azalırken akşamın sakin ve büyülü atmosferine eşlik eder.",
    noteEyebrow: "SADECE BURADA",
    noteTitle: "Port Side anılarınızın sesi",
    noteText: "Bu özel koleksiyonu Port Side Resort web sitesinden dilediğiniz zaman dinleyebilirsiniz.",
    nowPlaying: "ŞİMDİ ÇALIYOR",
    play: "Oynat",
    pause: "Duraklat",
    previous: "Önceki parça",
    next: "Sonraki parça",
    mute: "Sesi kapat",
    unmute: "Sesi aç",
  },
  EN: {
    exclusive: "EXCLUSIVE TO OUR HOTEL",
    backProgramme: "BACK TO PROGRAMME",
    eyebrow: "PORT SIDE SOUNDS",
    headline: "Listen to the <em>rhythm</em> of your holiday.",
    description: "Relive your holiday moments through melodies created exclusively for Port Side Resort.",
    collectionEyebrow: "EXCLUSIVE COLLECTION",
    collectionTitle: "Ten tracks, the Port Side rhythm all day",
    collectionHint: "Choose a track and start listening.",
    filterAll: "ALL",
    filterSignature: "HOTEL SIGNATURES",
    filterHook: "HOOK SOUNDS",
    filterSunset: "SUNSET & SOUL",
    morningType: "MORNING OPENING",
    morningDescription: "A warm morning melody that starts the day with Port Side energy.",
    clubType: "CLUB DANCE 2026",
    clubDescription: "From poolside to the dance floor, our signature track turns up the holiday rhythm.",
    anonsType: "ANNOUNCEMENT JINGLE",
    anonsDescription: "The cheerful and instantly recognisable Port Side melody from our entertainment announcements.",
    moonlightType: "HOOK SOUND",
    moonlightDescription: "Port Side evenings settling into moonlight and the sea breeze.",
    runType: "HOOK SOUND",
    runDescription: "A dynamic track that lifts the energy and moves with the rhythm of your holiday.",
    violinType: "HOOK SOUND",
    violinDescription: "An elegant violin melody adding an emotional touch to the Port Side atmosphere.",
    homeType: "JAZZ · POP · RETRO SOUL",
    homeDescription: "Warm, familiar and relaxed; a melody that feels like home at Port Side.",
    leavingType: "JAZZ · POP · RETRO SOUL",
    leavingDescription: "An unforgettable feel-good track that makes you wish the holiday would last longer.",
    feelType: "SUNSET SOUND",
    feelDescription: "A special melody bringing together the colours of sunset and the spirit of Port Side.",
    lightsType: "SUNSET SOUND",
    lightsDescription: "A calm, enchanting companion for the evening as the lights go low.",
    noteEyebrow: "ONLY HERE",
    noteTitle: "The sound of your Port Side memories",
    noteText: "Listen to this exclusive collection anytime on the Port Side Resort website.",
    nowPlaying: "NOW PLAYING",
    play: "Play",
    pause: "Pause",
    previous: "Previous track",
    next: "Next track",
    mute: "Mute",
    unmute: "Unmute",
  },
  DE: {
    exclusive: "EXKLUSIV FÜR UNSER HOTEL",
    backProgramme: "ZURÜCK ZUM PROGRAMM",
    eyebrow: "PORT SIDE SOUNDS",
    headline: "Hören Sie den <em>Rhythmus</em> Ihres Urlaubs.",
    description: "Erleben Sie Ihre Urlaubsmomente mit Melodien, die exklusiv für das Port Side Resort kreiert wurden.",
    collectionEyebrow: "EXKLUSIVE KOLLEKTION",
    collectionTitle: "Zehn Songs, den ganzen Tag Port Side Rhythmus",
    collectionHint: "Wählen Sie einen Song und hören Sie los.",
    filterAll: "ALLE",
    filterSignature: "HOTEL SIGNATURES",
    filterHook: "HOOK SOUNDS",
    filterSunset: "SUNSET & SOUL",
    morningType: "MORGENERÖFFNUNG",
    morningDescription: "Eine warme Morgenmelodie für einen Start in den Tag voller Port Side Energie.",
    clubType: "CLUBTANZ 2026",
    clubDescription: "Vom Pool bis zur Tanzfläche bringt unser Signature-Song den Urlaub in Schwung.",
    anonsType: "ANSAGE-JINGLE",
    anonsDescription: "Die fröhliche und unverkennbare Port Side Melodie unserer Entertainment-Ansagen.",
    moonlightType: "HOOK SOUND",
    moonlightDescription: "Port Side Abende im Mondlicht und mit einer sanften Meeresbrise.",
    runType: "HOOK SOUND",
    runDescription: "Ein dynamischer Song, der Energie und Bewegung in den Urlaub bringt.",
    violinType: "HOOK SOUND",
    violinDescription: "Eine elegante Violinmelodie mit einer emotionalen Note für die Port Side Atmosphäre.",
    homeType: "JAZZ · POP · RETRO SOUL",
    homeDescription: "Warm, vertraut und entspannt; eine Melodie, mit der sich Port Side wie Zuhause anfühlt.",
    leavingType: "JAZZ · POP · RETRO SOUL",
    leavingDescription: "Ein unvergesslicher Gute-Laune-Song, der den Urlaub noch etwas länger dauern lässt.",
    feelType: "SUNSET SOUND",
    feelDescription: "Eine besondere Melodie, die Sonnenuntergang und Port Side Gefühl vereint.",
    lightsType: "SUNSET SOUND",
    lightsDescription: "Ruhige, zauberhafte Begleitung für den Abend, wenn die Lichter gedimmt werden.",
    noteEyebrow: "NUR HIER",
    noteTitle: "Der Klang Ihrer Port Side Erinnerungen",
    noteText: "Hören Sie diese exklusive Kollektion jederzeit auf der Port Side Resort Website.",
    nowPlaying: "LÄUFT GERADE",
    play: "Abspielen",
    pause: "Pause",
    previous: "Vorheriger Song",
    next: "Nächster Song",
    mute: "Ton aus",
    unmute: "Ton an",
  },
};

const audio = document.getElementById("audioPlayer");
const mainPlayButton = document.getElementById("mainPlayButton");
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");
const muteButton = document.getElementById("muteButton");
const volumeIcon = document.getElementById("volumeIcon");
const volumeRange = document.getElementById("volumeRange");
const progressRange = document.getElementById("progressRange");
const currentTime = document.getElementById("currentTime");
const durationTime = document.getElementById("durationTime");
const playerTitle = document.getElementById("playerTitle");
const playerSubtitle = document.getElementById("playerSubtitle");
const miniCover = document.getElementById("miniCover");
const trackCards = [...document.querySelectorAll(".track-card")];
const filterButtons = [...document.querySelectorAll("[data-filter]")];

let currentTrackIndex = 0;
let language = (localStorage.getItem("portSideLanguage") || "de").toUpperCase();
if (!translations[language]) language = "DE";
let wasPlayingBeforeSeek = false;

audio.volume = 0.8;
audio.src = tracks[0].src;

function t(key) {
  return translations[language][key] || translations.TR[key] || key;
}

function setLanguage(nextLanguage) {
  language = nextLanguage;
  document.documentElement.lang = nextLanguage.toLowerCase();
  localStorage.setItem("portSideLanguage", nextLanguage.toLowerCase());

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = t(element.dataset.i18n);
    if (element.dataset.i18n === "headline") element.innerHTML = value;
    else element.textContent = value;
  });

  document.querySelectorAll("[data-lang]").forEach((button) => {
    const active = button.dataset.lang === language;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  updateTrackLabels();
  updateButtonLabels();
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
}

function updateTrackLabels() {
  const track = tracks[currentTrackIndex];
  playerTitle.textContent = track.title;
  playerSubtitle.textContent = t(track.subtitleKey);
}

function updateButtonLabels() {
  const playing = !audio.paused;
  mainPlayButton.setAttribute("aria-label", playing ? t("pause") : t("play"));
  previousButton.setAttribute("aria-label", t("previous"));
  nextButton.setAttribute("aria-label", t("next"));
  muteButton.setAttribute("aria-label", audio.muted ? t("unmute") : t("mute"));

  document.querySelectorAll("[data-play-track]").forEach((button) => {
    const index = Number(button.dataset.playTrack);
    const action = index === currentTrackIndex && playing ? t("pause") : t("play");
    button.setAttribute("aria-label", `${tracks[index].title} · ${action}`);
  });
}

function updateActiveTrack() {
  trackCards.forEach((card, index) => {
    card.classList.toggle("active", index === currentTrackIndex);
    card.classList.toggle("playing", index === currentTrackIndex && !audio.paused);
  });
  mainPlayButton.classList.toggle("playing", !audio.paused);

  const track = tracks[currentTrackIndex];
  miniCover.className = `mini-cover ${track.miniClass}`;
  miniCover.innerHTML = `<span>${track.number}</span>`;
  durationTime.textContent = track.durationLabel;
  updateTrackLabels();
  updateButtonLabels();
}

async function selectTrack(index, shouldPlay = true) {
  const nextIndex = (index + tracks.length) % tracks.length;
  const isSameTrack = nextIndex === currentTrackIndex;

  if (isSameTrack && shouldPlay) {
    if (audio.paused) await audio.play();
    else audio.pause();
    return;
  }

  currentTrackIndex = nextIndex;
  audio.src = tracks[currentTrackIndex].src;
  audio.load();
  progressRange.value = 0;
  progressRange.style.setProperty("--progress", "0%");
  currentTime.textContent = "0:00";
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
  if (audio.paused) audio.play().catch(() => {});
  else audio.pause();
}

document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((candidate) => candidate.classList.toggle("active", candidate === button));
    trackCards.forEach((card) => {
      card.classList.toggle("is-filtered", filter !== "all" && card.dataset.category !== filter);
    });
  });
});

document.querySelectorAll("[data-play-track]").forEach((button) => {
  button.addEventListener("click", () => selectTrack(Number(button.dataset.playTrack), true));
});

mainPlayButton.addEventListener("click", togglePlayback);
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

function updateVolumeIcon() {
  volumeIcon.textContent = audio.muted || audio.volume === 0 ? "🔇" : audio.volume < 0.5 ? "🔉" : "🔊";
  muteButton.setAttribute("aria-label", audio.muted ? t("unmute") : t("mute"));
}

audio.addEventListener("contextmenu", (event) => event.preventDefault());
audio.addEventListener("dragstart", (event) => event.preventDefault());

updateActiveTrack();
setLanguage(language);
