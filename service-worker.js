const CACHE_PREFIX = "port-side-programme-";
const CACHE_NAME = `${CACHE_PREFIX}v65-fresh-navigation`;
const FILES = [
  "./",
  "./index.html",
  "./style.css?v=58",
  "./script.js?v=56",
  "./gallery-config.js?v=1",
  "./gallery.css?v=2",
  "./gallery-frames.js?v=1",
  "./gallery.js?v=2",
  "./gallery-assets/frames-atlas.png",
  "./gallery-assets/frames-manifest.json",
  "./sudoku-config.js?v=1",
  "./sudoku-i18n.js?v=3",
  "./sudoku.js?v=6",
  "./sudoku-night-pool-bg.jpg",
  "./logo.png",
  "./stage-bg.png",
  "./show-week1-face-africa.jpg",
  "./show-week1-bonnles.jpg",
  "./show-week1-raza-urbana.jpg",
  "./show-week1-bingo.png",
  "./show-week1-diva-nova.jpg",
  "./show-week1-mexico.jpg",
  "./show-week1-dj-port-side.jpg",
  "./show-week1-world-cup-final.jpg",
  "./sunday-animation-day-off.jpg",
  "./show-week2-tropicana.jpg",
  "./show-week2-dark-side.jpg",
  "./show-week2-michael-jackson.jpg",
  "./show-week2-bingo.png",
  "./show-week2-friday-show-time.jpg",
  "./show-week2-echoes-mongolia.jpg",
  "./show-week2-dj-port-side.jpg",
  "./event-happy-hour.jpg",
  "./event-mini-disco.jpg",
  "./event-oktoberfest-2026.jpg",
  "./hotel-logo-gold.png",
  "./game-hotel-background.jpg",
  "./activity-radio.jpg",
  "./activity-morning-gym.jpg",
  "./activity-boccia.jpg",
  "./activity-darts.jpg",
  "./activity-sea-gym.jpg",
  "./activity-water-gym.jpg",
  "./activity-water-polo.jpg",
  "./activity-aqua-yoga.jpg",
  "./activity-sunrise-yoga.jpg",
  "./music/",
  "./music/index.html",
  "./music/style.css",
  "./music/player.js",
  "./music/main-player.js?v=52",
  "./spotify-midnight-tides.jpg",
  "./spotify-golden-nights.jpg",
  "./manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("fetch", event => {
  // Never cache cross-origin game API calls or score submissions.
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;

  // Always prefer the newest page while online so returning QR guests do not
  // remain on an older programme cached by a previous service worker.
  if (event.request.mode === "navigate") {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => (
        fetch(event.request)
          .then(async response => {
            if (response.ok) await cache.put(event.request, response.clone());
            return response;
          })
          .catch(async error => {
            const cachedResponse = await cache.match(event.request, { ignoreSearch: true });
            if (cachedResponse) return cachedResponse;

            const requestUrl = new URL(event.request.url);
            const scopePath = new URL(self.registration.scope).pathname;
            if (requestUrl.pathname === scopePath || requestUrl.pathname === `${scopePath}index.html`) {
              const homeFallback = await cache.match("./index.html");
              if (homeFallback) return homeFallback;
            }

            throw error;
          })
      ))
    );
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME)
      .then(cache => cache.match(event.request))
      .then(response => response || fetch(event.request))
  );
});


self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});
