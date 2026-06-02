// ── DONNÉES ──────────────────────────────────────────────────────────────────
// Pour ajouter de vraies photos : remplacer src: null par src: 'photos/nom.jpg'

const POIS = [
    {
        id: 1,
        title: "L'Église",
        tag: "Point de départ",
        tagBg: "#e0f3f9", tagColor: "#03658C",
        etape: "1 / 14", temps: "3 min", km: "0,0",
        images: [
            { src: null, alt: "Façade de l'église de Sillans",  grad: "linear-gradient(160deg,#48ADCC,#03658C)" },
            { src: null, alt: "Place du village",                grad: "linear-gradient(160deg,#6e8cad,#3a5a7a)" },
        ],
        description: [
            "L'église de Sillans-la-Cascade est le point de départ et de repère de ce sentier. Construite en pierres de taille provençales, elle domine la place principale du village et marque le cœur de la vie communale depuis plusieurs siècles.",
            "Avant de partir, prenez le temps de consulter les consignes de sécurité affichées à proximité. Le circuit est balisé mais certaines portions, notamment aux abords de la cascade, nécessitent prudence et respect des zones délimitées par les écogardes.",
        ],
        tip: { title: "Bon à savoir", color: "#2a9d7f", bg: "#e8f7f2", text: "Le stationnement conseillé se trouve sur le parking municipal, à deux minutes à pied de l'église. Prévoyez de bonnes chaussures — le sentier est naturel sur la majeure partie du parcours." }
    },
    {
        id: 2,
        title: "Le Bastidon et l'oliveraie",
        tag: "Patrimoine agricole",
        tagBg: "#e8f4ee", tagColor: "#1a6b3a",
        etape: "2 / 14", temps: "5 min", km: "0,2",
        images: [
            { src: null, alt: "Le bastidon provençal",           grad: "linear-gradient(160deg,#5a9c6e,#2a6c3e)" },
            { src: null, alt: "Oliviers centenaires",            grad: "linear-gradient(160deg,#7aad6e,#3a7c4e)" },
            { src: null, alt: "Vue sur l'oliveraie",             grad: "linear-gradient(160deg,#9cc47a,#5a8c4a)" },
        ],
        description: [
            "Ce bastidon — petite maison de campagne provençale — était le refuge des paysans durant les longues saisons de travail agricole. Entouré d'oliviers dont certains dépassent deux cents ans d'âge, il témoigne d'une exploitation de la terre inscrite dans la durée.",
            "L'olivier est roi en Provence. Résistant à la sécheresse estivale et aux hivers rigoureux, il a façonné l'économie et le paysage de Sillans pendant des siècles. L'huile qui en était extraite alimentait les lampes, la cuisine et le commerce local.",
        ],
        tip: { title: "Le saviez-vous ?", color: "#1a6b3a", bg: "#e8f4ee", text: "Un olivier peut produire des olives pendant plus de 1 000 ans. Les plus vieux spécimens de cette oliveraie auraient vu passer les guerres de Religion et la Révolution française." }
    },
    {
        id: 3,
        title: "Canaux d'irrigation en travertin",
        tag: "Patrimoine agricole",
        tagBg: "#e8f4ee", tagColor: "#1a6b3a",
        etape: "3 / 14", temps: "5 min", km: "0,5",
        images: [
            { src: null, alt: "Canal en travertin",              grad: "linear-gradient(160deg,#8cad7a,#5a7c4a)" },
            { src: null, alt: "Détail de la roche",              grad: "linear-gradient(160deg,#ad9c6e,#7c6c3a)" },
        ],
        description: [
            "Ce réseau de canaux taillés dans le travertin est un chef-d'œuvre d'ingénierie paysanne. L'eau captée sur la Bresque était acheminée par gravité jusqu'aux parcelles cultivées en contrebas, permettant l'irrigation des jardins et des vergers tout au long de l'été.",
            "Le travertin — une roche calcaire sédimentaire — était le matériau idéal : naturellement disponible, facile à travailler et imperméable une fois poli. Ces canaux fonctionnèrent pendant plusieurs siècles avant d'être progressivement abandonnés au XXe siècle.",
        ],
        tip: { title: "Géologie", color: "#8c7a2a", bg: "#f7f3e8", text: "Le travertin se forme par précipitation du carbonate de calcium contenu dans les eaux chargées en minéraux. C'est le même processus qui crée les stalactites dans les grottes." }
    },
    {
        id: 4,
        title: "Le tuff",
        tag: "Géologie",
        tagBg: "#f7f3e8", tagColor: "#6b5a1a",
        etape: "4 / 14", temps: "5 min", km: "0,8",
        images: [
            { src: null, alt: "Murets en tuf",                   grad: "linear-gradient(160deg,#c4ad7a,#8c7c4a)" },
            { src: null, alt: "Surface poreuse du tuf",          grad: "linear-gradient(160deg,#d4bc8a,#9c8c5a)" },
        ],
        description: [
            "Les murets qui bordent ce tronçon du sentier sont construits en tuf — une roche volcanique et calcaire à la fois légère et poreuse. Cette matière, abondante dans les environs de Sillans, fut longtemps utilisée dans la construction locale pour ses propriétés isolantes.",
            "La porosité du tuf lui confère une texture caractéristique, criblée de petits alvéoles. Elle est le résultat de la solidification rapide de matériaux projetés lors d'éruptions ou de dépôts carbonatés autour de végétaux et mousses, laissant des empreintes en creux.",
        ],
        tip: { title: "Observation", color: "#6b5a1a", bg: "#f7f3e8", text: "Regardez attentivement la surface des murets : on peut parfois y deviner les empreintes de feuilles ou de tiges végétales fossilisées dans la roche il y a des millénaires." }
    },
    {
        id: 5,
        title: "Panorama de la cascade",
        tag: "Point de vue",
        tagBg: "#eee8f4", tagColor: "#4a2a8c",
        etape: "5 / 14", temps: "10 min", km: "1,1",
        images: [
            { src: null, alt: "Vue sur la cascade de Sillans",   grad: "linear-gradient(160deg,#4a8ccc,#2a4c8c)" },
            { src: null, alt: "La fontaine pétrifiante",         grad: "linear-gradient(160deg,#6aadd4,#3a6cac)" },
            { src: null, alt: "Vue plongeante sur le bassin",    grad: "linear-gradient(160deg,#2a6cad,#1a3c7c)" },
        ],
        description: [
            "Ce belvédère offre le premier et le plus spectaculaire regard sur la cascade de Sillans, qui plonge de <strong>42 mètres</strong> dans un bassin naturel aux reflets turquoise. La hauteur de la chute et le décor minéral qui l'encadre en font l'une des plus belles cascades du Var.",
            "L'eau qui tombe ici s'appelle une fontaine pétrifiante : chargée en calcaire, elle dépose au fil du temps une fine couche minérale sur tout ce qu'elle touche — rochers, branches, mousses. La falaise elle-même est sculptée par ce phénomène continu depuis des millénaires.",
        ],
        tip: { title: "Attention", color: "#4a2a8c", bg: "#eee8f4", text: "La falaise est fragile et potentiellement instable. Restez impérativement sur les zones balisées et ne vous approchez pas du bord. Les écogardes veillent à la sécurité de tous." }
    },
    {
        id: 6,
        title: "Avant la passerelle",
        tag: "Point d'observation",
        tagBg: "#e8eef4", tagColor: "#2a4a6b",
        etape: "6 / 14", temps: "5 min", km: "1,3",
        images: [
            { src: null, alt: "Zone d'attente avant la passerelle", grad: "linear-gradient(160deg,#5a9cad,#2a6c7c)" },
            { src: null, alt: "La ripisylve au bord de l'eau",      grad: "linear-gradient(160deg,#4a8c9c,#1a5c6c)" },
        ],
        description: [
            "L'accès à la passerelle est régulé par des écogardes présents toute la saison. Ce système de filtrage permet de préserver un écosystème exceptionnellement fragile : la ripisylve — la forêt galerie qui pousse le long des berges — abrite des espèces rares d'insectes, d'amphibiens et d'oiseaux.",
            "Profitez de cette pause pour observer le cours de la Bresque en contrebas. L'eau y est remarquablement claire, signe d'une bonne qualité écologique. La ripisylve filtre naturellement les eaux de ruissellement et régule la température de la rivière, indispensable à la vie aquatique.",
        ],
        tip: { title: "Éco-geste", color: "#2a4a6b", bg: "#e8eef4", text: "Ne jetez aucun déchet dans ou près de la rivière. Même un mégot ou un emballage peut perturber durablement cet écosystème sensible." }
    },
    {
        id: 7,
        title: "Belvédère et zone d'attente",
        tag: "Biodiversité",
        tagBg: "#e8f4ee", tagColor: "#1a5c3a",
        etape: "7 / 14", temps: "10 min", km: "1,5",
        images: [
            { src: null, alt: "Vue depuis le belvédère",         grad: "linear-gradient(160deg,#3a8c6e,#1a5c4e)" },
            { src: null, alt: "Les falaises et la cascade",      grad: "linear-gradient(160deg,#4a9c7e,#2a6c5a)" },
            { src: null, alt: "Chiroptères dans la falaise",     grad: "linear-gradient(160deg,#2a7c5e,#1a4c3a)" },
        ],
        description: [
            "Ce belvédère offre un autre angle de vue sur la cascade tout en révélant un secret de la falaise : les fissures et anfractuosités de la roche calcaire abritent une importante colonie de <strong>chiroptères</strong> (chauves-souris). Ces mammifères nocturnes sortent à la tombée de la nuit pour chasser les insectes.",
            "Plusieurs espèces cohabitent ici, dont le Grand Rhinolophe et le Murin de Daubenton, ce dernier spécialisé dans la chasse au ras de l'eau. En une seule nuit, une chauve-souris peut consommer l'équivalent de son propre poids en insectes — un service écologique inestimable.",
        ],
        tip: { title: "Le saviez-vous ?", color: "#1a5c3a", bg: "#e8f4ee", text: "Si vous visitez le sentier en soirée entre mai et octobre, observez le ciel au-dessus de la cascade : les vols erratiques et rapides que vous verrez sont ceux des chauves-souris en chasse." }
    },
    {
        id: 8,
        title: "L'usine hydroélectrique",
        tag: "Patrimoine industriel",
        tagBg: "#e8ecf4", tagColor: "#2a3a6b",
        etape: "8 / 14", temps: "5 min", km: "1,8",
        images: [
            { src: null, alt: "Ancienne usine hydroélectrique",  grad: "linear-gradient(160deg,#5a6c9c,#2a3c6c)" },
            { src: null, alt: "La conduite forcée",              grad: "linear-gradient(160deg,#6a7cac,#3a4c7c)" },
        ],
        description: [
            "Cette ancienne usine hydroélectrique fut l'une des premières installations du genre dans le Var. Elle exploitait la force de la Bresque pour produire de l'électricité, alimentant le village de Sillans dès le début du XXe siècle — bien avant que l'électrification rurale ne soit généralisée en France.",
            "La conduite forcée, visible le long du talus, acheminait l'eau depuis un point de captage en amont jusqu'aux turbines de l'usine. Aujourd'hui hors d'usage, ces vestiges industriels témoignent de l'ingéniosité avec laquelle les habitants tirèrent parti de leur ressource naturelle principale.",
        ],
        tip: { title: "Histoire locale", color: "#2a3a6b", bg: "#e8ecf4", text: "L'électricité produite ici permit d'éclairer l'église, la mairie et quelques commerces du village dès 1910, une modernité remarquable pour une commune rurale de cette taille à l'époque." }
    },
    {
        id: 9,
        title: "La Bresque",
        tag: "Écosystème aquatique",
        tagBg: "#e0f3f9", tagColor: "#03658C",
        etape: "9 / 14", temps: "5 min", km: "2,2",
        images: [
            { src: null, alt: "La Bresque et ses berges",        grad: "linear-gradient(160deg,#2a9cad,#1a6c7c)" },
            { src: null, alt: "Faune aquatique de la Bresque",   grad: "linear-gradient(160deg,#3aacbd,#2a7c8c)" },
            { src: null, alt: "Reflets dans l'eau claire",       grad: "linear-gradient(160deg,#4abccd,#2a8c9c)" },
        ],
        description: [
            "La Bresque prend sa source dans le massif des Maures et parcourt une quarantaine de kilomètres avant de rejoindre l'Argens. À Sillans, elle crée la cascade qui donne son nom au village et façonne un écosystème aquatique d'une richesse exceptionnelle.",
            "Son régime est méditerranéen : généreux en hiver et au printemps, réduit à un filet d'eau en été. Dans ses eaux fraîches vivent des truites, des écrevisses à pattes blanches — espèce protégée et indicatrice d'une très bonne qualité de l'eau — ainsi que de nombreuses libellules et éphémères.",
        ],
        tip: { title: "Indicateur environnemental", color: "#03658C", bg: "#e0f3f9", text: "La présence d'écrevisses à pattes blanches est un excellent indicateur de la qualité de l'eau. Cette espèce ne tolère pas la pollution — la trouver ici confirme l'état sanitaire remarquable de la Bresque." }
    },
    {
        id: 10,
        title: "L'ancienne gare Aups-Sillans",
        tag: "Patrimoine historique",
        tagBg: "#f4ede8", tagColor: "#6b3a1a",
        etape: "10 / 14", temps: "5 min", km: "2,6",
        images: [
            { src: null, alt: "L'ancienne gare de Sillans",      grad: "linear-gradient(160deg,#cc7a5a,#8c4a2a)" },
            { src: null, alt: "Les anciens rails",               grad: "linear-gradient(160deg,#bc6a4a,#7c3a1a)" },
        ],
        description: [
            "Cette ancienne gare marquait le terminus de la ligne ferroviaire reliant Aups à Sillans-la-Cascade, inaugurée à la fin du XIXe siècle. Elle représentait alors un lien vital entre le village isolé et la sous-préfecture de Draguignan, facilitant le commerce, les déplacements et le désenclavement du haut-Var.",
            "La ligne fut exploitée pendant plusieurs décennies avant d'être progressivement remplacée par l'automobile. Le bâtiment de gare, aujourd'hui reconverti, conserve son architecture ferroviaire caractéristique. Les rails ont disparu mais le tracé de l'ancienne voie est encore visible dans le paysage.",
        ],
        tip: { title: "Le saviez-vous ?", color: "#6b3a1a", bg: "#f4ede8", text: "La ligne Aups-Sillans transportait non seulement des voyageurs mais aussi du bois de chêne-liège, de la lavande séchée et des produits agricoles vers les marchés de la région." }
    },
    {
        id: 11,
        title: "Le lavoir communal",
        tag: "Patrimoine local",
        tagBg: "#f4f0e8", tagColor: "#5a4a1a",
        etape: "11 / 14", temps: "5 min", km: "2,9",
        images: [
            { src: null, alt: "Le lavoir de Sillans",            grad: "linear-gradient(160deg,#adbc7a,#7c8c4a)" },
            { src: null, alt: "Les bacs en pierre",              grad: "linear-gradient(160deg,#9cac6a,#6c7c3a)" },
        ],
        description: [
            "Le lavoir communal, situé rue des Remparts au bord de la Bresque, était au XIXe et au début du XXe siècle un lieu de vie sociale intense. Les femmes du village s'y retrouvaient chaque semaine pour laver le linge, partager les nouvelles et maintenir le lien communautaire.",
            "Construit en pierre de taille avec ses bacs en légère pente pour faciliter l'écoulement, le lavoir est alimenté par une dérivation de la Bresque. L'eau courante et fraîche était un luxe précieux avant l'arrivée de l'eau courante dans les foyers.",
        ],
        tip: { title: "Vie d'autrefois", color: "#5a4a1a", bg: "#f4f0e8", text: "Les femmes utilisaient du savon de Marseille, un battoir en bois et leurs mains nues dans l'eau froide, parfois pendant des heures. Le lavoir était aussi un espace de liberté et d'échanges, hors du regard des hommes." }
    },
    {
        id: 12,
        title: "Les remparts",
        tag: "Patrimoine fortifié",
        tagBg: "#eceef2", tagColor: "#2a3a5a",
        etape: "12 / 14", temps: "5 min", km: "3,1",
        images: [
            { src: null, alt: "Les remparts de Sillans",         grad: "linear-gradient(160deg,#6a7a8c,#3a4a5c)" },
            { src: null, alt: "Vestiges des fortifications",     grad: "linear-gradient(160deg,#7a8a9c,#4a5a6c)" },
        ],
        description: [
            "Les vestiges des remparts de Sillans datent du Moyen Âge. Ce système défensif entourait le village perché pour le protéger des attaques, notamment durant les guerres de Religion qui ravagèrent le Var aux XVIe et XVIIe siècles. Seules quelques sections de murs et une tour ont survécu aux siècles.",
            "Le tracé des anciens remparts est encore lisible dans le plan actuel du village : les rues qui le bordaient ont conservé leur courbe, et certaines maisons sont construites à même les pierres de l'enceinte. La rue des Remparts rappelle dans son nom ce passé défensif.",
        ],
        tip: { title: "Architecture médiévale", color: "#2a3a5a", bg: "#eceef2", text: "Les pierres des remparts ont souvent été réemployées pour construire des maisons au fil des siècles. Regardez les murs des habitations voisines : vous y trouverez parfois de grands blocs très anciens, récupérés des fortifications." }
    },
    {
        id: 13,
        title: "La mairie — ancien château",
        tag: "Patrimoine architectural",
        tagBg: "#f4eee8", tagColor: "#6b4a1a",
        etape: "13 / 14", temps: "5 min", km: "3,3",
        images: [
            { src: null, alt: "La mairie de Sillans",            grad: "linear-gradient(160deg,#cc9a6a,#8c6a3a)" },
            { src: null, alt: "Façade de l'ancien château",      grad: "linear-gradient(160deg,#bc8a5a,#7c5a2a)" },
        ],
        description: [
            "L'actuelle mairie occupe les murs de l'ancien château seigneurial de Sillans. Édifié au Moyen Âge pour les seigneurs locaux, le bâtiment fut progressivement transformé après la Révolution française lorsque la commune en prit possession pour en faire le siège de son administration.",
            "La façade conserve des éléments architecturaux d'époque : encadrements de fenêtres, linteaux en pierre de taille et la sobre élégance des constructions provençales d'Ancien Régime. C'est ici que se prennent les décisions de la vie communale depuis plus de deux siècles.",
        ],
        tip: { title: "Révolution française", color: "#6b4a1a", bg: "#f4eee8", text: "Après 1789, les châteaux et biens des nobles furent confisqués comme \"biens nationaux\" et souvent attribués aux communes. C'est ainsi que Sillans récupéra son château pour en faire sa mairie." }
    },
    {
        id: 14,
        title: "La Grande Rue",
        tag: "Centre historique",
        tagBg: "#f4e8ee", tagColor: "#6b1a4a",
        etape: "14 / 14", temps: "5 min", km: "3,5",
        images: [
            { src: null, alt: "La grande rue de Sillans",        grad: "linear-gradient(160deg,#cc6a9a,#8c3a6a)" },
            { src: null, alt: "La fontaine du village",          grad: "linear-gradient(160deg,#bc5a8a,#7c2a5a)" },
            { src: null, alt: "Croisement place principale",     grad: "linear-gradient(160deg,#dc7aaa,#9c4a7a)" },
        ],
        description: [
            "La Grande Rue est l'artère principale de Sillans-la-Cascade. Elle relie la place de l'église à la place de l'Abreuvoir, jalonnée de maisons en pierre aux volets colorés, de fontaines et de passages ombragés typiques de l'architecture villageoise provençale.",
            "C'est ici que bat le cœur social du village : les commerces, le café, le marché hebdomadaire. La fontaine de l'Abreuvoir servait autrefois à abreuver les animaux de trait. Aujourd'hui, elle est le symbole de la place publique méditerranéenne — un lieu de fraîcheur et de rencontre.",
        ],
        tip: { title: "Fin du parcours", color: "#6b1a4a", bg: "#f4e8ee", text: "Vous avez parcouru environ 3,5 km et découvert 14 points remarquables. Prenez le temps d'une dernière pause à la terrasse du café avant de rejoindre votre point de départ — l'église est à quelques minutes à pied." }
    },
];

// ── ÉTAT ─────────────────────────────────────────────────────────────────────

const TOTAL = POIS.length;
let currentPoi = null;
let galleryIndex = 0;

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
        dot.addEventListener('click', function() { goToSlide(i); });
        dots.appendChild(dot);
    });

    updateCounter(poi);
}

function updateCounter(poi) {
    document.getElementById('galleryCounter').textContent =
        (galleryIndex + 1) + ' / ' + poi.images.length;
}

function goToSlide(index) {
    const track = document.getElementById('galleryTrack');
    const dots  = document.getElementById('galleryDots').children;
    galleryIndex = Math.max(0, Math.min(index, currentPoi.images.length - 1));
    track.style.transition = 'transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)';
    track.style.transform  = 'translateX(-' + galleryIndex * 100 + '%)';
    Array.from(dots).forEach(function(d, i) { d.classList.toggle('active', i === galleryIndex); });
    updateCounter(currentPoi);
}

function initSwipe() {
    const track = document.getElementById('galleryTrack');
    let startX = 0, dragging = false, delta = 0;

    track.addEventListener('touchstart', function(e) {
        startX   = e.touches[0].clientX;
        dragging = true;
        delta    = 0;
        track.style.transition = 'none';
    }, { passive: true });

    track.addEventListener('touchmove', function(e) {
        if (!dragging) return;
        delta = e.touches[0].clientX - startX;
        const pct = -galleryIndex * 100 + (delta / track.parentElement.offsetWidth) * 100;
        track.style.transform = 'translateX(' + pct + '%)';
    }, { passive: true });

    track.addEventListener('touchend', function() {
        dragging = false;
        if (delta < -50)      goToSlide(galleryIndex + 1);
        else if (delta > 50)  goToSlide(galleryIndex - 1);
        else                  goToSlide(galleryIndex);
    });
}

// ── NAVIGATION ────────────────────────────────────────────────────────────────

function buildNav(id) {
    const prev  = document.getElementById('btnPrev');
    const next  = document.getElementById('btnNext');
    const count = document.getElementById('poiNavCount');
    prev.disabled = id <= 1;
    next.disabled = id >= TOTAL;
    count.textContent = id + ' / ' + TOTAL;
    prev.onclick = function() { navigateTo(id - 1); };
    next.onclick = function() { navigateTo(id + 1); };
}

function navigateTo(id) {
    const url = new URL(window.location.href);
    url.searchParams.set('id', id);
    window.location.href = url.toString();
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
    const poi    = POIS.find(function(p) { return p.id === id; }) || POIS[0];
    currentPoi   = poi;

    document.title = poi.title + ' — Le Sentier de Sillans';
    buildGallery(poi);
    buildNav(poi.id);
    buildContent(poi);
    initSwipe();
}

render();
