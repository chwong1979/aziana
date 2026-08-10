/* Aziana visitor copy: each locale is a peer, written as a complete message rather than
   derived sentence-by-sentence from English. Business facts remain in index.html. */
(function () {
  const supported = ['en', 'nl', 'fr', 'es'];
  const copy = {
    en: {
      hero: 'Fresh sushi, seafood, steaks, poke bowls and Chinese-Indonesian specialties served at Aziana in Bobby\'s Marina, Sint Maarten.',
      setting: 'Settle into our wood-beamed dining room with the marina just outside the windows — a relaxed place for sushi at lunch, dinner with family, or an evening with friends.',
      welcome: 'Whether you are exploring Philipsburg, heading out on the water, or simply craving sushi, seafood, steak or Asian fusion, Aziana is ready to welcome you.',
      cuisine: 'From sushi prepared to order and colourful poke bowls to seafood from the grill and Chinese-Indonesian favourites, our menu carries forward a Philipsburg family tradition.',
      gallery: 'Colourful rolls, generous bowls and plates made for sharing — served with the marina as your backdrop.',
      story1: 'Our story began in 1995, when Molly and Mario opened Old Captain in Great Bay and introduced Philipsburg to sushi and Chinese-Indonesian cooking.',
      story2: 'That family tradition grew through the restaurants that followed. Since 2018, it has had a new home at Bobby\'s Marina: Aziana.',
      bar: 'Ease into the evening with a drink before dinner, linger afterward, or make the bar your destination for a relaxed night in Philipsburg.',
      events: 'Bring everyone together for a birthday, company dinner or private celebration — indoors, on the porch or beside the marina.',
      hoursNote: 'The bar may stay open later. Contact Aziana for today\'s details.'
    },
    nl: {
      hero: 'Zin in sushi, verse vis, steak of een poke bowl? Bij Aziana proef je ook de Chinees-Indonesische gerechten waar onze familie om bekendstaat — aan de jachthaven in Sint Maarten.',
      setting: 'Neem plaats in onze sfeervolle zaal met houten balken en uitzicht op de jachthaven. Een fijne plek voor een sushilunch, een familiediner of een lange avond met vrienden.',
      welcome: 'Of je nu Philipsburg ontdekt, terugkomt van een dag op het water of gewoon lekker wilt eten: bij Aziana ben je welkom voor sushi, vis, steak en Asian fusion.',
      cuisine: 'Van sushi die pas wordt gesneden wanneer je bestelt en kleurrijke poke bowls tot vis van de grill en vertrouwde Chinees-Indonesische gerechten: ons menu vertelt een familieverhaal uit Philipsburg.',
      gallery: 'Kleurrijke rolls, goedgevulde bowls en gerechten om samen te delen — met de jachthaven op de achtergrond.',
      story1: 'Ons verhaal begon in 1995. Molly en Mario openden Old Captain in Great Bay en lieten Philipsburg kennismaken met sushi en de Chinees-Indonesische keuken.',
      story2: 'De familietraditie groeide verder in de restaurants die volgden. Sinds 2018 heeft ze bij Bobby\'s Marina een nieuw thuis: Aziana.',
      bar: 'Begin de avond met een drankje, blijf na het diner nog gezellig zitten of kom gewoon langs voor een ontspannen avond in Philipsburg.',
      events: 'Vier een verjaardag, bedrijfsdiner of besloten samenzijn bij ons — binnen, op de veranda of vlak bij de jachthaven.',
      hoursNote: 'De bar kan later openblijven. Neem contact met ons op voor de actuele tijden van vandaag.'
    },
    fr: {
      hero: 'Envie de sushis, de poisson frais, d’un steak ou d’un poke bowl ? Aziana vous accueille aussi avec les spécialités sino-indonésiennes qui font partie de notre histoire familiale, au bord de la marina.',
      setting: 'Installez-vous dans notre salle chaleureuse aux poutres de bois, avec la marina juste derrière les fenêtres. L’endroit se prête aussi bien à un déjeuner de sushis qu’à un dîner en famille ou une soirée entre amis.',
      welcome: 'Que vous visitiez Philipsburg, reveniez d’une sortie en mer ou cherchiez simplement une bonne table, Aziana vous reçoit autour de sushis, poissons, grillades et cuisine fusion asiatique.',
      cuisine: 'Sushis préparés à la commande, poke bowls colorés, poissons grillés et recettes sino-indonésiennes : notre carte fait vivre une tradition familiale née à Philipsburg.',
      gallery: 'Des rolls hauts en couleur, des bowls généreux et des assiettes à partager, avec la marina en toile de fond.',
      story1: 'Notre histoire commence en 1995, lorsque Molly et Mario ouvrent Old Captain à Great Bay et font découvrir à Philipsburg les sushis et la cuisine sino-indonésienne.',
      story2: 'Cette tradition familiale s’est poursuivie au fil des restaurants. Depuis 2018, elle a trouvé une nouvelle maison à Bobby\'s Marina : Aziana.',
      bar: 'Commencez la soirée autour d’un verre, prolongez le dîner ou venez simplement profiter d’un moment détendu à Philipsburg.',
      events: 'Réunissez vos proches ou vos collègues pour un anniversaire, un dîner d’entreprise ou une fête privée — en salle, sur la terrasse ou près de la marina.',
      hoursNote: 'Le bar peut rester ouvert plus tard. Contactez-nous pour connaître les horaires du jour.'
    },
    es: {
      hero: '¿Te apetece sushi, pescado fresco, un buen filete o un poke bowl? En Aziana también encontrarás los sabores chino-indonesios que forman parte de nuestra historia familiar, junto a la marina.',
      setting: 'Ponte cómodo en nuestro salón de vigas de madera, con la marina al otro lado de las ventanas. Es un lugar tranquilo para almorzar sushi, cenar en familia o pasar la noche entre amigos.',
      welcome: 'Ya sea que estés recorriendo Philipsburg, regreses de un día en el mar o simplemente quieras comer bien, Aziana te espera con sushi, mariscos, carnes y cocina fusión asiática.',
      cuisine: 'Sushi preparado al momento, poke bowls llenos de color, pescados a la parrilla y recetas chino-indonesias: nuestra carta mantiene viva una tradición familiar de Philipsburg.',
      gallery: 'Rolls llenos de color, bowls generosos y platos para compartir, con la marina como escenario.',
      story1: 'Nuestra historia comenzó en 1995, cuando Molly y Mario abrieron Old Captain en Great Bay y dieron a conocer en Philipsburg el sushi y la cocina chino-indonesia.',
      story2: 'La tradición familiar siguió creciendo con los restaurantes que vinieron después. Desde 2018 tiene un nuevo hogar en Bobby\'s Marina: Aziana.',
      bar: 'Empieza la noche con una copa, quédate después de cenar o ven simplemente a disfrutar de una velada relajada en Philipsburg.',
      events: 'Celebra un cumpleaños, una cena de empresa o una reunión privada — dentro, en la terraza o junto a la marina.',
      hoursNote: 'El bar puede cerrar más tarde. Contáctanos para confirmar el horario de hoy.'
    }
  };

  const blocks = {
    hero: '.hero-content > p', setting: '#setting .lede', welcome: '#setting .prose',
    cuisine: '#cuisine > .wrap > .lede', gallery: '#gallery .gallery-heading > .lede',
    story1: '#story .prose p:first-child', story2: '#story .prose p:last-child',
    bar: '#bar .lede', events: '#events > .wrap > .lede', hoursNote: '.hours-note'
  };

  function language() {
    try {
      const saved = localStorage.getItem('aziana.lang');
      if (supported.includes(saved)) return saved;
      const browser = (navigator.language || '').slice(0, 2).toLowerCase();
      return supported.includes(browser) ? browser : 'en';
    } catch (_) { return 'en'; }
  }

  function apply(lang) {
    const locale = supported.includes(lang) ? lang : 'en';
    Object.entries(blocks).forEach(([key, selector]) => {
      const node = document.querySelector(selector);
      if (node) node.textContent = copy[locale][key];
    });
  }

  function boot() {
    apply(language());
    const selector = document.getElementById('az-lang');
    if (selector) selector.addEventListener('change', event => apply(event.target.value));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
