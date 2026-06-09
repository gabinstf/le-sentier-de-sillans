var CACHE = 'sentier-sillans-v2';

self.addEventListener('install', function () {
    self.skipWaiting();
});

self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (keys) {
            return Promise.all(
                keys.filter(function (k) { return k !== CACHE; })
                    .map(function (k) { return caches.delete(k); })
            );
        }).then(function () {
            return self.clients.claim();
        })
    );
});

self.addEventListener('fetch', function (e) {
    // ignoreSearch : interet.html?id=1 matche le cache entry 'interet.html'
    e.respondWith(
        caches.match(e.request, { ignoreSearch: true }).then(function (cached) {
            return cached || fetch(e.request);
        })
    );
});
