(function () {
  const LAT = 43.568;
  const LON = 6.371;
  const CACHE_KEY = 'sillans_weather';
  const CACHE_TTL = 30 * 60 * 1000; // 30 min

  const SVG_OPEN = '<svg id="weatherIcon" class="weather-icon" viewBox="0 0 48 40" fill="none" xmlns="http://www.w3.org/2000/svg">';
  const SVG_CLOSE = '</svg>';

  const ICONS = {
    sunny:
      SVG_OPEN +
      '<circle cx="24" cy="19" r="8" fill="white" opacity="0.9"/>' +
      '<path d="M24 4v-2M24 36v2M39 19h2M7 19H5M34.7 9.3l1.4-1.4M11.9 30.1l-1.4 1.4M34.7 28.7l1.4 1.4M11.9 9.9l-1.4-1.4" stroke="white" stroke-width="2" stroke-linecap="round" opacity="0.75"/>' +
      SVG_CLOSE,

    partly_cloudy:
      SVG_OPEN +
      '<circle cx="30" cy="14" r="9" fill="white" opacity="0.9"/>' +
      '<path d="M30 5L30 2M30 23L30 26M39 14L42 14M21 14L18 14M36.4 8.6L38.5 6.5M23.6 19.4L21.5 21.5M36.4 19.4L38.5 21.5M23.6 8.6L21.5 6.5" stroke="white" stroke-width="2" stroke-linecap="round" opacity="0.7"/>' +
      '<rect x="6" y="20" width="28" height="14" rx="7" fill="white"/>' +
      '<rect x="12" y="14" width="16" height="12" rx="6" fill="white"/>' +
      SVG_CLOSE,

    overcast:
      SVG_OPEN +
      '<rect x="6" y="20" width="32" height="14" rx="7" fill="white" opacity="0.95"/>' +
      '<rect x="8" y="12" width="28" height="14" rx="7" fill="white" opacity="0.9"/>' +
      '<rect x="14" y="6" width="20" height="12" rx="6" fill="white" opacity="0.8"/>' +
      SVG_CLOSE,

    fog:
      SVG_OPEN +
      '<rect x="8" y="4" width="28" height="12" rx="6" fill="white" opacity="0.7"/>' +
      '<path d="M4 22h38M6 30h34M10 38h26" stroke="white" stroke-width="2.5" stroke-linecap="round" opacity="0.75"/>' +
      SVG_CLOSE,

    drizzle:
      SVG_OPEN +
      '<rect x="5" y="5" width="30" height="14" rx="7" fill="white" opacity="0.9"/>' +
      '<rect x="12" y="1" width="16" height="11" rx="5.5" fill="white" opacity="0.9"/>' +
      '<path d="M11 26l-1 7M18 26l-1 7M25 26l-1 7M32 26l-1 7" stroke="white" stroke-width="2" stroke-linecap="round" opacity="0.8"/>' +
      SVG_CLOSE,

    rain:
      SVG_OPEN +
      '<rect x="5" y="4" width="30" height="14" rx="7" fill="white" opacity="0.9"/>' +
      '<rect x="12" y="0" width="16" height="11" rx="5.5" fill="white" opacity="0.9"/>' +
      '<path d="M10 23l-5 15M18 23l-5 15M26 23l-5 15M34 23l-5 15" stroke="white" stroke-width="2" stroke-linecap="round" opacity="0.8"/>' +
      SVG_CLOSE,

    snow:
      SVG_OPEN +
      '<rect x="5" y="4" width="30" height="14" rx="7" fill="white" opacity="0.9"/>' +
      '<rect x="12" y="0" width="16" height="11" rx="5.5" fill="white" opacity="0.9"/>' +
      '<circle cx="11" cy="26" r="2.5" fill="white" opacity="0.85"/>' +
      '<circle cx="20" cy="33" r="2.5" fill="white" opacity="0.85"/>' +
      '<circle cx="29" cy="26" r="2.5" fill="white" opacity="0.85"/>' +
      '<circle cx="38" cy="33" r="2.5" fill="white" opacity="0.85"/>' +
      SVG_CLOSE,

    thunderstorm:
      SVG_OPEN +
      '<rect x="5" y="2" width="30" height="14" rx="7" fill="white" opacity="0.9"/>' +
      '<rect x="12" y="0" width="16" height="9" rx="4.5" fill="white" opacity="0.9"/>' +
      '<path d="M24 18l-8 12h8l-6 10" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      SVG_CLOSE,
  };

  const LABELS = {
    0: 'Ensoleillé',   1: 'Dégagé',       2: 'Peu nuageux',  3: 'Couvert',
    45: 'Brouillard',  48: 'Brouillard',
    51: 'Bruine',      53: 'Bruine',       55: 'Bruine',
    56: 'Bruine',      57: 'Bruine',
    61: 'Pluie',       63: 'Pluie',        65: 'Pluie',
    66: 'Pluie',       67: 'Pluie',
    71: 'Neige',       73: 'Neige',        75: 'Neige',       77: 'Neige',
    80: 'Averses',     81: 'Averses',      82: 'Averses',
    85: 'Neige',       86: 'Neige',
    95: 'Orage',       96: 'Orage',        99: 'Orage',
  };

  function iconKey(code) {
    if (code === 0) return 'sunny';
    if (code <= 2)  return 'partly_cloudy';
    if (code === 3) return 'overcast';
    if (code <= 48) return 'fog';
    if (code <= 57) return 'drizzle';
    if (code <= 67) return 'rain';
    if (code <= 77) return 'snow';
    if (code <= 82) return 'rain';
    if (code <= 86) return 'snow';
    return 'thunderstorm';
  }

  function apply(temp, code) {
    const iconEl = document.getElementById('weatherIcon');
    const textEl = document.getElementById('weatherText');
    if (iconEl) iconEl.outerHTML = ICONS[iconKey(code)];
    if (textEl) textEl.textContent = (LABELS[code] || 'Couvert') + ' • ' + temp + '°C';
  }

  // Cache localStorage 30 min
  try {
    const c = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (c && Date.now() - c.ts < CACHE_TTL) { apply(c.temp, c.code); return; }
  } catch (e) {}

  fetch('https://api.open-meteo.com/v1/forecast?latitude=' + LAT + '&longitude=' + LON + '&current=temperature_2m,weather_code&timezone=Europe%2FParis')
    .then(function (r) { return r.json(); })
    .then(function (d) {
      const temp = Math.round(d.current.temperature_2m);
      const code = d.current.weather_code;
      try { localStorage.setItem(CACHE_KEY, JSON.stringify({ temp: temp, code: code, ts: Date.now() })); } catch (e) {}
      apply(temp, code);
    })
    .catch(function () {});
})();
