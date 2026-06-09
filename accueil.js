(function () {
    var CACHE_NAME = 'sentier-sillans-v2';

    var ASSETS = [
        'index.html',
        'interet.html',
        'accueil.html',
        'style.css',
        'map.css',
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
        'sw.js',
        'fonts/Outfit-VariableFont_wght.ttf',
        'fonts/marky.otf',
        'fonts/marky.ttf',
        'images/logo.svg',
        'images/carte.png',
        'images/photo_cascade.png',
        'images/RUE%20SILLANS%20LA%20CASCADE.png',
        'images/Sillans_la_Cascade_%C3%A9glise.jpeg',
        'images/baignade%20interdite.png',
        'images/baignade%20riviere.jpg',
        'images/belvedere%20sillans%20la%20cascade.png',
        'images/cascade%20de%20sillans.png',
        'images/cigarette%20interdiction.png',
        'images/fond%20cascade%20accueil%20donn%C3%A9es.png',
        'images/gare%20sillans%20%C3%A9cole.webp',
        'images/lavoir%20sillans%20la%20cascade.webp',
        'images/logo%20dpt%20du%20var%20blanc.png',
        'images/mur%20de%20tuff.png',
        'images/olivier%20bastidon%20champ.jpeg',
        'images/sillans-la-cascade%20riviere.jpg'
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
        var total = ASSETS.length;
        var done  = 0;

        function setProgress(pct) {
            acRingFill.style.strokeDashoffset = CIRCUMFERENCE * (1 - pct / 100);
            if (pct < 100) acRingLabel.textContent = Math.floor(pct);
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
                    if (done >= total) { finishDownload(); return; }
                    var url = ASSETS[done];
                    cache.add(url)
                        .catch(function () {}) // ignorer les éventuelles erreurs réseau
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
        localStorage.setItem('dlDone', '1');
        localStorage.setItem('dlVersion', '2');
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
