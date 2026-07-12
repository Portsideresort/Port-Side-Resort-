const CACHE_NAME = "port-side-v18";
const FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./logo.png",
  "./stage-bg.png",
  "./face-of-africa.jpg",
  "./activity-radio.jpg",
  "./activity-morning-gym.jpg",
  "./activity-boccia.jpg",
  "./activity-darts.jpg",
  "./activity-sea-gym.jpg",
  "./activity-water-gym.jpg",
  "./activity-water-polo.svg",
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
