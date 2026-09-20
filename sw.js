const CACHE = 'yanmiao-shell-v8';
const SHELL = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './enhance.js',
  './vendor/xlsx.full.min.js',
  './vendor/mammoth.browser.min.js',
  './app-icon.svg',
  './app-icon-192.png',
  './app-icon-512.png',
  './app-icon-maskable-512.png',
  './apple-touch-icon.png',
  './manifest.webmanifest'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || request.method !== 'GET' || url.pathname.startsWith('./api/')) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) caches.open(CACHE).then(cache => cache.put('./index.html', response.clone()));
          return response;
        })
        .catch(() => caches.match('./index.html').then(response => response || caches.match('./')))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      const network = fetch(request)
        .then(response => {
          if (response.ok) caches.open(CACHE).then(cache => cache.put(request, response.clone()));
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});







