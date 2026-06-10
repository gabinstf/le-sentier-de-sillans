(function () {
    var CACHE_NAME = APP_CACHE; // défini dans version.js

    var ASSETS = [
        'index.html',
        'interet.html',
        'accueil.html',
        'style.css',
        'interet.css',
        'accueil.css',
        'transitions.js',
        'weather.js',
        'map.js',
        'interet.js',
        'accueil.js',
        'download.js',
        'splash.js',
        'data.js',
        'version.js',
        'stats.html',
        'stats.css',
        'stats.js',
        'info.html',
        'info-aide.html',
        'info-charte.html',
        'info-apropos.html',
        'info.css',
        'info-pages.css',
        'fonts/Outfit-VariableFont_wght.ttf',
        'fonts/marky.otf',
        'fonts/marky.ttf',
        'images/logo.svg',
        'images/carte.webp',
        'images/accueil-fond.webp',
        'images/logo-var.webp',
        'images/eglise.webp',
        'images/bastidon.webp',
        'images/tuff.webp',
        'images/cascade.webp',
        'images/cascade-chute.webp',
        'images/belvedere.webp',
        'images/riviere-baignade.webp',
        'images/riviere.webp',
        'images/gare.webp',
        'images/lavoir.webp',
        'images/rue-sillans.webp',
        'images/oliveraie.webp',
        'video/bastidon-oliveraie.mp4',
        'video/eglise.mp4',
        'video/tuf.mp4',
        'video/panorama.mp4',
        'video/apropos.mp4',
        'video/belvedere.mp4',
        'video/bresque.mp4',
        'video/mairie.mp4'
    ];

    var acBtnOk     = document.getElementById('acBtnOk');
    var acBtnNo     = document.getElementById('acBtnNo');
    var acInitial   = document.getElementById('acInitial');
    var acDl        = document.getElementById('acDl');
    var acRingFill  = document.getElementById('acRingFill');
    var acRingLabel = document.getElementById('acRingLabel');
    var acDone      = document.getElementById('acDone');
    var acRedirect  = document.getElementById('acRedirect');
    var acDots      = document.getElementById('acDots');

    var CIRCUMFERENCE = 2 * Math.PI * 52; // ≈ 326.73

    // ── NON MERCI → aller à la carte, revenir sur accueil à la prochaine session ──
    acBtnNo.addEventListener('click', function () {
        sessionStorage.setItem('acPassed', '1');
        window.goTo('index.html');
    });

    // ── D'ACCORD → télécharger puis aller à la carte ──────────────────────────
    acBtnOk.addEventListener('click', function () {
        acInitial.style.display = 'none';
        acDl.classList.add('active');
        startDownload();
    });

    function startDownload() {
        var total  = ASSETS.length;
        var done   = 0;
        var failed = 0;

        function setProgress(pct) {
            acRingFill.style.strokeDashoffset = CIRCUMFERENCE * (1 - pct / 100);
            if (pct < 100) acRingLabel.textContent = Math.floor(pct);
        }

        // Au moins un fichier manque : ne PAS marquer dlDone,
        // re-proposer le téléchargement après un message d'erreur.
        function retryDownload() {
            acRingLabel.textContent = '!';
            acDone.textContent = 'Téléchargement incomplet — vérifiez votre connexion.';
            acDone.classList.add('visible');
            setTimeout(function () {
                acDone.classList.remove('visible');
                acDone.textContent = 'Téléchargement terminé.';
                acRingLabel.textContent = '0';
                setProgress(0);
                acDl.classList.remove('active');
                acInitial.style.display = '';
            }, 2800);
        }

        var swReady = ('serviceWorker' in navigator)
            ? navigator.serviceWorker.register('sw.js').catch(function () { return null; })
            : Promise.resolve(null);

        swReady.then(function () {
            if (!('caches' in window)) {
                // Cache API indisponible (fichier local, old browser) → finish direct
                finishDownload();
                return;
            }

            caches.open(CACHE_NAME).then(function (cache) {
                function fetchNext() {
                    if (done >= total) {
                        if (failed > 0) { retryDownload(); } else { finishDownload(); }
                        return;
                    }
                    var url = ASSETS[done];
                    cache.add(url)
                        .catch(function () { failed++; })
                        .then(function () {
                            done++;
                            setProgress((done / total) * 100);
                            fetchNext();
                        });
                }
                fetchNext();
            }).catch(function () { finishDownload(); });
        });
    }

    function finishDownload() {
        // Purger les anciennes versions maintenant que la nouvelle est complète
        if ('caches' in window) {
            caches.keys().then(function (keys) {
                keys.forEach(function (k) { if (k !== CACHE_NAME) caches.delete(k); });
            });
        }
        localStorage.setItem('dlDone', '1');
        localStorage.setItem('dlVersion', APP_VERSION);
        sessionStorage.setItem('acPassed', '1');

        acRingFill.style.strokeDashoffset = 0;
        acRingLabel.textContent = '100';

        setTimeout(function () {
            acRingLabel.innerHTML =
                '<svg viewBox="0 0 44 44" width="56" height="56" xmlns="http://www.w3.org/2000/svg">' +
                '<polyline points="7,23 18,34 37,11" fill="none" stroke="white"' +
                ' stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>' +
                '</svg>';

            setTimeout(function () {
                acDone.classList.add('visible');
                acRedirect.classList.add('visible');

                var dotCount = 1;
                var dotsTimer = setInterval(function () {
                    dotCount = (dotCount % 3) + 1;
                    acDots.textContent = '.'.repeat(dotCount);
                }, 500);

                setTimeout(function () {
                    clearInterval(dotsTimer);
                    window.goTo('index.html');
                }, 3000);
            }, 350);
        }, 600);
    }
})();
