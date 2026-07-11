const CACHE_NAME = "port-side-v10";
const FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./logo.png",
  "./stage-bg.png",
  "./face-of-africa.jpg",
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
