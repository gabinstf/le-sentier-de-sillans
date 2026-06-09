(function () {
    // Stats cumulatives par nombre de POIs validés (index 0 = aucun, index 10 = tous)
    // dist en m, mins en min, pas, deniv en m, veg/anim en nb espèces, cal en kcal, hist en années
    var STATS = [
        { dist: 0,    mins: 0,  pas: 0,    deniv: 0,   veg: 0,  anim: 0,  cal: 0,   hist: 0    },
        { dist: 0,    mins: 3,  pas: 0,    deniv: 0,   veg: 2,  anim: 0,  cal: 0,   hist: 600  },
        { dist: 200,  mins: 8,  pas: 280,  deniv: 8,   veg: 5,  anim: 2,  cal: 15,  hist: 800  },
        { dist: 800,  mins: 13, pas: 1120, deniv: 30,  veg: 9,  anim: 4,  cal: 60,  hist: 800  },
        { dist: 1100, mins: 23, pas: 1540, deniv: 50,  veg: 12, anim: 6,  cal: 85,  hist: 800  },
        { dist: 1300, mins: 28, pas: 1820, deniv: 70,  veg: 14, anim: 7,  cal: 100, hist: 800  },
        { dist: 1500, mins: 38, pas: 2100, deniv: 90,  veg: 16, anim: 9,  cal: 115, hist: 800  },
        { dist: 2200, mins: 43, pas: 3080, deniv: 108, veg: 19, anim: 11, cal: 170, hist: 800  },
        { dist: 2600, mins: 48, pas: 3640, deniv: 125, veg: 21, anim: 12, cal: 200, hist: 950  },
        { dist: 2900, mins: 53, pas: 4060, deniv: 136, veg: 22, anim: 12, cal: 225, hist: 1050 },
        { dist: 3300, mins: 58, pas: 4620, deniv: 145, veg: 23, anim: 12, cal: 285, hist: 1650 },
    ];

    // ── Lecture des POIs validés ──────────────────────────────────────────────
    var validated = [];
    try { validated = JSON.parse(localStorage.getItem('validatedPois') || '[]'); } catch (e) {}
    var n = Math.min(validated.length, 10);
    var s = STATS[n];

    // ── Sous-titre ────────────────────────────────────────────────────────────
    var sub = document.getElementById('stSubtitle');
    if (n === 0) {
        sub.textContent = 'Lance-toi sur le sentier pour voir tes stats évoluer';
    } else if (n === 10) {
        sub.textContent = 'Parcours complet — félicitations !';
    } else {
        var km = (s.dist / 1000).toFixed(1).replace('.', ',');
        sub.textContent = n + ' / 10 étapes · ' + km + ' km parcourus';
    }

    // ── Dots de progression ───────────────────────────────────────────────────
    var container = document.getElementById('stProgDots');
    for (var i = 1; i <= 10; i++) {
        var dot = document.createElement('div');
        dot.className = 'st-prog-dot' + (i <= n ? ' done' : '');
        dot.textContent = i;
        container.appendChild(dot);
    }
    document.getElementById('statEtapesLabel').textContent = n + ' / 10 étapes validées';

    // ── Formatage milliers avec espace fine ───────────────────────────────────
    function fmt(v) {
        if (v === 0) return '0';
        return String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    // ── Animation compteur (easeOutCubic) ─────────────────────────────────────
    function animCount(id, target, duration, delay, formatFn) {
        var el = document.getElementById(id);
        if (!el) return;
        if (target === 0) { el.textContent = '0'; return; }

        setTimeout(function () {
            var t0 = performance.now();
            function step(now) {
                var t = Math.min((now - t0) / duration, 1);
                var eased = 1 - Math.pow(1 - t, 3);
                var val = Math.round(eased * target);
                el.textContent = formatFn ? formatFn(val) : String(val);
                if (t < 1) {
                    requestAnimationFrame(step);
                } else {
                    el.textContent = formatFn ? formatFn(target) : String(target);
                }
            }
            requestAnimationFrame(step);
        }, delay);
    }

    // Lancement des compteurs avec décalages progressifs
    animCount('statDist',  s.dist,  1400, 80,  fmt);
    animCount('statMins',  s.mins,  1100, 160, null);
    animCount('statPas',   s.pas,   1400, 240, fmt);
    animCount('statVeg',   s.veg,   1000, 320, null);
    animCount('statAnim',  s.anim,  1000, 380, null);
    animCount('statDeniv', s.deniv, 1200, 440, null);
    animCount('statCal',   s.cal,   1200, 500, fmt);
    animCount('statHist',  s.hist,  1700, 580, fmt);
})();
