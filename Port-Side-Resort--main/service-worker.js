const CACHE_NAME = "port-side-v12";
const FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./logo.png",
  "./stage-bg.png",
  "./face-of-africa.jpg",
  "./activity-radio.jpg",
  "./activity-morning-gym.svg",
  "./activity-boccia.svg",
  "./activity-darts.svg",
  "./activity-sea-gym.svg",
  "./activity-water-gym.svg",
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
