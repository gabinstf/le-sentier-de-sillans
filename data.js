var SILLANS_POIS = [
    {
        id: 1,
        title: "L'Église",
        tag: "Point de départ",
        tagBg: "#e0f3f9", tagColor: "#03658C",
        etape: "1 / 10", temps: "3 min", km: "0,0",
        images: [
            { type: "video", src: "video/eglise.mp4", alt: "Vidéo de l'église de Sillans", grad: "linear-gradient(160deg,#48ADCC,#03658C)" },
            { src: "images/eglise.webp",  alt: "Façade de l'église de Sillans",  grad: "linear-gradient(160deg,#48ADCC,#03658C)" },
        ],
        description: [
            "L'église de Sillans-la-Cascade est le point de départ et de repère de ce sentier. Construite en pierres de taille provençales, elle domine la place principale du village et marque le cœur de la vie communale depuis plusieurs siècles.",
            "Avant de partir, prenez le temps de consulter les consignes de sécurité affichées à proximité. Le circuit est balisé mais certaines portions, notamment aux abords de la cascade, nécessitent prudence et respect des zones délimitées par les écogardes.",
        ],
        tip: { title: "Bon à savoir", color: "#2a9d7f", bg: "#e8f7f2", text: "Le stationnement conseillé se trouve sur le parking municipal, à deux minutes à pied de l'église. Prévoyez de bonnes chaussures — le sentier est naturel sur la majeure partie du parcours." }
    },
    {
        id: 2,
        title: "Le Bastidon de l'oliveraie",
        tag: "Patrimoine agricole",
        tagBg: "#e8f4ee", tagColor: "#1a6b3a",
        etape: "2 / 10", temps: "5 min", km: "0,2",
        images: [
            { type: "video", src: "video/bastidon-oliveraie.mp4", alt: "Le bastidon et son oliveraie", grad: "linear-gradient(160deg,#5a9c6e,#2a6c3e)" },
            { src: "images/bastidon.webp", alt: "Le bastidon provençal",  grad: "linear-gradient(160deg,#5a9c6e,#2a6c3e)" },
            { src: "images/oliveraie.webp", alt: "Vue sur l'oliveraie",   grad: "linear-gradient(160deg,#9cc47a,#5a8c4a)" },
        ],
        description: [
            "Ce bastidon — petite maison de campagne provençale — était le refuge des paysans durant les longues saisons de travail agricole. Entouré d'oliviers dont certains dépassent deux cents ans d'âge, il témoigne d'une exploitation de la terre inscrite dans la durée.",
            "L'olivier est roi en Provence. Résistant à la sécheresse estivale et aux hivers rigoureux, il a façonné l'économie et le paysage de Sillans pendant des siècles. L'huile qui en était extraite alimentait les lampes, la cuisine et le commerce local.",
        ],
        tip: { title: "Le saviez-vous ?", color: "#1a6b3a", bg: "#e8f4ee", text: "Un olivier peut produire des olives pendant plus de 1 000 ans. Les plus vieux spécimens de cette oliveraie auraient vu passer les guerres de Religion et la Révolution française." }
    },
    {
        id: 3,
        title: "Le tuf",
        tag: "Géologie",
        tagBg: "#f7f3e8", tagColor: "#6b5a1a",
        etape: "3 / 10", temps: "5 min", km: "0,8",
        images: [
            { type: "video", src: "video/tuf.mp4", alt: "Vidéo des murets en tuf", grad: "linear-gradient(160deg,#c4ad7a,#8c7c4a)" },
            { src: "images/tuff.webp", alt: "Murets en tuf",          grad: "linear-gradient(160deg,#c4ad7a,#8c7c4a)" },
        ],
        description: [
            "Les murets qui bordent ce tronçon du sentier sont construits en tuf — une roche volcanique et calcaire à la fois légère et poreuse. Cette matière, abondante dans les environs de Sillans, fut longtemps utilisée dans la construction locale pour ses propriétés isolantes.",
            "La porosité du tuf lui confère une texture caractéristique, criblée de petits alvéoles. Elle est le résultat de la solidification rapide de matériaux projetés lors d'éruptions ou de dépôts carbonatés autour de végétaux et mousses, laissant des empreintes en creux.",
        ],
        tip: { title: "Observation", color: "#6b5a1a", bg: "#f7f3e8", text: "Regardez attentivement la surface des murets : on peut parfois y deviner les empreintes de feuilles ou de tiges végétales fossilisées dans la roche il y a des millénaires." }
    },
    {
        id: 4,
        title: "Panorama et banc",
        tag: "Point de vue",
        tagBg: "#eee8f4", tagColor: "#4a2a8c",
        etape: "4 / 10", temps: "10 min", km: "1,1",
        images: [
            { type: "video", src: "video/panorama.mp4", alt: "Vidéo du panorama sur la cascade", grad: "linear-gradient(160deg,#4a8ccc,#2a4c8c)" },
            { src: "images/cascade.webp",       alt: "Vue sur la cascade de Sillans",  grad: "linear-gradient(160deg,#4a8ccc,#2a4c8c)" },
        ],
        description: [
            "Ce belvédère offre le premier et le plus spectaculaire regard sur la cascade de Sillans, qui plonge de 42 mètres dans un bassin naturel aux reflets turquoise. La hauteur de la chute et le décor minéral qui l'encadre en font l'une des plus belles cascades du Var.",
            "L'eau qui tombe ici s'appelle une fontaine pétrifiante : chargée en calcaire, elle dépose au fil du temps une fine couche minérale sur tout ce qu'elle touche — rochers, branches, mousses. La falaise elle-même est sculptée par ce phénomène continu depuis des millénaires.",
        ],
        tip: { title: "Attention", color: "#4a2a8c", bg: "#eee8f4", text: "La falaise est fragile et potentiellement instable. Restez impérativement sur les zones balisées et ne vous approchez pas du bord. Les écogardes veillent à la sécurité de tous." }
    },
    {
        id: 5,
        title: "La passerelle",
        tag: "Point d'observation",
        tagBg: "#e8eef4", tagColor: "#2a4a6b",
        etape: "5 / 10", temps: "5 min", km: "1,3",
        images: [
            { src: null,                          alt: "Zone d'attente avant la passerelle", grad: "linear-gradient(160deg,#5a9cad,#2a6c7c)" },
            { src: "images/riviere-baignade.webp", alt: "La ripisylve au bord de l'eau",     grad: "linear-gradient(160deg,#4a8c9c,#1a5c6c)" },
        ],
        description: [
            "L'accès à la passerelle est régulé par des écogardes présents toute la saison. Ce système de filtrage permet de préserver un écosystème exceptionnellement fragile : la ripisylve — la forêt galerie qui pousse le long des berges — abrite des espèces rares d'insectes, d'amphibiens et d'oiseaux.",
            "Profitez de cette pause pour observer le cours de la Bresque en contrebas. L'eau y est remarquablement claire, signe d'une bonne qualité écologique. La ripisylve filtre naturellement les eaux de ruissellement et régule la température de la rivière, indispensable à la vie aquatique.",
        ],
        tip: { title: "Éco-geste", color: "#2a4a6b", bg: "#e8eef4", text: "Ne jetez aucun déchet dans ou près de la rivière. Même un mégot ou un emballage peut perturber durablement cet écosystème sensible." }
    },
    {
        id: 6,
        title: "Le belvédère",
        tag: "Biodiversité",
        tagBg: "#e8f4ee", tagColor: "#1a5c3a",
        etape: "6 / 10", temps: "10 min", km: "1,5",
        images: [
            { type: "video", src: "video/belvedere.mp4", alt: "Vidéo du belvédère", grad: "linear-gradient(160deg,#3a8c6e,#1a5c4e)" },
            { src: "images/belvedere.webp", alt: "Vue depuis le belvédère",     grad: "linear-gradient(160deg,#3a8c6e,#1a5c4e)" },
        ],
        description: [
            "Ce belvédère offre un autre angle de vue sur la cascade tout en révélant un secret de la falaise : les fissures et anfractuosités de la roche calcaire abritent une importante colonie de chiroptères (chauves-souris). Ces mammifères nocturnes sortent à la tombée de la nuit pour chasser les insectes.",
            "Plusieurs espèces cohabitent ici, dont le Grand Rhinolophe et le Murin de Daubenton, ce dernier spécialisé dans la chasse au ras de l'eau. En une seule nuit, une chauve-souris peut consommer l'équivalent de son propre poids en insectes — un service écologique inestimable.",
        ],
        tip: { title: "Le saviez-vous ?", color: "#1a5c3a", bg: "#e8f4ee", text: "Si vous visitez le sentier en soirée entre mai et octobre, observez le ciel au-dessus de la cascade : les vols erratiques et rapides que vous verrez sont ceux des chauves-souris en chasse." }
    },
    {
        id: 7,
        title: "La Bresque",
        tag: "Écosystème aquatique",
        tagBg: "#e0f3f9", tagColor: "#03658C",
        etape: "7 / 10", temps: "5 min", km: "2,2",
        images: [
            { type: "video", src: "video/bresque.mp4", alt: "Vidéo de la Bresque", grad: "linear-gradient(160deg,#2a9cad,#1a6c7c)" },
            { src: "images/riviere.webp", alt: "La Bresque et ses berges",       grad: "linear-gradient(160deg,#2a9cad,#1a6c7c)" },
        ],
        description: [
            "La Bresque prend sa source dans le massif des Maures et parcourt une quarantaine de kilomètres avant de rejoindre l'Argens. À Sillans, elle crée la cascade qui donne son nom au village et façonne un écosystème aquatique d'une richesse exceptionnelle.",
            "Son régime est méditerranéen : généreux en hiver et au printemps, réduit à un filet d'eau en été. Dans ses eaux fraîches vivent des truites, des écrevisses à pattes blanches — espèce protégée et indicatrice d'une très bonne qualité de l'eau — ainsi que de nombreuses libellules et éphémères.",
        ],
        tip: { title: "Indicateur environnemental", color: "#03658C", bg: "#e0f3f9", text: "La présence d'écrevisses à pattes blanches est un excellent indicateur de la qualité de l'eau. Cette espèce ne tolère pas la pollution — la trouver ici confirme l'état sanitaire remarquable de la Bresque." }
    },
    {
        id: 8,
        title: "L'ancienne gare d'Aups-Sillans",
        tag: "Patrimoine historique",
        tagBg: "#f4ede8", tagColor: "#6b3a1a",
        etape: "8 / 10", temps: "5 min", km: "2,6",
        images: [
            { src: "images/gare.webp", alt: "L'ancienne gare de Sillans", grad: "linear-gradient(160deg,#cc7a5a,#8c4a2a)" },
        ],
        description: [
            "Cette ancienne gare marquait le terminus de la ligne ferroviaire reliant Aups à Sillans-la-Cascade, inaugurée à la fin du XIXe siècle. Elle représentait alors un lien vital entre le village isolé et la sous-préfecture de Draguignan, facilitant le commerce, les déplacements et le désenclavement du haut-Var.",
            "La ligne fut exploitée pendant plusieurs décennies avant d'être progressivement remplacée par l'automobile. Le bâtiment de gare, aujourd'hui reconverti, conserve son architecture ferroviaire caractéristique. Les rails ont disparu mais le tracé de l'ancienne voie est encore visible dans le paysage.",
        ],
        tip: { title: "Le saviez-vous ?", color: "#6b3a1a", bg: "#f4ede8", text: "La ligne Aups-Sillans transportait non seulement des voyageurs mais aussi du bois de chêne-liège, de la lavande séchée et des produits agricoles vers les marchés de la région." }
    },
    {
        id: 9,
        title: "Le lavoir communal",
        tag: "Patrimoine local",
        tagBg: "#f4f0e8", tagColor: "#5a4a1a",
        etape: "9 / 10", temps: "5 min", km: "2,9",
        images: [
            { src: "images/lavoir.webp", alt: "Le lavoir de Sillans", grad: "linear-gradient(160deg,#adbc7a,#7c8c4a)" },
        ],
        description: [
            "Le lavoir communal, situé rue des Remparts au bord de la Bresque, était au XIXe et au début du XXe siècle un lieu de vie sociale intense. Les femmes du village s'y retrouvaient chaque semaine pour laver le linge, partager les nouvelles et maintenir le lien communautaire.",
            "Construit en pierre de taille avec ses bacs en légère pente pour faciliter l'écoulement, le lavoir est alimenté par une dérivation de la Bresque. L'eau courante et fraîche était un luxe précieux avant l'arrivée de l'eau courante dans les foyers.",
        ],
        tip: { title: "Vie d'autrefois", color: "#5a4a1a", bg: "#f4f0e8", text: "Les femmes utilisaient du savon de Marseille, un battoir en bois et leurs mains nues dans l'eau froide, parfois pendant des heures. Le lavoir était aussi un espace de liberté et d'échanges, hors du regard des hommes." }
    },
    {
        id: 10,
        title: "La mairie",
        tag: "Patrimoine architectural",
        tagBg: "#f4eee8", tagColor: "#6b4a1a",
        etape: "10 / 10", temps: "5 min", km: "3,3",
        images: [
            { src: "images/rue-sillans.webp", alt: "La mairie de Sillans",        grad: "linear-gradient(160deg,#cc9a6a,#8c6a3a)" },
            { src: null,                      alt: "Façade de l'ancien château",  grad: "linear-gradient(160deg,#bc8a5a,#7c5a2a)" },
        ],
        description: [
            "L'actuelle mairie occupe les murs de l'ancien château seigneurial de Sillans. Édifié au Moyen Âge pour les seigneurs locaux, le bâtiment fut progressivement transformé après la Révolution française lorsque la commune en prit possession pour en faire le siège de son administration.",
            "La façade conserve des éléments architecturaux d'époque : encadrements de fenêtres, linteaux en pierre de taille et la sobre élégance des constructions provençales d'Ancien Régime. C'est ici que se prennent les décisions de la vie communale depuis plus de deux siècles.",
        ],
        tip: { title: "Fin du parcours", color: "#6b4a1a", bg: "#f4eee8", text: "Vous avez parcouru environ 3,3 km et découvert les 10 points remarquables du sentier. Prenez le temps d'une dernière pause avant de rejoindre votre point de départ — l'église est à quelques minutes à pied." }
    },
];
