/* Catering page copy is authored as four peer documents. Long-form visitor copy is not
   derived from English string replacements. Business facts and integration URLs stay in HTML/data. */
(function () {
  const supported = ['en', 'nl', 'fr', 'es'];
  const copy = {
    en: {
      title: "Events and Catering in Sint Maarten | Aziana Bobby's Marina",
      description: "Plan private dinners, company meals, birthday dinners, group dining and catering with Aziana at Bobby's Marina in Philipsburg, Sint Maarten.",
      ogTitle: 'Events and Catering in Sint Maarten | Aziana',
      ogDescription: "Private dinners, company meals, birthdays, sushi platters, snack platters and group dining at Bobby's Marina.",
      language: 'Language', back: '← Back to Aziana', heading: 'Events & Catering in Sint Maarten',
      lede: "Planning a birthday, company dinner or private get-together? Aziana brings people together over sushi, snack platters, seafood and Asian fusion dishes at Bobby's Marina. Tell us what you have in mind and we will help shape the occasion.",
      email: 'Send Event Inquiry', whatsapp: 'WhatsApp Event Request', menu: 'View Menu PDF',
      companyTitle: 'Company Dinners', company: 'Mark the end of the year, thank your team or gather colleagues around a relaxed shared meal by the marina.',
      foodTitle: 'Food for Sharing', food: 'Choose from sushi combinations, snack platters, satay, seafood and Asian fusion dishes, with options suited to the size and style of your group.',
      flowTitle: 'Start with a Conversation', flow: 'Share your date, guest count, preferred time, budget and food preferences. We will follow up directly to discuss what works best.',
      related: 'Related options', contactTitle: 'Contact Aziana', contact: 'For same-day questions, reservations, catering, private events or group dinners, contact Aziana directly.',
      eventText: 'Hi Aziana, I would like to ask about an event or group dinner. Date:  Guests:  Budget:  Preferred food:  Contact name: ',
      emailSubject: 'Events & Catering Inquiry', emailBody: 'Event date:\nGuest count:\nPreferred time:\nBudget:\nFood preferences:\nEvent type:\nContact name:\nContact number:',
      campaigns: {
        'events-catering': ['evergreen', 'Events and Catering', "Private dinners, company meals, group dinners, sushi platters and snack platters at Bobby's Marina."],
        'company-groups': ['holiday season', 'Company Dinners and Groups', 'Plan a year-end dinner or group meal with shared plates, sushi, seafood and Asian fusion dishes.'],
        'summer-groups': ['summer', 'Easy Group Dining', 'Share sushi combinations and generous plates in a relaxed marina setting with family, friends or colleagues.']
      }
    },
    nl: {
      title: "Feesten en catering op Sint Maarten | Aziana Bobby's Marina",
      description: "Organiseer een verjaardag, bedrijfsdiner, besloten diner of groepsmaaltijd bij Aziana in Bobby's Marina, Philipsburg, Sint Maarten.",
      ogTitle: 'Feesten en catering op Sint Maarten | Aziana',
      ogDescription: "Bedrijfsdiners, verjaardagen, besloten bijeenkomsten en schalen om te delen bij Bobby's Marina.",
      language: 'Taal', back: '← Terug naar Aziana', heading: 'Feesten & catering op Sint Maarten',
      lede: 'Iets te vieren of met een groep uit eten? Bij Aziana komt iedereen samen rond sushi, borrelhapjes, vis en Asian fusion aan Bobby’s Marina. Vertel ons wat je voor ogen hebt; dan denken we graag mee over een passende invulling.',
      email: 'Vraag een arrangement aan', whatsapp: 'Stuur een WhatsApp', menu: 'Bekijk het menu (pdf)',
      companyTitle: 'Bedrijfsdiners', company: 'Sluit het jaar samen af, bedank je team of nodig collega’s uit voor een ontspannen diner met gedeelde gerechten aan de jachthaven.',
      foodTitle: 'Samen delen', food: 'Kies uit sushicombinaties, snackschalen, saté, vis en Asian fusion. We stemmen de mogelijkheden af op de grootte en sfeer van je gezelschap.',
      flowTitle: 'Vertel ons je plannen', flow: 'Stuur je datum, het aantal gasten, de gewenste tijd, je budget en eetwensen. We nemen rechtstreeks contact met je op om de mogelijkheden te bespreken.',
      related: 'Misschien ook interessant', contactTitle: 'Neem contact op met Aziana', contact: 'Voor vragen op dezelfde dag, reserveringen, catering, besloten feesten of groepsdiners kun je rechtstreeks contact opnemen met Aziana.',
      eventText: 'Hallo Aziana, ik wil graag informeren naar een feest of groepsdiner. Datum:  Aantal gasten:  Budget:  Eetwensen:  Naam: ',
      emailSubject: 'Aanvraag feest of catering', emailBody: 'Datum:\nAantal gasten:\nGewenste tijd:\nBudget:\nEetwensen:\nSoort gelegenheid:\nNaam:\nTelefoonnummer:',
      campaigns: {
        'events-catering': ['het hele jaar', 'Feesten en catering', 'Besloten diners, bedrijfsmaaltijden, groepsdiners en schalen met sushi of snacks bij Bobby’s Marina.'],
        'company-groups': ['feestdagen', 'Bedrijfsdiners en groepen', 'Plan een eindejaarsdiner of groepsmaaltijd met gedeelde gerechten, sushi, vis en Asian fusion.'],
        'summer-groups': ['zomer', 'Ontspannen eten met een groep', 'Deel sushicombinaties en goedgevulde schalen met familie, vrienden of collega’s aan de jachthaven.']
      }
    },
    fr: {
      title: "Événements et service traiteur à Sint Maarten | Aziana Bobby's Marina",
      description: "Organisez un anniversaire, un dîner d'entreprise, un repas privé ou une réception avec Aziana à Bobby's Marina, Philipsburg, Sint Maarten.",
      ogTitle: 'Événements et service traiteur à Sint Maarten | Aziana',
      ogDescription: "Dîners d'entreprise, anniversaires, réceptions privées et plats à partager à Bobby's Marina.",
      language: 'Langue', back: '← Retour à Aziana', heading: 'Événements & service traiteur à Sint Maarten',
      lede: 'Un anniversaire, un dîner d’entreprise ou un moment privé à organiser ? Aziana réunit vos invités autour de sushis, plateaux à partager, poissons et cuisine fusion asiatique à Bobby’s Marina. Parlez-nous de votre projet : nous vous aiderons à imaginer une formule adaptée.',
      email: 'Demander des renseignements', whatsapp: 'Écrire sur WhatsApp', menu: 'Voir la carte (PDF)',
      companyTitle: "Dîners d'entreprise", company: 'Fêtez la fin de l’année, remerciez votre équipe ou retrouvez vos collègues autour d’un repas convivial à partager, face à la marina.',
      foodTitle: 'À partager', food: 'Composez votre repas avec des assortiments de sushis, des plateaux salés, des satays, du poisson et des plats fusion asiatiques, selon le nombre d’invités et l’esprit souhaité.',
      flowTitle: 'Commençons par échanger', flow: 'Indiquez-nous la date, le nombre de personnes, l’horaire souhaité, votre budget et vos préférences. Nous vous répondrons directement pour préciser les possibilités.',
      related: 'D’autres idées', contactTitle: 'Contacter Aziana', contact: 'Pour une question le jour même, une réservation, un service traiteur, une réception privée ou un dîner de groupe, contactez directement Aziana.',
      eventText: 'Bonjour Aziana, je souhaite me renseigner pour un événement ou un dîner de groupe. Date :  Nombre de personnes :  Budget :  Préférences :  Nom : ',
      emailSubject: 'Demande pour un événement ou service traiteur', emailBody: "Date :\nNombre de personnes :\nHoraire souhaité :\nBudget :\nPréférences :\nType d’événement :\nNom :\nTéléphone :",
      campaigns: {
        'events-catering': ['toute l’année', 'Événements et service traiteur', 'Dîners privés, repas d’entreprise, groupes et plateaux de sushis ou de bouchées à Bobby’s Marina.'],
        'company-groups': ['fêtes de fin d’année', 'Dîners d’entreprise et groupes', 'Organisez un dîner de fin d’année ou un repas de groupe autour de plats à partager, sushis, poissons et cuisine fusion asiatique.'],
        'summer-groups': ['été', 'Repas de groupe en toute simplicité', 'Partagez des assortiments de sushis et des assiettes généreuses en famille, entre amis ou collègues, au bord de la marina.']
      }
    },
    es: {
      title: "Eventos y catering en Sint Maarten | Aziana Bobby's Marina",
      description: "Organiza cumpleaños, cenas de empresa, celebraciones privadas y comidas de grupo con Aziana en Bobby's Marina, Philipsburg, Sint Maarten.",
      ogTitle: 'Eventos y catering en Sint Maarten | Aziana',
      ogDescription: "Cenas de empresa, cumpleaños, celebraciones privadas y platos para compartir en Bobby's Marina.",
      language: 'Idioma', back: '← Volver a Aziana', heading: 'Eventos & catering en Sint Maarten',
      lede: '¿Estás preparando un cumpleaños, una cena de empresa o una celebración privada? En Aziana reunimos a tus invitados alrededor de sushi, bandejas para compartir, mariscos y cocina fusión asiática en Bobby’s Marina. Cuéntanos tu idea y te ayudaremos a darle forma.',
      email: 'Consultar por un evento', whatsapp: 'Escribir por WhatsApp', menu: 'Ver el menú en PDF',
      companyTitle: 'Cenas de empresa', company: 'Celebra el cierre del año, agradece a tu equipo o reúne a tus compañeros para compartir una comida tranquila junto a la marina.',
      foodTitle: 'Platos para compartir', food: 'Elige combinaciones de sushi, bandejas de aperitivos, satay, mariscos y platos de fusión asiática según el tamaño del grupo y el ambiente que buscas.',
      flowTitle: 'Cuéntanos tus planes', flow: 'Envíanos la fecha, el número de invitados, la hora preferida, el presupuesto y las preferencias de comida. Te responderemos directamente para hablar de las opciones.',
      related: 'Otras opciones', contactTitle: 'Contacta con Aziana', contact: 'Para consultas del mismo día, reservas, catering, eventos privados o cenas de grupo, contacta directamente con Aziana.',
      eventText: 'Hola Aziana, quisiera consultar sobre un evento o una cena de grupo. Fecha:  Invitados:  Presupuesto:  Preferencias:  Nombre: ',
      emailSubject: 'Consulta sobre evento o catering', emailBody: 'Fecha:\nNúmero de invitados:\nHora preferida:\nPresupuesto:\nPreferencias de comida:\nTipo de evento:\nNombre:\nTeléfono:',
      campaigns: {
        'events-catering': ['todo el año', 'Eventos y catering', 'Cenas privadas, comidas de empresa, grupos y bandejas de sushi o aperitivos en Bobby’s Marina.'],
        'company-groups': ['temporada festiva', 'Cenas de empresa y grupos', 'Organiza una cena de fin de año o una comida de grupo con platos para compartir, sushi, mariscos y cocina fusión asiática.'],
        'summer-groups': ['verano', 'Comer en grupo sin complicaciones', 'Comparte combinaciones de sushi y platos generosos con familia, amigos o compañeros junto a la marina.']
      }
    }
  };

  const selectors = {
    back: '.back', heading: '.hero h1', lede: '.hero .lede', email: '[data-auto-event-email]', whatsapp: '[data-auto-event-whatsapp]', menu: '[data-az-action="menu"]',
    companyTitle: '.grid .card:nth-child(1) h2', company: '.grid .card:nth-child(1) p', foodTitle: '.grid .card:nth-child(2) h2', food: '.grid .card:nth-child(2) p',
    flowTitle: '.grid .card:nth-child(3) h2', flow: '.grid .card:nth-child(3) p', related: '[data-auto-campaigns] > h2'
  };

  function initialLanguage() {
    const query = new URLSearchParams(location.search).get('lang');
    if (supported.includes(query)) return query;
    try { const saved = localStorage.getItem('aziana.lang'); if (supported.includes(saved)) return saved; } catch (_) {}
    const browser = (navigator.language || '').slice(0, 2).toLowerCase();
    return supported.includes(browser) ? browser : 'en';
  }

  function setMeta(name, value, property) {
    const node = document.querySelector(`meta[${property ? 'property' : 'name'}="${name}"]`);
    if (node) node.setAttribute('content', value);
  }

  function apply(lang) {
    const locale = supported.includes(lang) ? lang : 'en';
    const c = copy[locale];
    document.documentElement.lang = locale;
    document.title = c.title;
    setMeta('description', c.description);
    setMeta('og:title', c.ogTitle, true);
    setMeta('og:description', c.ogDescription, true);
    Object.entries(selectors).forEach(([key, selector]) => { const node = document.querySelector(selector); if (node) node.textContent = c[key]; });
    const label = document.querySelector('.language-control span'); if (label) label.textContent = c.language;
    const contact = document.querySelector('[data-auto-contact]');
    if (contact) {
      const heading = contact.querySelector('h2'); const text = contact.querySelector('p');
      if (heading) heading.textContent = c.contactTitle;
      if (text) text.textContent = c.contact;
    }
    document.querySelectorAll('[data-campaign-id]').forEach(card => {
      const campaign = c.campaigns[card.dataset.campaignId];
      if (!campaign) return;
      const season = card.querySelector('small'); const title = card.querySelector('h3 a'); const summary = card.querySelector('p');
      if (season) season.textContent = campaign[0];
      if (title) title.textContent = campaign[1];
      if (summary) summary.textContent = campaign[2];
    });
    const email = document.querySelector('[data-auto-event-email]');
    const whatsapp = document.querySelector('[data-auto-event-whatsapp]');
    if (email) { const url = new URL(email.href); url.searchParams.set('subject', c.emailSubject); url.searchParams.set('body', c.emailBody); email.href = url.href; }
    if (whatsapp) { const url = new URL(whatsapp.href); url.searchParams.set('text', c.eventText); whatsapp.href = url.href; }
    const selector = document.getElementById('az-catering-lang'); if (selector) selector.value = locale;
  }

  function boot() {
    let language = initialLanguage();
    apply(language);
    document.addEventListener('aziana:content-ready', () => apply(language));
    const selector = document.getElementById('az-catering-lang');
    if (selector) selector.addEventListener('change', event => {
      language = supported.includes(event.target.value) ? event.target.value : 'en';
      try { localStorage.setItem('aziana.lang', language); } catch (_) {}
      apply(language);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
