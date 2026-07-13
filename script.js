if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
  if (window.location.hash) {
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  }
  window.scrollTo(0, 0);
});

const content = {
  activities: [
    { time: "10:00", titleKey: "radioPortSide", locationKey: "poolArea", descriptionKey: "radioDesc", benefitsKey: "radioBenefits", musclesKey: "radioMuscles", jointsKey: "radioJoints", mindKey: "radioMind", image: "activity-radio.jpg" },
    { time: "10:15", titleKey: "morningGym", locationKey: "stage", descriptionKey: "morningGymDesc", benefitsKey: "morningGymBenefits", musclesKey: "morningGymMuscles", jointsKey: "morningGymJoints", mindKey: "morningGymMind", image: "activity-morning-gym.jpg" },
    { time: "10:15", titleKey: "boccia", locationKey: "beach", descriptionKey: "bocciaDesc", benefitsKey: "bocciaBenefits", musclesKey: "bocciaMuscles", jointsKey: "bocciaJoints", mindKey: "bocciaMind", image: "activity-boccia.jpg" },
    { time: "11:00", titleKey: "darts", locationKey: "stage", descriptionKey: "dartsDesc", benefitsKey: "dartsBenefits", musclesKey: "dartsMuscles", jointsKey: "dartsJoints", mindKey: "dartsMind", image: "activity-darts.jpg" },
    { time: "11:15", titleKey: "seaGym", locationKey: "sea", descriptionKey: "seaGymDesc", benefitsKey: "seaGymBenefits", musclesKey: "seaGymMuscles", jointsKey: "seaGymJoints", mindKey: "seaGymMind", image: "activity-sea-gym.jpg" },
    { time: "14:30", titleKey: "waterGym", locationKey: "pool", descriptionKey: "waterGymDesc", benefitsKey: "waterGymBenefits", musclesKey: "waterGymMuscles", jointsKey: "waterGymJoints", mindKey: "waterGymMind", image: "activity-water-gym.jpg" },
    { time: "15:00", titleKey: "boccia", locationKey: "beach", descriptionKey: "bocciaAfternoonDesc", benefitsKey: "bocciaBenefits", musclesKey: "bocciaMuscles", jointsKey: "bocciaJoints", mindKey: "bocciaMind", image: "activity-boccia.jpg" },
    { time: "15:30", titleKey: "waterPolo", locationKey: "pool", descriptionKey: "waterPoloDesc", benefitsKey: "waterPoloBenefits", musclesKey: "waterPoloMuscles", jointsKey: "waterPoloJoints", mindKey: "waterPoloMind", image: "activity-water-polo.jpg" },
    { time: "16:00", titleKey: "darts", locationKey: "stage", descriptionKey: "dartsAfternoonDesc", benefitsKey: "dartsBenefits", musclesKey: "dartsMuscles", jointsKey: "dartsJoints", mindKey: "dartsMind", image: "activity-darts.jpg" }
  ],
  showWeeks: [
    [
      { dayKey: "monday", title: "Face of Africa", descriptionKey: "faceOfAfricaDesc", poster: "show-week1-face-africa.jpg" },
      { dayKey: "tuesday", title: "Bonnles", descriptionKey: "bonnlesDesc", poster: "show-week1-bonnles.jpg" },
      { dayKey: "wednesday", title: "Raza Urbana", descriptionKey: "razaUrbanaDesc", poster: "show-week1-raza-urbana.jpg" },
      { dayKey: "thursday", title: "Bingo", descriptionKey: "bingoDesc", poster: "show-week1-bingo.png" },
      { dayKey: "friday", title: "Diva Nova", descriptionKey: "divaNovaDesc", poster: "show-week1-diva-nova.jpg" },
      { dayKey: "saturday", title: "Mexico Show", descriptionKey: "mexicoShowDesc", poster: "show-week1-mexico.jpg" },
      { dayKey: "sunday", title: "DJ Port Side", descriptionKey: "djPortSideDesc", poster: "show-week1-dj-port-side.jpg" }
    ],
    [
      { dayKey: "monday", title: "Tropicana Show", descriptionKey: "tropicanaShowDesc", poster: "show-week2-tropicana.jpg" },
      { dayKey: "tuesday", title: "Dark Side", descriptionKey: "darkSideDesc", poster: "show-week2-dark-side.jpg" },
      { dayKey: "wednesday", title: "Michael Jackson", descriptionKey: "michaelJacksonDesc", poster: "show-week2-michael-jackson.jpg" },
      { dayKey: "thursday", title: "Bingo", descriptionKey: "bingoDesc", poster: "show-week2-bingo.png" },
      { dayKey: "friday", title: "Gala", descriptionKey: "galaDesc", poster: "show-week2-gala.jpg" },
      { dayKey: "saturday", title: "Echoes of Mongolia", descriptionKey: "echoesMongoliaDesc", poster: "show-week2-echoes-mongolia.jpg" },
      { dayKey: "sunday", title: "DJ Port Side", descriptionKey: "djPortSideDesc", poster: "show-week2-dj-port-side.jpg" }
    ]
  ]
};

const SHOW_TIME = "21:30";
const SHOW_CYCLE_START_UTC = Date.UTC(2026, 6, 13);

const translations = {
  en: {
    benefitsButton: "Health & activity benefits",
    benefitsTitle: "Main benefits",
    musclesTitle: "Muscles activated",
    jointsTitle: "Joints involved",
    mindTitle: "Mind & focus",
    radioBenefits: "Creates a positive start to the day, encourages light movement and keeps guests informed about the programme.",
    radioMuscles: "Light full-body movement while dancing.",
    radioJoints: "Shoulders, hips, knees and ankles during gentle movement.",
    radioMind: "Improves mood, social connection and awareness of the day’s activities.",
    morningGymBenefits: "Supports circulation, flexibility, mobility, posture and daily energy while helping reduce morning stiffness.",
    morningGymMuscles: "Core, back, shoulders, glutes, thighs and calves.",
    morningGymJoints: "Shoulders, spine, hips, knees and ankles.",
    morningGymMind: "Promotes mental freshness, positive mood and stress relief.",
    bocciaBenefits: "Encourages gentle movement, balance, controlled throwing and functional mobility without high physical impact.",
    bocciaMuscles: "Shoulders, arms, forearms, core and legs.",
    bocciaJoints: "Shoulders, elbows, wrists, hips, knees and ankles.",
    bocciaMind: "Develops concentration, distance judgement, strategy, patience and social interaction.",
    dartsBenefits: "Improves precision, controlled arm movement and hand–eye coordination.",
    dartsMuscles: "Shoulders, upper arms, forearms, wrists and fingers.",
    dartsJoints: "Shoulders, elbows, wrists and finger joints.",
    dartsMind: "Strengthens focus, patience, calculation, decision-making and emotional control.",
    seaGymBenefits: "Water resistance provides a low-impact full-body workout that supports circulation, mobility, balance and endurance.",
    seaGymMuscles: "Core, shoulders, back, arms, glutes and legs.",
    seaGymJoints: "Shoulders, spine, hips, knees and ankles with reduced impact.",
    seaGymMind: "The sea environment supports relaxation, confidence and body awareness.",
    waterGymBenefits: "Supports cardiovascular fitness, muscle endurance, mobility and coordination while reducing pressure on the joints.",
    waterGymMuscles: "Core, arms, shoulders, back, glutes, thighs and calves.",
    waterGymJoints: "Shoulders, hips, knees, ankles and spine with low impact.",
    waterGymMind: "Improves rhythm, motivation, mood and stress relief.",
    waterPoloBenefits: "A dynamic full-body activity that supports cardiovascular endurance, strength, agility and reaction speed.",
    waterPoloMuscles: "Shoulders, chest, back, arms, core, glutes and legs.",
    waterPoloJoints: "Shoulders, elbows, wrists, hips, knees and ankles.",
    waterPoloMind: "Builds teamwork, quick decision-making, coordination, confidence and concentration.",
    radioPortSide: "Radio Port Side",
    morningGym: "Morning Gym",
    boccia: "Boccia",
    darts: "Darts",
    seaGym: "Sea Gym",
    waterGym: "Water Gym",
    waterPolo: "Water Polo",
    stage: "Stage",
    sea: "Sea",
    pool: "Pool",
    exceptSunday: "Every day except Sunday",
    radioDesc: "Start your day with the Port Side Morning Radio. Enjoy great music, meet our entertainment team and be the first to discover today’s activities, games and special surprises.",
    morningGymDesc: "Start your morning with an energising workout led by our entertainment team. It activates muscles and joints, improves flexibility and posture, supports blood circulation, reduces stiffness and helps you feel more energetic throughout the day.",
    bocciaDesc: "Enjoy a friendly and relaxing boccia game by the beach.",
    dartsDesc: "Test your aim in a fun and friendly darts competition.",
    seaGymDesc: "Refreshing exercises in the sea with movement and positive energy.",
    waterGymDesc: "Refreshing pool exercises with music, movement and good vibes.",
    bocciaAfternoonDesc: "Join the afternoon boccia game and enjoy friendly competition by the sea.",
    waterPoloDesc: "Team spirit, action and fun come together in the pool.",
    dartsAfternoonDesc: "Another chance to compete, have fun and hit the target.",
    hotelName: "PORT SIDE RESORT HOTEL",
    navActivities: "Activities",
    navShows: "Shows",
    navMusic: "Music",
    navGame: "Game",
    navGallery: "Gallery",
    quickActivities: "Activities",
    quickEvents: "Events",
    quickProgramme: "Shows",
    quickMusic: "Music",
    quickGame: "Game",
    quickContact: "Contact",
    gameKicker: "WEEKLY GUEST CHALLENGE",
    gameTitle: "Port Side Star Catch",
    gameIntro: "Catch the holiday icons, protect your three lives and enter the weekly Top 10.",
    gameRuleLives: "3 lives · No time limit",
    gameRuleWeekly: "Shared weekly Top 10",
    gameRulePrize: "Prize on stage every Thursday",
    gameButton: "PLAY NOW",
    gameClose: "Scores close Thursday at 21:00",
    eyebrow: "ENTERTAINMENT & ACTIVITIES",
    entertainmentProgramme: "ENTERTAINMENT<br>PROGRAMME",
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
    specialEventsKicker: "MORE TO ENJOY",
    specialEventsTitle: "Special Events",
    specialEventsIntro: "Live music and memorable evenings by the pool.",
    happyHourTitle: "Happy Hour",
    happyHourDesc: "Enjoy poolside music with DJ, live percussion and saxophone in a vibrant holiday atmosphere.",
    miniDiscoTitle: "Mini Disco",
    miniDiscoDesc: "A colourful dance party with music, simple choreography and fun for our little guests.",
    everyThursday: "Every Thursday",
    weatherPermitting: "Weather permitting",
    weekOneFriday: "Week 1 · Friday",
    weekTwoFriday: "Week 2 · Friday",
    galaTitle: "Gala",
    galaDesc: "A special gala evening by the pool, followed by The Blush cover band.",
    theBlushTitle: "The Blush",
    theBlushDesc: "Live favourites and timeless hits performed by The Blush cover band.",
    tonight: "TONIGHT",
    showProgrammeKicker: "TWO-WEEK PROGRAMME",
    showsTitle: "14-Day Show Programme",
    showsIntro: "Choose a week and tap a show to see its poster and details.",
    weekOne: "WEEK 1",
    weekTwo: "WEEK 2",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    tonightLabel: "TONIGHT",
    posterComingSoon: "Poster coming soon",
    faceOfAfricaDesc: "A spectacular acrobatics show filled with strength, balance and rhythm.",
    bonnlesDesc: "An energetic evening performance with stage entertainment and surprises.",
    razaUrbanaDesc: "Urban rhythm, powerful dance and vibrant stage energy come together.",
    bingoDesc: "Join us for a fun bingo evening full of excitement and surprises.",
    divaNovaDesc: "Enjoy a stylish live music evening with Diva Nova.",
    mexicoShowDesc: "A colourful show inspired by the music, dance and spirit of Mexico.",
    djPortSideDesc: "Dance, celebrate and enjoy the night with DJ Port Side.",
    tropicanaShowDesc: "Tropical rhythms, colourful costumes and energetic dance take the stage.",
    darkSideDesc: "A striking stage experience combining music, atmosphere and performance.",
    michaelJacksonDesc: "An exciting tribute celebrating the music and iconic moves of Michael Jackson.",
    galaTheBlushDesc: "A special gala evening together with The Blush cover band.",
    echoesMongoliaDesc: "A spectacular acrobatics show from beginning to end, inspired by the strength and spirit of Mongolia.",
    featuredShow: "FEATURED SHOW",
    posterPlaceholder: "Tonight\'s poster will appear here",
    showDetails: "Show details",
    showDescription: "Every Night Has Its Own Magic",
    timeLabel: "TIME",
    placeLabel: "PLACE",
    theatre: "Theatre",
    poolArea: "Pool Area",
    beach: "Beach",
    memories: "MEMORIES",
    galleryTitle: "Gallery",
    galleryIntro: "Photos, posters and special moments will be added here.",
    galleryComingSoon: "COMING SOON",
    musicKicker: "PORT SIDE SOUNDS",
    musicTitle: "Listen to the rhythm of your holiday",
    musicIntro: "Discover ten original Port Side tracks, from the morning welcome to sunset sounds.",
    musicTrackCount: "10 EXCLUSIVE TRACKS",
    musicListenOnly: "LISTEN ONLINE",
    musicButton: "LISTEN NOW",
    musicCollectionHint: "Choose a track and start listening.",
    musicFilterAll: "ALL",
    musicFilterSignature: "HOTEL SIGNATURES",
    musicFilterHook: "HOOK SOUNDS",
    musicFilterSunset: "SUNSET & SOUL",
    musicMorningType: "MORNING OPENING",
    musicClubType: "CLUB DANCE 2026",
    musicAnonsType: "ANNOUNCEMENT JINGLE",
    musicMoonlightType: "HOOK SOUND",
    musicRunType: "HOOK SOUND",
    musicViolinType: "HOOK SOUND",
    musicHomeType: "JAZZ · POP · RETRO SOUL",
    musicLeavingType: "JAZZ · POP · RETRO SOUL",
    musicFeelType: "SUNSET SOUND",
    musicLightsType: "SUNSET SOUND",
    musicNowPlaying: "NOW PLAYING",
    help: "NEED HELP?",
    contactTitle: "Stay connected",
    contactText: "Find the hotel, follow our updates or contact the animation team.",
    footerNote: "Made for unforgettable holiday moments.",
    loadingWeather: "Loading weather…",
    feelsLike: "Feels like",
    humidity: "Humidity",
    wind: "Wind",
    sunrise: "Sonnenaufgang",
    sunset: "Sonnenuntergang",
    sunrise: "Sunrise",
    sunset: "Sunset",
    updatedNow: "Updated now",
    weatherUnavailable: "Weather information is temporarily unavailable."
  },
  de: {
    benefitsButton: "Gesundheit & Aktivitätsvorteile",
    benefitsTitle: "Wichtigste Vorteile",
    musclesTitle: "Aktivierte Muskeln",
    jointsTitle: "Beanspruchte Gelenke",
    mindTitle: "Geist & Konzentration",
    radioBenefits: "Sorgt für einen positiven Start in den Tag, fördert leichte Bewegung und informiert über das Tagesprogramm.",
    radioMuscles: "Leichte Ganzkörperbewegung beim Tanzen.",
    radioJoints: "Schultern, Hüften, Knie und Sprunggelenke bei sanfter Bewegung.",
    radioMind: "Verbessert Stimmung, soziale Verbindung und Aufmerksamkeit für die Tagesaktivitäten.",
    morningGymBenefits: "Fördert Durchblutung, Beweglichkeit, Mobilität, Körperhaltung und Tagesenergie und hilft gegen morgendliche Steifheit.",
    morningGymMuscles: "Rumpf, Rücken, Schultern, Gesäß, Oberschenkel und Waden.",
    morningGymJoints: "Schultern, Wirbelsäule, Hüften, Knie und Sprunggelenke.",
    morningGymMind: "Fördert geistige Frische, positive Stimmung und Stressabbau.",
    bocciaBenefits: "Fördert sanfte Bewegung, Gleichgewicht, kontrolliertes Werfen und funktionelle Mobilität ohne hohe Belastung.",
    bocciaMuscles: "Schultern, Arme, Unterarme, Rumpf und Beine.",
    bocciaJoints: "Schultern, Ellenbogen, Handgelenke, Hüften, Knie und Sprunggelenke.",
    bocciaMind: "Trainiert Konzentration, Distanzgefühl, Strategie, Geduld und soziale Interaktion.",
    dartsBenefits: "Verbessert Präzision, kontrollierte Armbewegung und Hand-Auge-Koordination.",
    dartsMuscles: "Schultern, Oberarme, Unterarme, Handgelenke und Finger.",
    dartsJoints: "Schultern, Ellenbogen, Handgelenke und Fingergelenke.",
    dartsMind: "Stärkt Fokus, Geduld, Rechnen, Entscheidungsfähigkeit und emotionale Kontrolle.",
    seaGymBenefits: "Wasserwiderstand ermöglicht ein gelenkschonendes Ganzkörpertraining für Durchblutung, Mobilität, Gleichgewicht und Ausdauer.",
    seaGymMuscles: "Rumpf, Schultern, Rücken, Arme, Gesäß und Beine.",
    seaGymJoints: "Schultern, Wirbelsäule, Hüften, Knie und Sprunggelenke mit geringer Belastung.",
    seaGymMind: "Die Meeresumgebung unterstützt Entspannung, Selbstvertrauen und Körperwahrnehmung.",
    waterGymBenefits: "Fördert Herz-Kreislauf-Fitness, Muskelausdauer, Mobilität und Koordination bei geringer Gelenkbelastung.",
    waterGymMuscles: "Rumpf, Arme, Schultern, Rücken, Gesäß, Oberschenkel und Waden.",
    waterGymJoints: "Schultern, Hüften, Knie, Sprunggelenke und Wirbelsäule gelenkschonend.",
    waterGymMind: "Verbessert Rhythmusgefühl, Motivation, Stimmung und Stressabbau.",
    waterPoloBenefits: "Eine dynamische Ganzkörperaktivität für Ausdauer, Kraft, Beweglichkeit und Reaktionsgeschwindigkeit.",
    waterPoloMuscles: "Schultern, Brust, Rücken, Arme, Rumpf, Gesäß und Beine.",
    waterPoloJoints: "Schultern, Ellenbogen, Handgelenke, Hüften, Knie und Sprunggelenke.",
    waterPoloMind: "Fördert Teamarbeit, schnelle Entscheidungen, Koordination, Selbstvertrauen und Konzentration.",
    radioPortSide: "Radio Port Side",
    morningGym: "Morgengymnastik",
    boccia: "Boccia",
    darts: "Darts",
    seaGym: "Meeresgymnastik",
    waterGym: "Wassergymnastik",
    waterPolo: "Wasserball",
    stage: "Bühne",
    sea: "Meer",
    pool: "Pool",
    exceptSunday: "Täglich außer sonntags",
    radioDesc: "Beginnen Sie Ihren Urlaubstag mit dem Port Side Morgenradio. Genießen Sie gute Musik, lernen Sie unser Animationsteam kennen und erfahren Sie als Erste alles über die Aktivitäten, Spiele und Überraschungen des Tages.",
    morningGymDesc: "Beginnen Sie den Tag mit einem belebenden Workout gemeinsam mit unserem Animationsteam. Es aktiviert Muskeln und Gelenke, verbessert Beweglichkeit und Körperhaltung, fördert die Durchblutung, löst Verspannungen und schenkt Ihnen mehr Energie für den Tag.",
    bocciaDesc: "Genießen Sie eine freundliche und entspannte Boccia-Runde am Strand.",
    dartsDesc: "Testen Sie Ihre Treffsicherheit bei einem unterhaltsamen Dartspiel.",
    seaGymDesc: "Erfrischende Übungen im Meer mit Bewegung und positiver Energie.",
    waterGymDesc: "Erfrischende Wassergymnastik mit Musik, Bewegung und guter Laune.",
    bocciaAfternoonDesc: "Machen Sie beim Boccia am Nachmittag mit und genießen Sie den freundlichen Wettbewerb am Meer.",
    waterPoloDesc: "Teamgeist, Action und Spaß treffen sich im Pool.",
    dartsAfternoonDesc: "Eine weitere Gelegenheit für Spaß, Wettbewerb und einen Treffer ins Ziel.",
    hotelName: "PORT SIDE RESORT HOTEL",
    navActivities: "Aktivitäten",
    navShows: "Shows",
    navMusic: "Musik",
    navGame: "Spiel",
    navGallery: "Galerie",
    quickActivities: "Aktivitäten",
    quickEvents: "Events",
    quickProgramme: "Shows",
    quickMusic: "Musik",
    quickGame: "Spiel",
    quickContact: "Kontakt",
    gameKicker: "WÖCHENTLICHE GÄSTE-CHALLENGE",
    gameTitle: "Port Side Star Catch",
    gameIntro: "Fange die Urlaubssymbole, schütze deine drei Leben und erreiche die wöchentlichen Top 10.",
    gameRuleLives: "3 Leben · Kein Zeitlimit",
    gameRuleWeekly: "Gemeinsame wöchentliche Top 10",
    gameRulePrize: "Jeden Donnerstag Preisvergabe auf der Bühne",
    gameButton: "JETZT SPIELEN",
    gameClose: "Punkteannahme endet Donnerstag um 21:00 Uhr",
    eyebrow: "ANIMATION & AKTIVITÄTEN",
    entertainmentProgramme: "UNTERHALTUNGS<br>PROGRAMM",
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
    specialEventsKicker: "NOCH MEHR ERLEBEN",
    specialEventsTitle: "Besondere Events",
    specialEventsIntro: "Live-Musik und unvergessliche Abende am Pool.",
    happyHourTitle: "Happy Hour",
    happyHourDesc: "Genießen Sie Musik am Pool mit DJ, Live-Percussion und Saxofon in lebendiger Urlaubsatmosphäre.",
    miniDiscoTitle: "Mini Disco",
    miniDiscoDesc: "Eine farbenfrohe Tanzparty mit Musik, einfachen Choreografien und viel Spaß für unsere kleinen Gäste.",
    everyThursday: "Jeden Donnerstag",
    weatherPermitting: "Bei gutem Wetter",
    weekOneFriday: "Woche 1 · Freitag",
    weekTwoFriday: "Woche 2 · Freitag",
    galaTitle: "Gala",
    galaDesc: "Ein besonderer Galaabend am Pool, gefolgt von der Coverband The Blush.",
    theBlushTitle: "The Blush",
    theBlushDesc: "Live-Favoriten und zeitlose Hits, präsentiert von der Coverband The Blush.",
    tonight: "HEUTE ABEND",
    showProgrammeKicker: "ZWEI-WOCHEN-PROGRAMM",
    showsTitle: "14-Tage-Showprogramm",
    showsIntro: "Wählen Sie eine Woche und tippen Sie auf eine Show, um Plakat und Details zu sehen.",
    weekOne: "WOCHE 1",
    weekTwo: "WOCHE 2",
    monday: "Montag",
    tuesday: "Dienstag",
    wednesday: "Mittwoch",
    thursday: "Donnerstag",
    friday: "Freitag",
    saturday: "Samstag",
    sunday: "Sonntag",
    tonightLabel: "HEUTE ABEND",
    posterComingSoon: "Plakat folgt in Kürze",
    faceOfAfricaDesc: "Eine spektakuläre Akrobatikshow voller Kraft, Balance und Rhythmus.",
    bonnlesDesc: "Eine energiegeladene Abendshow mit Bühnenunterhaltung und Überraschungen.",
    razaUrbanaDesc: "Urbaner Rhythmus, kraftvoller Tanz und lebendige Bühnenenergie treffen aufeinander.",
    bingoDesc: "Freuen Sie sich auf einen unterhaltsamen Bingoabend voller Spannung und Überraschungen.",
    divaNovaDesc: "Genießen Sie einen stilvollen Live-Musik-Abend mit Diva Nova.",
    mexicoShowDesc: "Eine farbenfrohe Show, inspiriert von Musik, Tanz und Lebensfreude Mexikos.",
    djPortSideDesc: "Tanzen, feiern und genießen Sie den Abend mit DJ Port Side.",
    tropicanaShowDesc: "Tropische Rhythmen, farbenfrohe Kostüme und energiegeladener Tanz erobern die Bühne.",
    darkSideDesc: "Ein eindrucksvolles Bühnenerlebnis aus Musik, Atmosphäre und Performance.",
    michaelJacksonDesc: "Eine mitreißende Hommage an die Musik und legendären Moves von Michael Jackson.",
    galaTheBlushDesc: "Ein besonderer Galaabend gemeinsam mit der Coverband The Blush.",
    echoesMongoliaDesc: "Eine spektakuläre Akrobatikshow von Anfang bis Ende, inspiriert von der Kraft und dem Geist der Mongolei.",
    featuredShow: "SHOW DES ABENDS",
    posterPlaceholder: "Das heutige Showplakat erscheint hier",
    showDetails: "Show-Details",
    showDescription: "Jede Nacht hat ihre eigene Magie",
    timeLabel: "ZEIT",
    placeLabel: "ORT",
    theatre: "Theater",
    poolArea: "Poolbereich",
    beach: "Strand",
    memories: "ERINNERUNGEN",
    galleryTitle: "Galerie",
    galleryIntro: "Fotos, Plakate und besondere Momente werden hier hinzugefügt.",
    galleryComingSoon: "DEMNÄCHST VERFÜGBAR",
    musicKicker: "PORT SIDE SOUNDS",
    musicTitle: "Hören Sie den Rhythmus Ihres Urlaubs",
    musicIntro: "Entdecken Sie zehn exklusive Port Side Songs – vom Morgengruß bis zum Sunset Sound.",
    musicTrackCount: "10 EXKLUSIVE SONGS",
    musicListenOnly: "ONLINE ANHÖREN",
    musicButton: "JETZT ANHÖREN",
    musicCollectionHint: "Wählen Sie einen Song und hören Sie los.",
    musicFilterAll: "ALLE",
    musicFilterSignature: "HOTEL SIGNATURES",
    musicFilterHook: "HOOK SOUNDS",
    musicFilterSunset: "SUNSET & SOUL",
    musicMorningType: "MORGENERÖFFNUNG",
    musicClubType: "CLUBTANZ 2026",
    musicAnonsType: "ANSAGE-JINGLE",
    musicMoonlightType: "HOOK SOUND",
    musicRunType: "HOOK SOUND",
    musicViolinType: "HOOK SOUND",
    musicHomeType: "JAZZ · POP · RETRO SOUL",
    musicLeavingType: "JAZZ · POP · RETRO SOUL",
    musicFeelType: "SUNSET SOUND",
    musicLightsType: "SUNSET SOUND",
    musicNowPlaying: "LÄUFT GERADE",
    help: "BRAUCHEN SIE HILFE?",
    contactTitle: "Bleiben Sie verbunden",
    contactText: "Finden Sie das Hotel, folgen Sie unseren Updates oder kontaktieren Sie das Animationsteam.",
    footerNote: "Für unvergessliche Urlaubsmomente.",
    loadingWeather: "Wetter wird geladen…",
    feelsLike: "Gefühlt",
    humidity: "Luftfeuchtigkeit",
    wind: "Wind",
    sunrise: "Sonnenaufgang",
    sunset: "Sonnenuntergang",
    sunrise: "Sunrise",
    sunset: "Sunset",
    updatedNow: "Gerade aktualisiert",
    weatherUnavailable: "Die Wetterdaten sind vorübergehend nicht verfügbar."
  },
  tr: {
    benefitsButton: "Sağlık ve aktivite faydaları",
    benefitsTitle: "Temel faydalar",
    musclesTitle: "Çalışan kaslar",
    jointsTitle: "Aktif eklemler",
    mindTitle: "Zihin ve odak",
    radioBenefits: "Güne pozitif başlamayı sağlar, hafif hareketi teşvik eder ve misafirleri günlük program hakkında bilgilendirir.",
    radioMuscles: "Dans sırasında hafif tüm vücut hareketi.",
    radioJoints: "Hafif hareketlerde omuz, kalça, diz ve ayak bilekleri.",
    radioMind: "Ruh hâlini, sosyalleşmeyi ve günlük aktivitelere yönelik farkındalığı destekler.",
    morningGymBenefits: "Kan dolaşımını, esnekliği, hareket kabiliyetini, duruşu ve günlük enerjiyi destekler; sabah tutukluğunu azaltmaya yardımcı olur.",
    morningGymMuscles: "Karın ve merkez bölgesi, sırt, omuz, kalça, üst bacak ve baldırlar.",
    morningGymJoints: "Omuzlar, omurga, kalçalar, dizler ve ayak bilekleri.",
    morningGymMind: "Zihinsel tazelik, pozitif ruh hâli ve stresin azalmasını destekler.",
    bocciaBenefits: "Yüksek fiziksel yük oluşturmadan hafif hareketi, dengeyi, kontrollü atışı ve günlük hareket kabiliyetini destekler.",
    bocciaMuscles: "Omuzlar, kollar, ön kollar, merkez bölgesi ve bacaklar.",
    bocciaJoints: "Omuz, dirsek, el bileği, kalça, diz ve ayak bilekleri.",
    bocciaMind: "Konsantrasyon, mesafe tahmini, strateji, sabır ve sosyal etkileşimi geliştirir.",
    dartsBenefits: "Hassasiyeti, kontrollü kol hareketini ve el-göz koordinasyonunu geliştirir.",
    dartsMuscles: "Omuz, üst kol, ön kol, el bileği ve parmak kasları.",
    dartsJoints: "Omuz, dirsek, el bileği ve parmak eklemleri.",
    dartsMind: "Odaklanma, sabır, hesaplama, karar verme ve duygu kontrolünü güçlendirir.",
    seaGymBenefits: "Suyun direnci, eklemlere düşük yük bindiren tüm vücut egzersizi sağlar; dolaşımı, hareketliliği, dengeyi ve dayanıklılığı destekler.",
    seaGymMuscles: "Merkez bölgesi, omuz, sırt, kol, kalça ve bacaklar.",
    seaGymJoints: "Düşük darbeyle omuzlar, omurga, kalçalar, dizler ve ayak bilekleri.",
    seaGymMind: "Deniz ortamı rahatlamayı, özgüveni ve beden farkındalığını destekler.",
    waterGymBenefits: "Eklemlere binen baskıyı azaltırken kalp-damar dayanıklılığını, kas direncini, hareketliliği ve koordinasyonu destekler.",
    waterGymMuscles: "Merkez bölgesi, kollar, omuzlar, sırt, kalça, üst bacak ve baldırlar.",
    waterGymJoints: "Düşük darbeyle omuz, kalça, diz, ayak bileği ve omurga.",
    waterGymMind: "Ritim duygusunu, motivasyonu, ruh hâlini ve stresin azalmasını destekler.",
    waterPoloBenefits: "Kalp-damar dayanıklılığını, gücü, çevikliği ve reaksiyon hızını destekleyen dinamik bir tüm vücut aktivitesidir.",
    waterPoloMuscles: "Omuz, göğüs, sırt, kollar, merkez bölgesi, kalça ve bacaklar.",
    waterPoloJoints: "Omuz, dirsek, el bileği, kalça, diz ve ayak bilekleri.",
    waterPoloMind: "Takım çalışması, hızlı karar verme, koordinasyon, özgüven ve konsantrasyonu geliştirir.",
    radioPortSide: "Radio Port Side",
    morningGym: "Sabah Gym",
    boccia: "Boccia",
    darts: "Dart",
    seaGym: "Deniz Gym",
    waterGym: "Su Gym",
    waterPolo: "Su Topu",
    stage: "Sahne",
    sea: "Deniz",
    pool: "Havuz",
    exceptSunday: "Pazar hariç her gün",
    radioDesc: "Güne Port Side Sabah Radyosu ile başlayın. Müziğin keyfini çıkarın, animasyon ekibimizle tanışın ve günün aktiviteleri, oyunları ve sürprizlerinden ilk siz haberdar olun.",
    morningGymDesc: "Animasyon ekibimiz eşliğinde güne enerji dolu başlayın. Sabah Gym kasları ve eklemleri harekete geçirir, esnekliği ve duruşu destekler, kan dolaşımını hızlandırır, kas gerginliğini azaltır ve gün boyu daha zinde hissetmenize yardımcı olur.",
    bocciaDesc: "Sahilde keyifli ve dostça bir boccia oyununa katılın.",
    dartsDesc: "Eğlenceli ve dostça bir dart yarışmasında nişanınızı test edin.",
    seaGymDesc: "Denizde hareket ve pozitif enerjiyle serinletici egzersizler.",
    waterGymDesc: "Müzik, hareket ve güzel enerjiyle serinletici havuz egzersizi.",
    bocciaAfternoonDesc: "Öğleden sonra sahilde düzenlenen eğlenceli boccia oyununa katılın.",
    waterPoloDesc: "Takım ruhu, hareket ve eğlence havuzda bir araya geliyor.",
    dartsAfternoonDesc: "Eğlenmek, yarışmak ve hedefi vurmak için bir fırsat daha.",
    hotelName: "PORT SIDE RESORT HOTEL",
    navActivities: "Aktiviteler",
    navShows: "Şovlar",
    navMusic: "Müzik",
    navGame: "Oyun",
    navGallery: "Galeri",
    quickActivities: "Aktiviteler",
    quickEvents: "Etkinlikler",
    quickProgramme: "Şovlar",
    quickMusic: "Müzik",
    quickGame: "Oyun",
    quickContact: "İletişim",
    gameKicker: "HAFTALIK MİSAFİR YARIŞMASI",
    gameTitle: "Port Side Star Catch",
    gameIntro: "Tatil ikonlarını yakala, üç canını koru ve haftalık İlk 10'a gir.",
    gameRuleLives: "3 can · Süre sınırı yok",
    gameRuleWeekly: "Ortak haftalık İlk 10",
    gameRulePrize: "Her Perşembe sahnede ödül",
    gameButton: "HEMEN OYNA",
    gameClose: "Skor alımı Perşembe 21:00'de kapanır",
    eyebrow: "ANİMASYON & AKTİVİTELER",
    entertainmentProgramme: "EĞLENCE<br>PROGRAMI",
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
    specialEventsKicker: "EĞLENCEYE DEVAM",
    specialEventsTitle: "Özel Etkinlikler",
    specialEventsIntro: "Havuz başında canlı müzik ve unutulmaz akşamlar.",
    happyHourTitle: "Happy Hour",
    happyHourDesc: "Havuz başında DJ, canlı perküsyon ve saksafon eşliğinde enerjik müziğin keyfini çıkarın.",
    miniDiscoTitle: "Mini Disco",
    miniDiscoDesc: "Minik misafirlerimiz için müzik, kolay danslar ve eğlenceyle dolu renkli bir dans partisi.",
    everyThursday: "Her Perşembe",
    weatherPermitting: "Hava koşulları uygunsa",
    weekOneFriday: "1. Hafta · Cuma",
    weekTwoFriday: "2. Hafta · Cuma",
    galaTitle: "Gala",
    galaDesc: "Havuz başında özel gala gecesi, ardından The Blush cover band performansı.",
    theBlushTitle: "The Blush",
    theBlushDesc: "The Blush cover band ile sevilen şarkılar ve unutulmaz canlı müzik performansı.",
    tonight: "BU AKŞAM",
    showProgrammeKicker: "İKİ HAFTALIK PROGRAM",
    showsTitle: "14 Günlük Şov Programı",
    showsIntro: "Haftayı seçin; afişi ve ayrıntıları görmek için şova dokunun.",
    weekOne: "1. HAFTA",
    weekTwo: "2. HAFTA",
    monday: "Pazartesi",
    tuesday: "Salı",
    wednesday: "Çarşamba",
    thursday: "Perşembe",
    friday: "Cuma",
    saturday: "Cumartesi",
    sunday: "Pazar",
    tonightLabel: "BU AKŞAM",
    posterComingSoon: "Afiş yakında eklenecek",
    faceOfAfricaDesc: "Güç, denge ve ritimle dolu etkileyici bir akrobasi gösterisi.",
    bonnlesDesc: "Sahne eğlencesi ve sürprizlerle dolu, yüksek enerjili bir akşam gösterisi.",
    razaUrbanaDesc: "Şehir ritimleri, güçlü danslar ve yüksek sahne enerjisi bir araya geliyor.",
    bingoDesc: "Heyecan ve sürprizlerle dolu eğlenceli bingo gecemize katılın.",
    divaNovaDesc: "Diva Nova ile şık ve keyifli bir canlı müzik akşamının tadını çıkarın.",
    mexicoShowDesc: "Meksika'nın müziğinden, dansından ve ruhundan ilham alan renkli bir gösteri.",
    djPortSideDesc: "DJ Port Side ile dans edin, eğlenin ve gecenin tadını çıkarın.",
    tropicanaShowDesc: "Tropikal ritimler, renkli kostümler ve enerjik danslar sahnede buluşuyor.",
    darkSideDesc: "Müzik, atmosfer ve performansı birleştiren etkileyici bir sahne deneyimi.",
    michaelJacksonDesc: "Michael Jackson'ın müziğini ve ikonik danslarını kutlayan heyecan verici bir gösteri.",
    galaTheBlushDesc: "The Blush cover band eşliğinde özel bir gala gecesi.",
    echoesMongoliaDesc: "Moğolistan'ın gücünden ve ruhundan ilham alan, baştan sona etkileyici bir akrobasi gösterisi.",
    featuredShow: "GECENİN ŞOVU",
    posterPlaceholder: "Bu akşamki afiş burada görünecek",
    showDetails: "Şov detayları",
    showDescription: "Her gecenin kendine ait bir büyüsü vardır",
    timeLabel: "SAAT",
    placeLabel: "YER",
    theatre: "Tiyatro",
    poolArea: "Havuz Alanı",
    beach: "Sahil",
    memories: "ANILAR",
    galleryTitle: "Galeri",
    galleryIntro: "Fotoğraflar, afişler ve özel anlar buraya eklenecek.",
    galleryComingSoon: "YAKINDA",
    musicKicker: "PORT SIDE SOUNDS",
    musicTitle: "Tatilin ritmini dinleyin",
    musicIntro: "Sabah karşılamasından gün batımına uzanan on özel Port Side parçasını keşfedin.",
    musicTrackCount: "10 ÖZEL PARÇA",
    musicListenOnly: "SADECE ONLİNE DİNLE",
    musicButton: "ŞİMDİ DİNLE",
    musicCollectionHint: "Bir parça seçin ve dinlemeye başlayın.",
    musicFilterAll: "TÜMÜ",
    musicFilterSignature: "HOTEL İMZALARI",
    musicFilterHook: "HOOK SOUNDS",
    musicFilterSunset: "SUNSET & SOUL",
    musicMorningType: "SABAH AÇILIŞI",
    musicClubType: "CLUB DANSI 2026",
    musicAnonsType: "ANONS JINGLE",
    musicMoonlightType: "HOOK SOUND",
    musicRunType: "HOOK SOUND",
    musicViolinType: "HOOK SOUND",
    musicHomeType: "JAZZ · POP · RETRO SOUL",
    musicLeavingType: "JAZZ · POP · RETRO SOUL",
    musicFeelType: "SUNSET SOUND",
    musicLightsType: "SUNSET SOUND",
    musicNowPlaying: "ŞİMDİ ÇALIYOR",
    help: "YARDIMA MI İHTİYACINIZ VAR?",
    contactTitle: "Bağlantıda kalın",
    contactText: "Oteli bulun, güncellemeleri takip edin veya animasyon ekibiyle iletişime geçin.",
    footerNote: "Unutulmaz tatil anları için hazırlandı.",
    loadingWeather: "Hava durumu yükleniyor…",
    feelsLike: "Hissedilen",
    humidity: "Nem",
    wind: "Rüzgâr",
    sunrise: "Gün doğumu",
    sunset: "Gün batımı",
    updatedNow: "Şimdi güncellendi",
    weatherUnavailable: "Hava durumu bilgisi geçici olarak alınamıyor."
  }
};

let currentLanguage = "de";

function translate(key) {
  return translations[currentLanguage][key] || key;
}

function renderActivities() {
  const activityGrid = document.getElementById("activityGrid");
  const miniSchedule = document.getElementById("miniSchedule");

  if (activityGrid) {
    activityGrid.innerHTML = content.activities.map(item => `
      <article class="activity-card activity-card-visual">
        <div class="activity-image" style="background-image:url('${item.image}')"></div>
        <div class="activity-card-body">
          <div class="activity-card-head">
            <span class="activity-time">${item.time}</span>
            <span class="activity-frequency">${translate("exceptSunday")}</span>
          </div>

          <h3>${translate(item.titleKey)}</h3>
          <p class="activity-location">${translate(item.locationKey)}</p>
          <p class="activity-description">${translate(item.descriptionKey)}</p>

          <details class="activity-benefits">
            <summary>${translate("benefitsButton")}</summary>
            <div class="benefit-list">
              <div class="benefit-row">
                <span class="benefit-icon">♥</span>
                <div><strong>${translate("benefitsTitle")}</strong><p>${translate(item.benefitsKey)}</p></div>
              </div>
              <div class="benefit-row">
                <span class="benefit-icon">●</span>
                <div><strong>${translate("musclesTitle")}</strong><p>${translate(item.musclesKey)}</p></div>
              </div>
              <div class="benefit-row">
                <span class="benefit-icon">◆</span>
                <div><strong>${translate("jointsTitle")}</strong><p>${translate(item.jointsKey)}</p></div>
              </div>
              <div class="benefit-row">
                <span class="benefit-icon">✦</span>
                <div><strong>${translate("mindTitle")}</strong><p>${translate(item.mindKey)}</p></div>
              </div>
            </div>
          </details>
        </div>
      </article>
    `).join("");
  }

  if (miniSchedule) {
    miniSchedule.innerHTML = content.activities.slice(0, 3).map(item => `
      <div class="mini-item">
        <span class="mini-time">${item.time}</span>
        <div>
          <strong>${translate(item.titleKey)}</strong>
          <small>${translate(item.locationKey)}</small>
        </div>
      </div>
    `).join("");
  }
}

function getIstanbulDate() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Istanbul",
    year: "numeric",
    month: "numeric",
    day: "numeric"
  }).formatToParts(new Date());

  const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
  return new Date(Date.UTC(Number(values.year), Number(values.month) - 1, Number(values.day)));
}

function getCurrentShowPosition() {
  const today = getIstanbulDate();
  const dayDifference = Math.floor((today.getTime() - SHOW_CYCLE_START_UTC) / 86400000);
  const weekOffset = Math.floor(dayDifference / 7);
  const week = ((weekOffset % 2) + 2) % 2;
  const jsDay = today.getUTCDay();
  const day = jsDay === 0 ? 6 : jsDay - 1;
  return { week, day };
}

let activeProgrammeWeek = getCurrentShowPosition().week;
let selectedShow = null;

function setPoster(element, posterPath) {
  if (!element) return;
  const placeholder = element.querySelector("span");

  if (posterPath) {
    element.classList.add("has-image");
    element.style.backgroundImage = `url("${posterPath}")`;
    if (placeholder) placeholder.hidden = true;
  } else {
    element.classList.remove("has-image");
    element.style.backgroundImage = "";
    if (placeholder) {
      placeholder.hidden = false;
      placeholder.textContent = translate("posterComingSoon");
    }
  }
}

function renderShow() {
  const position = getCurrentShowPosition();
  const tonightShow = content.showWeeks[position.week][position.day];
  const heroTitle = document.getElementById("tonightShowTitle");
  const heroPoster = document.getElementById("tonightPoster");

  if (heroTitle) heroTitle.textContent = tonightShow.title;
  setPoster(heroPoster, tonightShow.poster);
}

function renderShowSchedule() {
  const grid = document.getElementById("showProgrammeGrid");
  if (!grid) return;

  const current = getCurrentShowPosition();
  const shows = content.showWeeks[activeProgrammeWeek];

  grid.innerHTML = shows.map((show, index) => {
    const isTonight = activeProgrammeWeek === current.week && index === current.day;
    const posterStyle = show.poster ? ` style="background-image:url('${show.poster}')"` : "";
    return `
      <button class="show-programme-card${isTonight ? " is-tonight" : ""}" type="button" data-show-index="${index}">
        <span class="programme-poster${show.poster ? " has-image" : ""}"${posterStyle}>
          ${show.poster ? "" : `<span>${translate("posterComingSoon")}</span>`}
        </span>
        <span class="programme-card-body">
          <span class="programme-day-row">
            <span class="programme-day">${translate(show.dayKey)}</span>
            ${isTonight ? `<span class="programme-tonight">${translate("tonightLabel")}</span>` : ""}
          </span>
          <strong>${show.title}</strong>
          <span class="programme-time">${SHOW_TIME}</span>
        </span>
      </button>
    `;
  }).join("");

  document.querySelectorAll(".programme-tab").forEach(tab => {
    const isActive = Number(tab.dataset.week) === activeProgrammeWeek;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  grid.querySelectorAll("[data-show-index]").forEach(card => {
    card.addEventListener("click", () => openShowModal(activeProgrammeWeek, Number(card.dataset.showIndex)));
  });
}

function openShowModal(weekIndex, showIndex) {
  const modal = document.getElementById("showModal");
  const show = content.showWeeks[weekIndex][showIndex];
  if (!modal || !show) return;

  selectedShow = { weekIndex, showIndex };
  document.getElementById("showModalDay").textContent = translate(show.dayKey);
  document.getElementById("showModalTitle").textContent = show.title;
  document.getElementById("showModalDescription").textContent = translate(show.descriptionKey);
  setPoster(document.getElementById("showModalPoster"), show.poster);

  if (!modal.open && typeof modal.showModal === "function") modal.showModal();
  else if (!modal.open) modal.setAttribute("open", "");
}

function refreshOpenShowModal() {
  const modal = document.getElementById("showModal");
  if (!selectedShow || !modal?.open) return;
  openShowModal(selectedShow.weekIndex, selectedShow.showIndex);
}

function setLanguage(lang) {
  if (!translations[lang]) return;

  currentLanguage = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.getAttribute("data-i18n");
    const value = translate(key);
    element.innerHTML = String(value);
  });

  document.querySelectorAll("[data-lang]").forEach(button => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });

  localStorage.setItem("portSideLanguage", lang);
  renderActivities();
  renderShow();
  renderShowSchedule();
  refreshOpenShowModal();
  renderWeatherDate();

  if (window.latestWeatherData) {
    renderWeather(window.latestWeatherData);
  }

  window.dispatchEvent(new CustomEvent("portside:languagechange", { detail: { language: lang } }));
}

document.querySelectorAll("[data-lang]").forEach(button => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

document.querySelectorAll(".programme-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    activeProgrammeWeek = Number(tab.dataset.week);
    renderShowSchedule();
  });
});

const showModal = document.getElementById("showModal");
const showModalClose = document.getElementById("showModalClose");

showModalClose?.addEventListener("click", () => showModal.close());
showModal?.addEventListener("click", event => {
  if (event.target === showModal) showModal.close();
});

setLanguage(currentLanguage);


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
  const weatherDate = document.getElementById("weatherDate");
  if (!weatherDate) return;

  weatherDate.textContent = new Intl.DateTimeFormat(
    localeForLanguage(),
    { weekday: "long", day: "numeric", month: "long", year: "numeric" }
  ).format(new Date());
}

function renderWeather(data) {
  const current = data.current;
  const daily = data.daily;

  const navIcon = document.getElementById("navWeatherIcon");
  const navTemp = document.getElementById("navWeatherTemp");
  const humidity = document.getElementById("weatherHumidity");
  const wind = document.getElementById("weatherWind");
  const sunrise = document.getElementById("weatherSunrise");
  const sunset = document.getElementById("weatherSunset");
  const condition = document.getElementById("weatherConditionSmall");
  const updated = document.getElementById("weatherUpdatedSmall");

  if (navIcon) navIcon.textContent = weatherIcon(current.weather_code, current.is_day);
  if (navTemp) navTemp.textContent = `${Math.round(current.temperature_2m)}°`;
  if (humidity) humidity.textContent = `${Math.round(current.relative_humidity_2m)}%`;
  if (wind) wind.textContent = `${Math.round(current.wind_speed_10m)} km/h`;
  if (condition) {
    condition.textContent =
      weatherText[currentLanguage][current.weather_code] || weatherText[currentLanguage][2];
  }
  if (updated) {
    updated.textContent = translate("updatedNow");
  }

  const timeFormatter = new Intl.DateTimeFormat(localeForLanguage(), {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  if (sunrise && daily?.sunrise?.[0]) {
    sunrise.textContent = timeFormatter.format(new Date(daily.sunrise[0]));
  }

  if (sunset && daily?.sunset?.[0]) {
    sunset.textContent = timeFormatter.format(new Date(daily.sunset[0]));
  }
}

async function loadWeather() {
  renderWeatherDate();
  const params = new URLSearchParams({
    latitude: WEATHER_COORDINATES.latitude,
    longitude: WEATHER_COORDINATES.longitude,
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset",
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
    const navTemp = document.getElementById("navWeatherTemp");
    if (navTemp) navTemp.textContent = "—°";
  }
}



const weatherToggle = document.getElementById("weatherToggle");
const weatherDetails = document.getElementById("weatherDetails");

if (weatherToggle && weatherDetails) {
  weatherToggle.addEventListener("click", () => {
    const isOpen = weatherDetails.classList.toggle("open");
    weatherToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", event => {
    if (!event.target.closest(".nav-weather-wrap")) {
      weatherDetails.classList.remove("open");
      weatherToggle.setAttribute("aria-expanded", "false");
    }
  });
}

loadWeather();
setInterval(loadWeather, 30 * 60 * 1000);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  });
}
