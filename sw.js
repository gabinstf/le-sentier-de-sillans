importScripts('version.js');

var CACHE = APP_CACHE;

self.addEventListener('install', function () {
    self.skipWaiting();
});

self.addEventListener('activate', function (e) {
    // La purge des anciens caches se fait dans finishDownload()
    // (accueil.js / download.js) une fois la nouvelle version téléchargée :
    // supprimer ici détruirait les données hors-ligne avant leur remplacement.
    e.waitUntil(self.clients.claim());
});

// Reconstruit une réponse 206 depuis le cache : Safari/iOS exige du
// Partial Content pour lire les vidéos, sinon écran noir hors-ligne.
function rangeResponse(request, cached) {
    return cached.arrayBuffer().then(function (buffer) {
        var m = /bytes=(\d+)-(\d+)?/.exec(request.headers.get('range'));
        if (!m) return new Response(buffer, { status: 200, headers: cached.headers });
        var start = Number(m[1]);
        var end = m[2] ? Number(m[2]) : buffer.byteLength - 1;
        return new Response(buffer.slice(start, end + 1), {
            status: 206,
            statusText: 'Partial Content',
            headers: {
                'Content-Type': cached.headers.get('Content-Type') || 'video/mp4',
                'Content-Range': 'bytes ' + start + '-' + end + '/' + buffer.byteLength,
                'Content-Length': String(end - start + 1),
                'Accept-Ranges': 'bytes'
            }
        });
    });
}

var MEDIA_RE = /\/(images|video|fonts)\//;

self.addEventListener('fetch', function (e) {
    var req = e.request;
    if (req.method !== 'GET') return;

    var url = new URL(req.url);
    // Ne pas intercepter le cross-origin (ex : API météo Open-Meteo)
    if (url.origin !== self.location.origin) return;

    // Médias (lourds, stables) : cache d'abord, réseau en secours
    if (MEDIA_RE.test(url.pathname)) {
        e.respondWith(
            caches.match(req, { ignoreSearch: true }).then(function (cached) {
                if (cached) {
                    if (req.headers.get('range')) return rangeResponse(req, cached);
                    return cached;
                }
                return fetch(req);
            }).catch(function () {
                return new Response('', { status: 504, statusText: 'Offline' });
            })
        );
        return;
    }

    // Code (HTML / CSS / JS, léger) : réseau d'abord pour que les mises à
    // jour et le contrôle de version soient détectés en ligne, cache en
    // secours hors-ligne. Les réponses fraîches réalimentent le cache.
    e.respondWith(
        fetch(req).then(function (resp) {
            if (resp.ok) {
                var copy = resp.clone();
                caches.open(CACHE).then(function (c) { c.put(req, copy); });
            }
            return resp;
        }).catch(function () {
            // ignoreSearch : interet.html?id=1 matche le cache entry 'interet.html'
            return caches.match(req, { ignoreSearch: true }).then(function (cached) {
                if (cached) return cached;
                // Hors-ligne et absent du cache : replier sur la carte
                if (req.mode === 'navigate') {
                    return caches.match('index.html').then(function (fallback) {
                        return fallback || new Response('', { status: 504 });
                    });
                }
                return new Response('', { status: 504, statusText: 'Offline' });
            });
        })
    );
});
