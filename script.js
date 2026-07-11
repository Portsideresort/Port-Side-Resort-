const translations = {
  en: {
    eyebrow: "ENTERTAINMENT & ACTIVITIES",
    heroTitle: "Welcome to Port Side Resort",
    heroText: "Discover daily activities, evening shows and unforgettable holiday moments.",
    explore: "Explore",
    today: "TODAY",
    activitiesTitle: "Daily Activities",
    poolArea: "Pool Area",
    beach: "Beach",
    tonight: "TONIGHT",
    showsTitle: "Evening Shows",
    showPlaceholder: "Tonight's Show",
    theatre: "At the theatre",
    memories: "MEMORIES",
    galleryTitle: "Gallery",
    galleryPlaceholder: "Photos and posters will be added here.",
    help: "NEED HELP?",
    contactTitle: "Contact"
  },
  de: {
    eyebrow: "ANIMATION & AKTIVITÄTEN",
    heroTitle: "Willkommen im Port Side Resort",
    heroText: "Entdecken Sie tägliche Aktivitäten, Abendshows und unvergessliche Urlaubsmomente.",
    explore: "Entdecken",
    today: "HEUTE",
    activitiesTitle: "Tägliche Aktivitäten",
    poolArea: "Poolbereich",
    beach: "Am Strand",
    tonight: "HEUTE ABEND",
    showsTitle: "Abendshows",
    showPlaceholder: "Heutige Show",
    theatre: "Im Theater",
    memories: "ERINNERUNGEN",
    galleryTitle: "Galerie",
    galleryPlaceholder: "Fotos und Plakate werden hier hinzugefügt.",
    help: "BRAUCHEN SIE HILFE?",
    contactTitle: "Kontakt"
  },
  tr: {
    eyebrow: "ANİMASYON & AKTİVİTELER",
    heroTitle: "Port Side Resort'a Hoş Geldiniz",
    heroText: "Günlük aktiviteleri, akşam şovlarını ve unutulmaz tatil anlarını keşfedin.",
    explore: "Keşfet",
    today: "BUGÜN",
    activitiesTitle: "Günlük Aktiviteler",
    poolArea: "Havuz Alanı",
    beach: "Sahil",
    tonight: "BU AKŞAM",
    showsTitle: "Akşam Şovları",
    showPlaceholder: "Bu Akşamki Şov",
    theatre: "Tiyatroda",
    memories: "ANILAR",
    galleryTitle: "Galeri",
    galleryPlaceholder: "Fotoğraflar ve afişler buraya eklenecek.",
    help: "YARDIMA MI İHTİYACINIZ VAR?",
    contactTitle: "İletişim"
  }
};

function setLanguage(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
  localStorage.setItem("portSideLanguage", lang);
}

document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

setLanguage(localStorage.getItem("portSideLanguage") || "en");
.site-logo {
  width: 280px;
  max-width: 55vw;
  height: auto;
  display: block;
  filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.35));
}
