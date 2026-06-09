(function () {
    const acBtnOk     = document.getElementById('acBtnOk');
    const acBtnNo     = document.getElementById('acBtnNo');
    const acInitial   = document.getElementById('acInitial');
    const acDl        = document.getElementById('acDl');
    const acRingFill  = document.getElementById('acRingFill');
    const acRingLabel = document.getElementById('acRingLabel');
    const acDone      = document.getElementById('acDone');
    const acRedirect  = document.getElementById('acRedirect');
    const acDots      = document.getElementById('acDots');

    const CIRCUMFERENCE = 2 * Math.PI * 52; // ≈ 326.73

    // ── NON MERCI → aller directement à la carte ──────────────────────────
    acBtnNo.addEventListener('click', function () {
        window.location.href = 'index.html';
    });

    // ── D'ACCORD → lancer le téléchargement ───────────────────────────────
    acBtnOk.addEventListener('click', function () {
        acInitial.style.display = 'none';
        acDl.classList.add('active');
        startDownload();
    });

    function startDownload() {
        let progress = 0;
        const duration = 5000; // 5 secondes
        const tick     = 50;   // ms par intervalle
        const step     = (tick / duration) * 100;

        const timer = setInterval(function () {
            progress = Math.min(progress + step, 100);

            // Mise à jour du cercle
            acRingFill.style.strokeDashoffset = CIRCUMFERENCE * (1 - progress / 100);

            if (progress < 100) {
                acRingLabel.textContent = Math.floor(progress);
            } else {
                clearInterval(timer);

                // Afficher "100" brièvement
                acRingLabel.textContent = '100';

                setTimeout(function () {
                    // Remplacer le nombre par la coche
                    acRingLabel.innerHTML =
                        '<svg viewBox="0 0 44 44" width="56" height="56" xmlns="http://www.w3.org/2000/svg">' +
                        '<polyline points="7,23 18,34 37,11" fill="none" stroke="white"' +
                        ' stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>' +
                        '</svg>';

                    // Afficher les textes de fin
                    setTimeout(function () {
                        acDone.classList.add('visible');
                        acRedirect.classList.add('visible');

                        // Animation des points : . → .. → ... → . en boucle
                        let dotCount = 1;
                        const dotsTimer = setInterval(function () {
                            dotCount = (dotCount % 3) + 1;
                            acDots.textContent = '.'.repeat(dotCount);
                        }, 500);

                        // Redirection vers la carte après 3 secondes
                        setTimeout(function () {
                            clearInterval(dotsTimer);
                            window.location.href = 'index.html';
                        }, 3000);
                    }, 350);
                }, 600);
            }
        }, tick);
    }
})();
