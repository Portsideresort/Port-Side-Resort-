const content = {
  activities: [
    { time: "10:15", title: "Morning Gym", locationKey: "poolArea", icon: "✦" },
    { time: "11:15", title: "Sea Gym", locationKey: "beach", icon: "≈" },
    { time: "14:30", title: "Water Polo", locationKey: "poolArea", icon: "◉" },
    { time: "15:30", title: "Water Gym", locationKey: "poolArea", icon: "✺" },
    { time: "16:00", title: "Darts", locationKey: "theatre", icon: "➶" },
    { time: "20:30", title: "Mini Disco", locationKey: "theatre", icon: "★" }
  ],
  show: {
    title: "Tonight's Show",
    time: "21:30",
    poster: ""
  }
};

const translations = {
  en: {
    navActivities: "Activities",
    navShows: "Shows",
    navGallery: "Gallery",
    eyebrow: "ENTERTAINMENT & ACTIVITIES",
    heroLine1: "Your holiday.",
    heroLine2: "Your moment.",
    heroText: "Discover today's activities, tonight's show and unforgettable moments at Port Side Resort.",
    explore: "Explore Today",
    tonightButton: "Tonight's Show",
    locationLabel: "LOCATION",
    experienceLabel: "EXPERIENCE",
    experienceValue: "Activities • Shows • Memories",
    todayLive: "TODAY AT PORT SIDE",
    heroCardTitle: "Your day starts here",
    today: "TODAY",
    activitiesTitle: "Daily Activities",
    activitiesIntro: "Stay active, have fun and enjoy every moment of your holiday.",
    tonight: "TONIGHT",
    showsTitle: "Evening Show",
    showsIntro: "Join us at the theatre for a spectacular night.",
    featuredShow: "FEATURED SHOW",
    posterPlaceholder: "Tonight's poster will appear here",
    showDescription: "Music, dance and entertainment for an unforgettable evening.",
    timeLabel: "TIME",
    placeLabel: "PLACE",
    theatre: "Theatre",
    poolArea: "Pool Area",
    beach: "Beach",
    memories: "MEMORIES",
    galleryTitle: "Gallery",
    galleryIntro: "Photos, posters and special moments will be added here.",
    help: "NEED HELP?",
    contactTitle: "Stay connected",
    contactText: "Find the hotel, follow our updates or contact the animation team.",
    footerNote: "Made for unforgettable holiday moments."
  },
  de: {
    navActivities: "Aktivitäten",
    navShows: "Shows",
    navGallery: "Galerie",
    eyebrow: "ANIMATION & AKTIVITÄTEN",
    heroLine1: "Ihr Urlaub.",
    heroLine2: "Ihr Moment.",
    heroText: "Entdecken Sie die heutigen Aktivitäten, die Abendshow und unvergessliche Momente im Port Side Resort.",
    explore: "Heute entdecken",
    tonightButton: "Heutige Show",
    locationLabel: "ORT",
    experienceLabel: "ERLEBNIS",
    experienceValue: "Aktivitäten • Shows • Erinnerungen",
    todayLive: "HEUTE IM PORT SIDE",
    heroCardTitle: "Ihr Tag beginnt hier",
    today: "HEUTE",
    activitiesTitle: "Tägliche Aktivitäten",
    activitiesIntro: "Bleiben Sie aktiv, haben Sie Spaß und genießen Sie jeden Moment Ihres Urlaubs.",
    tonight: "HEUTE ABEND",
    showsTitle: "Abendshow",
    showsIntro: "Erleben Sie mit uns einen spektakulären Abend im Theater.",
    featuredShow: "SHOW DES ABENDS",
    posterPlaceholder: "Das heutige Showplakat erscheint hier",
    showDescription: "Musik, Tanz und Unterhaltung für einen unvergesslichen Abend.",
    timeLabel: "ZEIT",
    placeLabel: "ORT",
    theatre: "Theater",
    poolArea: "Poolbereich",
    beach: "Strand",
    memories: "ERINNERUNGEN",
    galleryTitle: "Galerie",
    galleryIntro: "Fotos, Plakate und besondere Momente werden hier hinzugefügt.",
    help: "BRAUCHEN SIE HILFE?",
    contactTitle: "Bleiben Sie verbunden",
    contactText: "Finden Sie das Hotel, folgen Sie unseren Updates oder kontaktieren Sie das Animationsteam.",
    footerNote: "Für unvergessliche Urlaubsmomente."
  },
  tr: {
    navActivities: "Aktiviteler",
    navShows: "Şovlar",
    navGallery: "Galeri",
    eyebrow: "ANİMASYON & AKTİVİTELER",
    heroLine1: "Tatiliniz.",
    heroLine2: "Sizin anınız.",
    heroText: "Port Side Resort'taki günlük aktiviteleri, akşam şovunu ve unutulmaz anları keşfedin.",
    explore: "Bugünü Keşfet",
    tonightButton: "Bu Akşamki Şov",
    locationLabel: "KONUM",
    experienceLabel: "DENEYİM",
    experienceValue: "Aktiviteler • Şovlar • Anılar",
    todayLive: "BUGÜN PORT SIDE'DA",
    heroCardTitle: "Gününüz burada başlıyor",
    today: "BUGÜN",
    activitiesTitle: "Günlük Aktiviteler",
    activitiesIntro: "Aktif kalın, eğlenin ve tatilinizin her anının keyfini çıkarın.",
    tonight: "BU AKŞAM",
    showsTitle: "Akşam Şovu",
    showsIntro: "Muhteşem bir gece için tiyatroda bize katılın.",
    featuredShow: "GECENİN ŞOVU",
    posterPlaceholder: "Bu akşamki afiş burada görünecek",
    showDescription: "Unutulmaz bir akşam için müzik, dans ve eğlence.",
    timeLabel: "SAAT",
    placeLabel: "YER",
    theatre: "Tiyatro",
    poolArea: "Havuz Alanı",
    beach: "Sahil",
    memories: "ANILAR",
    galleryTitle: "Galeri",
    galleryIntro: "Fotoğraflar, afişler ve özel anlar buraya eklenecek.",
    help: "YARDIMA MI İHTİYACINIZ VAR?",
    contactTitle: "Bağlantıda kalın",
    contactText: "Oteli bulun, güncellemeleri takip edin veya animasyon ekibiyle iletişime geçin.",
    footerNote: "Unutulmaz tatil anları için hazırlandı."
  }
};

let currentLanguage = localStorage.getItem("portSideLanguage") || "en";

function translate(key) {
  return translations[currentLanguage][key] || key;
}

function renderActivities() {
  const activityGrid = document.getElementById("activityGrid");
  const miniSchedule = document.getElementById("miniSchedule");

  activityGrid.innerHTML = content.activities.map(item => `
    <article class="activity-card">
      <div class="activity-top">
        <div class="activity-icon">${item.icon}</div>
        <span class="activity-time">${item.time}</span>
      </div>
      <div>
        <h3>${item.title}</h3>
        <p>${translate(item.locationKey)}</p>
      </div>
    </article>
  `).join("");

  miniSchedule.innerHTML = content.activities.slice(0, 3).map(item => `
    <div class="mini-item">
      <span class="mini-time">${item.time}</span>
      <div>
        <strong>${item.title}</strong>
        <small>${translate(item.locationKey)}</small>
      </div>
    </div>
  `).join("");
}

function renderShow() {
  document.getElementById("showTitle").textContent = content.show.title;
  document.getElementById("showTime").textContent = content.show.time;

  const poster = document.querySelector(".show-poster-placeholder");
  if (content.show.poster) {
    poster.classList.add("has-image");
    poster.style.backgroundImage = `url("${content.show.poster}")`;
  } else {
    poster.classList.remove("has-image");
    poster.style.backgroundImage = "";
  }
}

function setLanguage(lang) {
  currentLanguage = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.getAttribute("data-i18n");
    element.textContent = translate(key);
  });

  document.querySelectorAll("[data-lang]").forEach(button => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });

  localStorage.setItem("portSideLanguage", lang);
  renderActivities();
}

document.querySelectorAll("[data-lang]").forEach(button => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

setLanguage(currentLanguage);
renderShow();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  });
}
