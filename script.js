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
    entertainmentProgramme: "ENTERTAINMENT PROGRAMME",
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
    footerNote: "Made for unforgettable holiday moments.",
    loadingWeather: "Loading weather…",
    feelsLike: "Feels like",
    humidity: "Humidity",
    wind: "Wind",
    updatedNow: "Updated now",
    weatherUnavailable: "Weather information is temporarily unavailable."
  },
  de: {
    navActivities: "Aktivitäten",
    navShows: "Shows",
    navGallery: "Galerie",
    eyebrow: "ANIMATION & AKTIVITÄTEN",
    entertainmentProgramme: "UNTERHALTUNGSPROGRAMM",
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
    footerNote: "Für unvergessliche Urlaubsmomente.",
    loadingWeather: "Wetter wird geladen…",
    feelsLike: "Gefühlt",
    humidity: "Luftfeuchtigkeit",
    wind: "Wind",
    updatedNow: "Gerade aktualisiert",
    weatherUnavailable: "Die Wetterdaten sind vorübergehend nicht verfügbar."
  },
  tr: {
    navActivities: "Aktiviteler",
    navShows: "Şovlar",
    navGallery: "Galeri",
    eyebrow: "ANİMASYON & AKTİVİTELER",
    entertainmentProgramme: "EĞLENCE PROGRAMI",
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
    footerNote: "Unutulmaz tatil anları için hazırlandı.",
    loadingWeather: "Hava durumu yükleniyor…",
    feelsLike: "Hissedilen",
    humidity: "Nem",
    wind: "Rüzgâr",
    updatedNow: "Şimdi güncellendi",
    weatherUnavailable: "Hava durumu bilgisi geçici olarak alınamıyor."
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
  renderWeatherDate();
  if (window.latestWeatherData) renderWeather(window.latestWeatherData);
}

document.querySelectorAll("[data-lang]").forEach(button => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

setLanguage(currentLanguage);
renderShow();


const WEATHER_COORDINATES = {
  latitude: 36.812,
  longitude: 31.350
};

const weatherText = {
  en: {
    0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
    45: "Fog", 48: "Fog", 51: "Light drizzle", 53: "Drizzle", 55: "Heavy drizzle",
    61: "Light rain", 63: "Rain", 65: "Heavy rain", 71: "Light snow",
    73: "Snow", 75: "Heavy snow", 80: "Rain showers", 81: "Rain showers",
    82: "Heavy showers", 95: "Thunderstorm", 96: "Thunderstorm", 99: "Thunderstorm"
  },
  de: {
    0: "Klar", 1: "Überwiegend klar", 2: "Teilweise bewölkt", 3: "Bewölkt",
    45: "Nebel", 48: "Nebel", 51: "Leichter Nieselregen", 53: "Nieselregen", 55: "Starker Nieselregen",
    61: "Leichter Regen", 63: "Regen", 65: "Starker Regen", 71: "Leichter Schnee",
    73: "Schnee", 75: "Starker Schnee", 80: "Regenschauer", 81: "Regenschauer",
    82: "Starke Schauer", 95: "Gewitter", 96: "Gewitter", 99: "Gewitter"
  },
  tr: {
    0: "Açık", 1: "Çoğunlukla açık", 2: "Parçalı bulutlu", 3: "Kapalı",
    45: "Sisli", 48: "Sisli", 51: "Hafif çiseleme", 53: "Çiseleme", 55: "Yoğun çiseleme",
    61: "Hafif yağmur", 63: "Yağmurlu", 65: "Kuvvetli yağmur", 71: "Hafif kar",
    73: "Karlı", 75: "Yoğun kar", 80: "Sağanak", 81: "Sağanak",
    82: "Kuvvetli sağanak", 95: "Gök gürültülü", 96: "Gök gürültülü", 99: "Gök gürültülü"
  }
};

function weatherIcon(code, isDay = 1) {
  if (code === 0) return isDay ? "☀️" : "🌙";
  if ([1, 2].includes(code)) return isDay ? "🌤️" : "☁️";
  if (code === 3) return "☁️";
  if ([45, 48].includes(code)) return "🌫️";
  if ([51, 53, 55, 61, 63, 80, 81].includes(code)) return "🌦️";
  if ([65, 82].includes(code)) return "🌧️";
  if ([71, 73, 75].includes(code)) return "🌨️";
  if ([95, 96, 99].includes(code)) return "⛈️";
  return "🌤️";
}

function localeForLanguage() {
  return currentLanguage === "de" ? "de-DE" : currentLanguage === "tr" ? "tr-TR" : "en-GB";
}

function renderWeatherDate() {
  document.getElementById("weatherDate").textContent = new Intl.DateTimeFormat(
    localeForLanguage(),
    { weekday: "long", day: "numeric", month: "long", year: "numeric" }
  ).format(new Date());
}

function renderWeather(data) {
  const current = data.current;
  const daily = data.daily;

  document.getElementById("currentTemp").textContent = Math.round(current.temperature_2m);
  document.getElementById("feelsLike").textContent = `${Math.round(current.apparent_temperature)}°C`;
  document.getElementById("humidity").textContent = `${Math.round(current.relative_humidity_2m)}%`;
  document.getElementById("windSpeed").textContent = `${Math.round(current.wind_speed_10m)} km/h`;
  document.getElementById("weatherSymbol").textContent = weatherIcon(current.weather_code, current.is_day);
  document.getElementById("weatherCondition").textContent =
    weatherText[currentLanguage][current.weather_code] || weatherText[currentLanguage][2];
  document.getElementById("weatherUpdated").textContent = translate("updatedNow");

  document.getElementById("weatherForecast").innerHTML = daily.time.map((date, index) => {
    const day = new Date(`${date}T12:00:00`);
    const dayName = new Intl.DateTimeFormat(localeForLanguage(), { weekday: "short" }).format(day);
    return `
      <div class="forecast-day ${index === 0 ? "today" : ""}">
        <span class="forecast-name">${dayName}</span>
        <span class="forecast-icon">${weatherIcon(daily.weather_code[index])}</span>
        <span class="forecast-temps">${Math.round(daily.temperature_2m_max[index])}° <small>${Math.round(daily.temperature_2m_min[index])}°</small></span>
      </div>
    `;
  }).join("");

  document.getElementById("weatherError").textContent = "";
}

async function loadWeather() {
  renderWeatherDate();
  const params = new URLSearchParams({
    latitude: WEATHER_COORDINATES.latitude,
    longitude: WEATHER_COORDINATES.longitude,
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    timezone: "Europe/Istanbul",
    forecast_days: "7"
  });

  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
    if (!response.ok) throw new Error("Weather request failed");
    const data = await response.json();
    window.latestWeatherData = data;
    renderWeather(data);
  } catch (error) {
    document.getElementById("weatherUpdated").textContent = "";
    document.getElementById("weatherError").textContent = translate("weatherUnavailable");
  }
}


loadWeather();
setInterval(loadWeather, 30 * 60 * 1000);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  });
}
