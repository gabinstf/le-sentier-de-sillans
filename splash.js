(function () {
  if (sessionStorage.getItem('splashDone')) return;
  sessionStorage.setItem('splashDone', '1');

  const style = document.createElement('style');
  style.textContent = `
    .splash { position:fixed; inset:0; z-index:9999; }
    .splash-layer { position:absolute; inset:0; will-change:transform; }
    .splash-logo {
      position:absolute; left:50%; top:50%;
      transform:translate(-50%,-50%);
      width:220px; z-index:10;
      opacity:0; transition:opacity 0.45s ease;
    }
    @keyframes splashUp {
      to { transform:translateY(-100%); }
    }
    .splash-layer.up {
      animation:splashUp 0.6s cubic-bezier(0.76,0,0.24,1) forwards;
    }
  `;
  document.head.appendChild(style);

  const splash = document.createElement('div');
  splash.className = 'splash';

  // DOM order = stacking order (dernier = devant)
  // off-white (fond) → light blue → dark blue (devant, visible en premier)
  [{ c:'#F2F2F2' }, { c:'#48ADCC' }, { c:'#03658C' }].forEach(function({ c }) {
    const el = document.createElement('div');
    el.className = 'splash-layer';
    el.style.background = c;
    splash.appendChild(el);
  });

  const logo = document.createElement('img');
  logo.className = 'splash-logo';
  logo.src = 'images/logo.svg';
  splash.appendChild(logo);

  document.body.appendChild(splash);

  const layers = splash.querySelectorAll('.splash-layer');

  // Fade in du logo
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { logo.style.opacity = '1'; });
  });

  // Dark blue (index 2) → light blue (1) → off-white (0)
  var delays = [920, 740, 560];
  layers.forEach(function (el, i) {
    setTimeout(function () { el.classList.add('up'); }, delays[i]);
  });

  // Fade out logo avant la dernière couche
  setTimeout(function () { logo.style.opacity = '0'; }, 840);

  // Suppression
  setTimeout(function () { splash.remove(); }, 1550);
})();
