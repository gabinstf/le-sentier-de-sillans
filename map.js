(function () {
  const container = document.getElementById('mapContainer');
  const img = document.getElementById('mapImage');

  let scale = 1;
  let minScale = 1;
  let tx = 0;
  let ty = 0;
  const MAX_SCALE = 5;

  // Coordonnées des étapes dans l'image originale (4167×4167 px)
  // Numérotation : 1 = point le plus au sud du centre-ville, vers la nature
  const POIS = [
    { x: 1788,  y: 1608  }, // 1 – Centre-ville sud
    { x: 1556,  y: 2435  }, // 2 – Centre-ville milieu
    { x: 2622, y: 3242  }, // 3 – Centre-ville nord
    { x: 3099,  y: 3445 }, // 4 – Oliveraie
    { x: 3305, y: 3270 }, // 5 – Forêt (début)
    { x: 3423, y: 3100 }, // 6 – Forêt (milieu)
    { x: 2569, y: 1900 }, // 7 – Près de la cascade
    { x: 2216, y: 1353 }, // 8 – Cascade
    { x: 1770, y: 1152 }, // 9 – Bresque (sud)
    { x: 1601, y: 1489 }, // 10 – Bresque (nord / ville)
  ];

  // Couche de POIs séparée de l'image → taille fixe quel que soit le zoom
  const poisLayer = document.createElement('div');
  poisLayer.className = 'pois-layer';
  container.appendChild(poisLayer);

  const poiEls = POIS.map((_, i) => {
    const el = document.createElement('div');
    el.className = 'poi';
    el.textContent = i + 1;
    poisLayer.appendChild(el);
    return el;
  });

  function clamp(v, lo, hi) {
    return v < lo ? lo : v > hi ? hi : v;
  }

  function clampBounds() {
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    const iw = img.naturalWidth * scale;
    const ih = img.naturalHeight * scale;
    tx = iw > cw ? clamp(tx, cw - iw, 0) : (cw - iw) / 2;
    ty = ih > ch ? clamp(ty, ch - ih, 0) : (ch - ih) / 2;
  }

  function updatePois() {
    POIS.forEach((p, i) => {
      poiEls[i].style.left = (p.x * scale + tx) + 'px';
      poiEls[i].style.top  = (p.y * scale + ty) + 'px';
    });
  }

  function render() {
    img.style.transform = `translate(${tx}px,${ty}px) scale(${scale})`;
    updatePois();
  }

  function initMap() {
    const ch = container.clientHeight;
    const cw = container.clientWidth;
    minScale = ch / img.naturalHeight;
    scale = minScale;
    tx = (cw - img.naturalWidth * scale) / 2;
    ty = 0;
    render();
  }

  if (img.complete && img.naturalWidth) {
    initMap();
  } else {
    img.addEventListener('load', initMap);
  }

  window.addEventListener('resize', () => {
    const newMin = container.clientHeight / img.naturalHeight;
    if (scale <= minScale) scale = newMin;
    minScale = newMin;
    clampBounds();
    render();
  });

  // ── Touch ──

  let prevDist = 0, prevMx = 0, prevMy = 0;
  let pinching = false, panning = false, prevPx = 0, prevPy = 0;

  function touchDist(a, b) {
    return Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
  }

  function touchMid(a, b) {
    const r = container.getBoundingClientRect();
    return {
      x: (a.clientX + b.clientX) / 2 - r.left,
      y: (a.clientY + b.clientY) / 2 - r.top,
    };
  }

  container.addEventListener('touchstart', e => {
    e.preventDefault();
    if (e.touches.length >= 2) {
      pinching = true; panning = false;
      prevDist = touchDist(e.touches[0], e.touches[1]);
      ({ x: prevMx, y: prevMy } = touchMid(e.touches[0], e.touches[1]));
    } else {
      panning = true; pinching = false;
      prevPx = e.touches[0].clientX;
      prevPy = e.touches[0].clientY;
    }
  }, { passive: false });

  container.addEventListener('touchmove', e => {
    e.preventDefault();
    if (e.touches.length >= 2) {
      const nd = touchDist(e.touches[0], e.touches[1]);
      const { x: mx, y: my } = touchMid(e.touches[0], e.touches[1]);
      const ns = clamp(scale * nd / prevDist, minScale, MAX_SCALE);
      const sr = ns / scale;
      tx = mx - (prevMx - tx) * sr;
      ty = my - (prevMy - ty) * sr;
      scale = ns;
      prevDist = nd; prevMx = mx; prevMy = my;
      clampBounds(); render();
    } else if (panning) {
      tx += e.touches[0].clientX - prevPx;
      ty += e.touches[0].clientY - prevPy;
      prevPx = e.touches[0].clientX;
      prevPy = e.touches[0].clientY;
      clampBounds(); render();
    }
  }, { passive: false });

  container.addEventListener('touchend', e => {
    if (e.touches.length < 2) pinching = false;
    if (e.touches.length === 1) {
      panning = true;
      prevPx = e.touches[0].clientX;
      prevPy = e.touches[0].clientY;
    }
    if (e.touches.length === 0) panning = false;
  }, { passive: false });

  // ── Mouse (desktop) ──

  let dragging = false, pdx = 0, pdy = 0;

  container.addEventListener('mousedown', e => {
    dragging = true; pdx = e.clientX; pdy = e.clientY;
    container.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    tx += e.clientX - pdx; ty += e.clientY - pdy;
    pdx = e.clientX; pdy = e.clientY;
    clampBounds(); render();
  });

  window.addEventListener('mouseup', () => {
    dragging = false;
    container.style.cursor = 'grab';
  });

  container.addEventListener('wheel', e => {
    e.preventDefault();
    const r = container.getBoundingClientRect();
    const mx = e.clientX - r.left, my = e.clientY - r.top;
    const ns = clamp(scale * (e.deltaY < 0 ? 1.1 : 0.9), minScale, MAX_SCALE);
    const sr = ns / scale;
    tx = mx - (mx - tx) * sr;
    ty = my - (my - ty) * sr;
    scale = ns;
    clampBounds(); render();
  }, { passive: false });
})();
