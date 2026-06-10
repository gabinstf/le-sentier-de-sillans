(function () {
    const dlWidget        = document.getElementById('dlWidget');
    const dlTriggerBtn    = document.getElementById('dlTriggerBtn');
    const dlStateInit     = document.getElementById('dlStateInit');
    const dlStateProgress = document.getElementById('dlStateProgress');
    const dlStateDone     = document.getElementById('dlStateDone');
    const dlProgressFill  = document.getElementById('dlProgressFill');
    const dlBtnOk         = document.getElementById('dlBtnOk');
    const dlBtnNo         = document.getElementById('dlBtnNo');
    const prohibBtn1      = document.getElementById('prohibBtn1');
    const prohibBtn2      = document.getElementById('prohibBtn2');

    const CACHE_NAME = 'sentier-sillans-v8';

    const ASSETS = [
        'index.html', 'interet.html', 'accueil.html',
        'style.css', 'map.css', 'interet.css', 'accueil.css',
        'transitions.js', 'weather.js', 'map.js', 'interet.js',
        'accueil.js', 'download.js', 'splash.js', 'data.js', 'sw.js',
        'fonts/Outfit-VariableFont_wght.ttf', 'fonts/marky.otf', 'fonts/marky.ttf',
        'stats.html', 'stats.css', 'stats.js',
        'images/logo.svg',
        'images/carte.png',
        'images/accueil-fond.webp',
        'images/logo-var.webp',
        'images/baignade-interdite.webp',
        'images/cigarette-interdiction.webp',
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
        'video/belvedere.mp4'
    ];

    let downloading    = false;
    let autoCloseTimer = null;

    // Masquer définitivement si les données sont déjà téléchargées
    if (localStorage.getItem('dlDone')) {
        dlWidget.classList.add('dl-hidden');
    }

    // ── Tap handler touch + mouse ─────────────────────────────────────────
    function addTapHandler(el, fn) {
        let tx, ty;
        el.addEventListener('touchstart', function (e) {
            e.stopPropagation();
            e.preventDefault();
            tx = e.touches[0].clientX;
            ty = e.touches[0].clientY;
        }, { passive: false });
        el.addEventListener('touchend', function (e) {
            e.stopPropagation();
            e.preventDefault();
            const dx = Math.abs(e.changedTouches[0].clientX - tx);
            const dy = Math.abs(e.changedTouches[0].clientY - ty);
            if (dx < 10 && dy < 10) fn(e);
        }, { passive: false });
        el.addEventListener('mousedown', function (e) { e.stopPropagation(); });
        el.addEventListener('click', fn);
    }

    // ── Fermer tout ───────────────────────────────────────────────────────
    function closeAll() {
        dlWidget.classList.remove('prohib-open');
        prohibBtn1.classList.remove('prohib-open');
        prohibBtn2.classList.remove('prohib-open');
    }

    // ── Réinitialiser le widget téléchargement ────────────────────────────
    function resetDlPanel() {
        if (autoCloseTimer) { clearTimeout(autoCloseTimer); autoCloseTimer = null; }
        dlStateInit.classList.remove('dl-hidden');
        dlStateProgress.classList.add('dl-hidden');
        dlStateDone.classList.add('dl-hidden');
        dlProgressFill.style.width = '0%';
        downloading = false;
    }

    // ── Bouton icône téléchargement ───────────────────────────────────────
    addTapHandler(dlTriggerBtn, function () {
        if (downloading) return;
        const isOpen = dlWidget.classList.contains('prohib-open');
        closeAll();
        if (!isOpen) {
            resetDlPanel();
            dlWidget.classList.add('prohib-open');
        }
    });

    // ── D'ACCORD → lancer le téléchargement ──────────────────────────────
    addTapHandler(dlBtnOk, function () {
        if (downloading) return;
        downloading = true;

        dlStateInit.classList.add('dl-hidden');
        dlStateProgress.classList.remove('dl-hidden');

        const total = ASSETS.length;
        let done = 0;

        const swReady = ('serviceWorker' in navigator)
            ? navigator.serviceWorker.register('sw.js').catch(function () { return null; })
            : Promise.resolve(null);

        swReady.then(function () {
            if (!('caches' in window)) { finishDownload(); return; }

            caches.open(CACHE_NAME).then(function (cache) {
                function fetchNext() {
                    if (done >= total) { finishDownload(); return; }
                    cache.add(ASSETS[done])
                        .catch(function () {})
                        .then(function () {
                            done++;
                            dlProgressFill.style.width = (done / total * 100) + '%';
                            fetchNext();
                        });
                }
                fetchNext();
            }).catch(function () { finishDownload(); });
        });

        function finishDownload() {
            localStorage.setItem('dlDone', '1');
            localStorage.setItem('dlVersion', '8');

            setTimeout(function () {
                dlStateProgress.classList.add('dl-hidden');
                dlStateDone.classList.remove('dl-hidden');
                downloading = false;

                autoCloseTimer = setTimeout(function () {
                    dlWidget.classList.remove('prohib-open');
                    resetDlPanel();
                    dlWidget.classList.add('dl-hidden');
                }, 2500);
            }, 300);
        }
    });

    // ── NON MERCI → fermer le widget ─────────────────────────────────────
    addTapHandler(dlBtnNo, function () {
        dlWidget.classList.remove('prohib-open');
        resetDlPanel();
    });

    // ── Interdiction 1 ────────────────────────────────────────────────────
    addTapHandler(prohibBtn1, function () {
        const isOpen = prohibBtn1.classList.contains('prohib-open');
        closeAll();
        if (!isOpen) prohibBtn1.classList.add('prohib-open');
    });

    // ── Interdiction 2 ────────────────────────────────────────────────────
    addTapHandler(prohibBtn2, function () {
        const isOpen = prohibBtn2.classList.contains('prohib-open');
        closeAll();
        if (!isOpen) prohibBtn2.classList.add('prohib-open');
    });

    // ── Fermer au tap extérieur ───────────────────────────────────────────
    document.addEventListener('click', function (e) {
        if (!dlWidget.contains(e.target) &&
            !prohibBtn1.contains(e.target) &&
            !prohibBtn2.contains(e.target)) {
            closeAll();
        }
    });
})();
