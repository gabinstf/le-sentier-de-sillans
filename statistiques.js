(function () {
  // Lit les étapes validées depuis le localStorage
  // Format attendu : tableau d'IDs, ex. [1, 2, 3]
  // TODO: alimenter 'visitedPoints' quand le suivi des étapes sera implémenté
  var visited = JSON.parse(localStorage.getItem('visitedPoints') || '[]');

  var maxId = visited.length ? Math.max.apply(null, visited) : 0;

  // Si aucune étape validée → tout à 0
  var stats = maxId > 0
    ? TRAIL_DATA[maxId - 1]
    : { distanceCumul: 0, especes: 0, fleurs: 0 };

  function animateCounter(el, target, duration) {
    if (target === 0) { el.textContent = '0'; return; }
    var start = performance.now();
    function step(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  animateCounter(document.getElementById('stat-distance'), stats.distanceCumul, 1400);
  animateCounter(document.getElementById('stat-especes'),  stats.especes,        1100);
  animateCounter(document.getElementById('stat-fleurs'),   stats.fleurs,         1200);
})();
