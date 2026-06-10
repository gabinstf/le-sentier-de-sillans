(function () {
  const container = document.getElementById('mapContainer');
  const img = document.getElementById('mapImage');

  let scale = 1, minScale = 1, tx = 0, ty = 0, maxScale = 1;
  let targetScale = 1, targetTx = 0, targetTy = 0, rafId = null;

  const MAP_COORDS = [
    { x: 1788, y: 1608  }, // 1 – Centre-ville sud
    { x: 1554, y: 2418  }, // 2 – Centre-ville milieu
    { x: 2622, y: 3242  }, // 3 – Centre-ville nord
    { x: 3095, y: 3458  }, // 4 – Oliveraie
    { x: 3225, y: 3255  }, // 5 – Forêt (début)
    { x: 3505, y: 2825  }, // 6 – Forêt (milieu)
    { x: 2575, y: 1910  }, // 7 – Près de la cascade
    { x: 2216, y: 1353  }, // 8 – Cascade
    { x: 1770, y: 1152  }, // 9 – Bresque (sud)
    { x: 1601, y: 1489  }, // 10 – Bresque (nord / ville)
  ];

  const BANNER_H = 250;

  const poisLayer = document.createElement('div');
  poisLayer.className = 'pois-layer';
  container.appendChild(poisLayer);

  // ── Bannière ──────────────────────────────────────────────────────────────

  let currentBannerPoiId = null;
  let bannerEverShown = false;

  function getValidated() {
    try { return JSON.parse(localStorage.getItem('validatedPois') || '[]'); }
    catch (e) { return []; }
  }

  function fillBannerContent(id) {
    const poi = SILLANS_POIS[id - 1];
    document.getElementById('poiBannerTitle').textContent = id + '. ' + poi.title;
    const tmp = document.createElement('div');
    tmp.innerHTML = poi.description[0];
    document.getElementById('poiBannerDesc').textContent = tmp.textContent;
    const thumb = document.getElementById('poiBannerThumb');
    // Première vraie image du POI (un <img src="….mp4"> ne s'affiche pas)
    const img0 = poi.images.find(function (im) {
      return im.src && im.type !== 'video';
    }) || poi.images[0];
    if (img0.src && img0.type !== 'video') {
      thumb.innerHTML = '<img src="' + img0.src + '" alt="' + img0.alt + '">';
      thumb.style.background = '';
    } else {
      thumb.innerHTML = '';
      thumb.style.background = img0.grad;
    }
    document.getElementById('btnPoiSavoirPlus').onclick = function () {
      localStorage.setItem('lastPoiId', id);
      window.goTo('interet.html?id=' + id);
    };
    const validated = getValidated();
    const btnVal = document.getElementById('btnPoiValider');
    const isValidated = validated.includes(id);
    btnVal.textContent = isValidated ? 'Étape validée ✓' : "VALIDER L'ÉTAPE";
    btnVal.classList.toggle('validated', isValidated);
    btnVal.onclick = isValidated ? function () {
      showConfirmModal(id);
    } : function () {
      const v = getValidated();
      if (!v.includes(id)) { v.push(id); localStorage.setItem('validatedPois', JSON.stringify(v)); }
      fillBannerContent(id);
      updatePoiStates();
      showNotif(id);
    };
  }

  function showConfirmModal(id) {
    const overlay = document.getElementById('confirmOverlay');
    overlay.classList.add('visible');

    document.getElementById('confirmOk').onclick = function () {
      let v = getValidated();
      v = v.filter(function (pid) { return pid < id; });
      localStorage.setItem('validatedPois', JSON.stringify(v));
      overlay.classList.remove('visible');
      fillBannerContent(id);
      updatePoiStates();
    };

    document.getElementById('confirmCancel').onclick = function () {
      overlay.classList.remove('visible');
    };
  }

  function showNotif(id) {
    const notif = document.getElementById('poiNotif');
    notif.textContent = 'Étape validée ' + id + '/10 ✓';
    notif.classList.add('visible');
    clearTimeout(notif._t);
    notif._t = setTimeout(function () { notif.classList.remove('visible'); }, 2800);
  }

  function showBanner(id) {
    const banner = document.getElementById('poiBanner');
    const inner  = document.getElementById('poiBannerInner');
    fillBannerContent(id);
    if (!bannerEverShown) {
      banner.classList.add('visible');
      bannerEverShown = true;
    } else if (id !== currentBannerPoiId) {
      const dir = id > currentBannerPoiId ? 'from-right' : 'from-left';
      inner.classList.remove('from-right', 'from-left');
      void inner.offsetWidth;
      inner.classList.add(dir);
      inner.addEventListener('animationend', function () {
        inner.classList.remove('from-right', 'from-left');
      }, { once: true });
    }
    currentBannerPoiId = id;
    localStorage.setItem('lastPoiId', id);
  }

  function hideBanner() {
    document.getElementById('poiBanner').classList.remove('visible');
    currentBannerPoiId = null;
    bannerEverShown = false;
    setActivePoi(null);
  }

  // ── Utilitaires ───────────────────────────────────────────────────────────

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

  function applyClamp(s, ttx, tty) {
    const cw = container.clientWidth, ch = container.clientHeight;
    const iw = img.naturalWidth * s, ih = img.naturalHeight * s;
    return {
      tx: iw > cw ? clamp(ttx, cw - iw, 0) : (cw - iw) / 2,
      ty: ih > ch ? clamp(tty, ch - ih, 0) : (ch - ih) / 2,
    };
  }

  function clampBounds() {
    const c = applyClamp(scale, tx, ty); tx = c.tx; ty = c.ty;
  }

  function clampTargetBounds() {
    const c = applyClamp(targetScale, targetTx, targetTy);
    targetTx = c.tx; targetTy = c.ty;
  }

  function render() {
    const t = 'translate(' + tx + 'px,' + ty + 'px) scale(' + scale + ')';
    img.style.transform = t;
    poisLayer.style.transform = t;
    const cs = 1 / scale;
    poiEls.forEach(function (el) {
      el.style.transform = 'translate(-50%, -50%) scale(' + cs + ')';
    });
  }

  // ── Boucle rAF (lerp vers les cibles) ────────────────────────────────────

  function tick() {
    const L = 0.15;
    const ds  = targetScale - scale;
    const dtx = targetTx - tx;
    const dty = targetTy - ty;
    const done = Math.abs(ds) < 0.0004 && Math.abs(dtx) < 0.25 && Math.abs(dty) < 0.25;
    if (done) {
      scale = targetScale; tx = targetTx; ty = targetTy;
      rafId = null;
    } else {
      scale += ds * L;
      tx    += dtx * L;
      ty    += dty * L;
      rafId = requestAnimationFrame(tick);
    }
    clampBounds();
    render();
  }

  function kickAnim() {
    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  // ── Centrage sur un POI ───────────────────────────────────────────────────

  function centerOnPoi(index) {
    const c = MAP_COORDS[index];
    const cw = container.clientWidth, ch = container.clientHeight;
    targetScale = clamp(minScale * 2.5, minScale, maxScale);
    targetTx = cw / 2 - c.x * targetScale;
    targetTy = (ch - BANNER_H) / 2 - c.y * targetScale;
    clampTargetBounds();
    kickAnim();
  }

  // ── Toggle actif ──────────────────────────────────────────────────────────

  function setActivePoi(id) {
    poiEls.forEach(function (el, i) { el.classList.toggle('active', i + 1 === id); });
  }

  function updatePoiStates() {
    const validated = getValidated();
    let nextId = null;
    for (var n = 1; n <= MAP_COORDS.length; n++) {
      if (!validated.includes(n)) { nextId = n; break; }
    }
    poiEls.forEach(function (el, i) {
      const id = i + 1;
      el.classList.toggle('validated', validated.includes(id));
      el.classList.toggle('next', id === nextId);
    });
  }

  // ── Création des marqueurs ────────────────────────────────────────────────

  let touchHandled = false;

  const poiEls = MAP_COORDS.map(function (c, i) {
    const el = document.createElement('div');
    el.className = 'poi';
    el.innerHTML = '<span class="poi-label">' + (i + 1) + '</span>';
    el.style.left = c.x + 'px';
    el.style.top  = c.y + 'px';

    let tapX, tapY;
    el.addEventListener('touchstart', function (e) {
      e.stopPropagation();
      tapX = e.touches[0].clientX;
      tapY = e.touches[0].clientY;
    }, { passive: true });

    el.addEventListener('touchend', function (e) {
      e.stopPropagation();
      const dx = Math.abs(e.changedTouches[0].clientX - tapX);
      const dy = Math.abs(e.changedTouches[0].clientY - tapY);
      if (dx < 10 && dy < 10) {
        touchHandled = true;
        setTimeout(function () { touchHandled = false; }, 400);
        setActivePoi(i + 1);
        centerOnPoi(i);
        showBanner(i + 1);
      }
    }, { passive: true });

    el.addEventListener('click', function () {
      if (touchHandled) return;
      setActivePoi(i + 1);
      centerOnPoi(i);
      showBanner(i + 1);
    });

    poisLayer.appendChild(el);
    return el;
  });

  const savedPoiId = parseInt(localStorage.getItem('lastPoiId')) || 1;
  setActivePoi(savedPoiId);
  updatePoiStates();

  // ── Swipe entre POIs (bandeau + carte) ───────────────────────────────────

  function navigatePoi(direction) {
    if (currentBannerPoiId === null) return;
    const newId = currentBannerPoiId + direction;
    if (newId < 1 || newId > MAP_COORDS.length) return;
    setActivePoi(newId);
    centerOnPoi(newId - 1);
    showBanner(newId);
  }

  (function () {
    var banner = document.getElementById('poiBanner');
    var sx = 0, sy = 0;
    banner.addEventListener('touchstart', function (e) {
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
    }, { passive: true });
    banner.addEventListener('touchend', function (e) {
      if (currentBannerPoiId === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      var dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) < 60 || Math.abs(dy) > Math.abs(dx) * 0.6) return;
      navigatePoi(dx < 0 ? 1 : -1);
    }, { passive: true });
  }());

  // ── Init carte ────────────────────────────────────────────────────────────

  function initMap() {
    const ch = container.clientHeight;
    const cw = container.clientWidth;
    minScale = ch / img.naturalHeight;
    maxScale = minScale * 3;
    scale = minScale;
    tx = (cw - img.naturalWidth * scale) / 2;
    ty = 0;
    targetScale = scale; targetTx = tx; targetTy = ty;
    render();
  }

  if (img.complete && img.naturalWidth) {
    initMap();
  } else {
    img.addEventListener('load', initMap);
  }

  window.addEventListener('resize', function () {
    if (!img.naturalHeight) return; // carte pas encore chargée
    const newMin = container.clientHeight / img.naturalHeight;
    if (scale <= minScale) { scale = newMin; targetScale = newMin; }
    minScale = newMin;
    maxScale = newMin * 3;
    clampBounds();
    targetTx = tx; targetTy = ty;
    render();
  });

  // ── Touch ─────────────────────────────────────────────────────────────────

  let prevDist = 0, prevMx = 0, prevMy = 0;
  let pinching = false, panning = false, prevPx = 0, prevPy = 0;
  let tapStartX = 0, tapStartY = 0;

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

  container.addEventListener('touchstart', function (e) {
    e.preventDefault();
    if (e.touches.length >= 2) {
      pinching = true; panning = false;
      prevDist = touchDist(e.touches[0], e.touches[1]);
      var mid = touchMid(e.touches[0], e.touches[1]);
      prevMx = mid.x; prevMy = mid.y;
    } else {
      panning = true; pinching = false;
      prevPx = e.touches[0].clientX;
      prevPy = e.touches[0].clientY;
      tapStartX = e.touches[0].clientX;
      tapStartY = e.touches[0].clientY;
    }
  }, { passive: false });

  container.addEventListener('touchmove', function (e) {
    e.preventDefault();
    if (e.touches.length >= 2) {
      const nd = touchDist(e.touches[0], e.touches[1]);
      var mid = touchMid(e.touches[0], e.touches[1]);
      var mx = mid.x, my = mid.y;
      const ns = clamp(scale * nd / prevDist, minScale, maxScale);
      const sr = ns / scale;
      tx = mx - (prevMx - tx) * sr;
      ty = my - (prevMy - ty) * sr;
      scale = ns;
      prevDist = nd; prevMx = mx; prevMy = my;
    } else if (panning) {
      tx += e.touches[0].clientX - prevPx;
      ty += e.touches[0].clientY - prevPy;
      prevPx = e.touches[0].clientX;
      prevPy = e.touches[0].clientY;
    }
    targetScale = scale; targetTx = tx; targetTy = ty;
    clampBounds(); render();
  }, { passive: false });

  container.addEventListener('touchend', function (e) {
    if (e.touches.length < 2) pinching = false;
    if (e.touches.length === 1) {
      panning = true;
      prevPx = e.touches[0].clientX;
      prevPy = e.touches[0].clientY;
    }
    if (e.touches.length === 0) {
      panning = false;
      const dx = Math.abs(e.changedTouches[0].clientX - tapStartX);
      const dy = Math.abs(e.changedTouches[0].clientY - tapStartY);
      if (dx < 10 && dy < 10) hideBanner();
    }
  }, { passive: false });

  // ── Mouse (desktop) ───────────────────────────────────────────────────────

  let dragging = false, pdx = 0, pdy = 0, mDownX = 0, mDownY = 0;

  container.addEventListener('mousedown', function (e) {
    dragging = true; pdx = e.clientX; pdy = e.clientY;
    mDownX = e.clientX; mDownY = e.clientY;
    container.style.cursor = 'grabbing';
  });

  container.addEventListener('click', function (e) {
    if (e.target.closest('.poi')) return;
    if (Math.abs(e.clientX - mDownX) < 5 && Math.abs(e.clientY - mDownY) < 5) hideBanner();
  });

  window.addEventListener('mousemove', function (e) {
    if (!dragging) return;
    tx += e.clientX - pdx; ty += e.clientY - pdy;
    pdx = e.clientX; pdy = e.clientY;
    targetTx = tx; targetTy = ty;
    clampBounds(); render();
  });

  window.addEventListener('mouseup', function () {
    dragging = false;
    container.style.cursor = 'grab';
  });

  container.addEventListener('wheel', function (e) {
    e.preventDefault();
    const r = container.getBoundingClientRect();
    const mx = e.clientX - r.left, my = e.clientY - r.top;

    if (e.ctrlKey) {
      // Pinch trackpad
      const ns = clamp(targetScale * (1 - e.deltaY * 0.008), minScale, maxScale);
      const sr = ns / targetScale;
      targetTx = mx - (mx - targetTx) * sr;
      targetTy = my - (my - targetTy) * sr;
      targetScale = ns;
    } else if (e.deltaX !== 0) {
      // Scroll horizontal trackpad
      targetTx -= e.deltaX;
      targetTy -= e.deltaY;
    } else {
      // Molette souris
      const ns = clamp(targetScale * (e.deltaY < 0 ? 1.08 : 0.93), minScale, maxScale);
      const sr = ns / targetScale;
      targetTx = mx - (mx - targetTx) * sr;
      targetTy = my - (my - targetTy) * sr;
      targetScale = ns;
    }
    clampTargetBounds();
    kickAnim();
  }, { passive: false });
})();
