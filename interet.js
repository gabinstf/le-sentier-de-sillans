// ── ÉTAT ─────────────────────────────────────────────────────────────────────

let currentPoi = null;
let galleryIndex = 0;
let autoTimer = null;

const PHOTO_ICON = `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="12" width="56" height="40" rx="6" stroke="white" stroke-width="3"/>
    <circle cx="22" cy="28" r="6" stroke="white" stroke-width="3"/>
    <path d="M4 40l14-12 10 10 10-14 16 18" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// ── GALERIE ───────────────────────────────────────────────────────────────────

function buildGallery(poi) {
    const track = document.getElementById('galleryTrack');
    const dots  = document.getElementById('galleryDots');
    track.innerHTML = '';
    dots.innerHTML  = '';
    galleryIndex = 0;

    poi.images.forEach(function(img, i) {
        const slide = document.createElement('div');
        slide.className = 'gallery-slide';
        slide.innerHTML = img.src
            ? '<img src="' + img.src + '" alt="' + img.alt + '">'
            : '<div class="slide-placeholder" style="background:' + img.grad + '">' + PHOTO_ICON + '</div>';
        track.appendChild(slide);

        const dot = document.createElement('div');
        dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', function() { stopAuto(); goToSlide(i); });
        dots.appendChild(dot);
    });

    updateCounter(poi);
}

function updateCounter(poi) {
    document.getElementById('galleryCounter').textContent =
        (galleryIndex + 1) + ' / ' + poi.images.length;
}

function goToSlide(index) {
    const wrapper = document.getElementById('galleryWrapper');
    const track   = document.getElementById('galleryTrack');
    const dots    = document.getElementById('galleryDots').children;
    galleryIndex  = Math.max(0, Math.min(index, currentPoi.images.length - 1));
    track.style.transition = 'transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)';
    track.style.transform  = 'translateX(' + (-galleryIndex * wrapper.offsetWidth) + 'px)';
    Array.from(dots).forEach(function(d, i) { d.classList.toggle('active', i === galleryIndex); });
    updateCounter(currentPoi);
}

function stopAuto() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
}

function startAuto() {
    stopAuto();
    if (!currentPoi || currentPoi.images.length <= 1) return;
    autoTimer = setInterval(function() {
        goToSlide((galleryIndex + 1) % currentPoi.images.length);
    }, 3000);
}

function initSwipe() {
    const wrapper = document.getElementById('galleryWrapper');
    const track   = document.getElementById('galleryTrack');
    let startX = 0, startY = 0, axis = null, delta = 0;

    wrapper.addEventListener('touchstart', function(e) {
        if (e.touches.length !== 1) return;
        stopAuto();
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        axis   = null;
        delta  = 0;
        track.style.transition = 'none';
        track.style.transform  = 'translateX(' + (-galleryIndex * wrapper.offsetWidth) + 'px)';
    }, { passive: true });

    wrapper.addEventListener('touchmove', function(e) {
        if (e.touches.length !== 1) return;
        const dx = e.touches[0].clientX - startX;
        const dy = e.touches[0].clientY - startY;
        if (axis === null) {
            if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
            axis = Math.abs(dx) >= Math.abs(dy) ? 'h' : 'v';
        }
        if (axis !== 'h') return;
        delta = dx;
        track.style.transform = 'translateX(' + (-galleryIndex * wrapper.offsetWidth + dx) + 'px)';
    }, { passive: true });

    function onEnd() {
        if (axis === 'h') {
            if (delta < -50)      goToSlide(galleryIndex + 1);
            else if (delta > 50)  goToSlide(galleryIndex - 1);
            else                  goToSlide(galleryIndex);
        }
        startAuto();
    }

    wrapper.addEventListener('touchend',    onEnd, { passive: true });
    wrapper.addEventListener('touchcancel', onEnd, { passive: true });
}

// ── CONTENU ───────────────────────────────────────────────────────────────────

function buildContent(poi) {
    document.getElementById('poiContent').innerHTML =
        '<span class="poi-tag" style="background:' + poi.tagBg + ';color:' + poi.tagColor + '">' + poi.tag + '</span>' +
        '<h1 class="poi-title" style="color:' + poi.tagColor + '">' + poi.title + '</h1>' +
        '<div class="poi-meta">' +
            '<span class="poi-meta-item">' +
                '<svg viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#48ADCC"/><circle cx="12" cy="9" r="2.5" fill="white"/></svg>' +
                'Étape ' + poi.etape +
            '</span>' +
            '<span class="poi-meta-item">' +
                '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#48ADCC" stroke-width="2"/><path d="M12 7v5l3 3" stroke="#48ADCC" stroke-width="2" stroke-linecap="round"/></svg>' +
                poi.temps +
            '</span>' +
            '<span class="poi-meta-item">' +
                '<svg viewBox="0 0 24 24" fill="none"><path d="M3 17l4-8 4 4 4-6 4 10" stroke="#48ADCC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
                'Km ' + poi.km +
            '</span>' +
        '</div>' +
        '<div class="poi-divider"></div>' +
        '<p class="poi-section-label">À propos</p>' +
        '<div class="poi-description">' + poi.description.map(function(p) { return '<p>' + p + '</p>'; }).join('') + '</div>' +
        '<div class="poi-tip" style="border-color:' + poi.tip.color + ';background:' + poi.tip.bg + ';color:' + poi.tip.color + '">' +
            '<strong>' + poi.tip.title + '</strong>' + poi.tip.text +
        '</div>';
}

// ── INIT ──────────────────────────────────────────────────────────────────────

function render() {
    const params = new URLSearchParams(window.location.search);
    const id     = parseInt(params.get('id')) || 1;
    const poi    = SILLANS_POIS.find(function(p) { return p.id === id; }) || SILLANS_POIS[0];
    currentPoi   = poi;
    localStorage.setItem('lastPoiId', poi.id);

    document.title = poi.title + ' — Le Sentier de Sillans';
    buildGallery(poi);
    buildContent(poi);
    initSwipe();
    startAuto();
}

render();
