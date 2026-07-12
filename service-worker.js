const CACHE_NAME = "port-side-v24-entertainment-links";
const FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./logo.png",
  "./stage-bg.png",
  "./show-week1-face-africa.jpg",
  "./show-week1-bonnles.jpg",
  "./show-week1-raza-urbana.jpg",
  "./show-week1-bingo.png",
  "./show-week1-diva-nova.jpg",
  "./show-week1-mexico.jpg",
  "./show-week1-dj-port-side.jpg",
  "./show-week2-tropicana.jpg",
  "./show-week2-dark-side.jpg",
  "./show-week2-michael-jackson.jpg",
  "./show-week2-bingo.png",
  "./show-week2-gala.jpg",
  "./show-week2-echoes-mongolia.jpg",
  "./show-week2-dj-port-side.jpg",
  "./event-happy-hour.jpg",
  "./event-mini-disco.jpg",
  "./event-the-blush.jpg",
  "./hotel-logo-gold.png",
  "./activity-radio.jpg",
  "./activity-morning-gym.jpg",
  "./activity-boccia.jpg",
  "./activity-darts.jpg",
  "./activity-sea-gym.jpg",
  "./activity-water-gym.jpg",
  "./activity-water-polo.jpg",
  "./manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES)));
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});


self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});
