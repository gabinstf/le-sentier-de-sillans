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

    let downloading    = false;
    let autoCloseTimer = null;

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

        let progress = 0;
        const tick = 50;
        const step = (tick / 5000) * 100;

        const timer = setInterval(function () {
            progress = Math.min(progress + step, 100);
            dlProgressFill.style.width = progress + '%';

            if (progress >= 100) {
                clearInterval(timer);
                setTimeout(function () {
                    dlStateProgress.classList.add('dl-hidden');
                    dlStateDone.classList.remove('dl-hidden');
                    downloading = false;

                    // Fermer et masquer définitivement après 2,5 s
                    autoCloseTimer = setTimeout(function () {
                        dlWidget.classList.remove('prohib-open');
                        resetDlPanel();
                        dlWidget.classList.add('dl-hidden');
                    }, 2500);
                }, 300);
            }
        }, tick);
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
