(() => {
  const today = new Date();
  const todayISO = today.toISOString().slice(0, 10);
  const monthDay = todayISO.slice(5);
  const $all = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const sendEvent = (name, data = {}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...data });
    if (window.cloudflareWebAnalytics) {
      try { window.cloudflareWebAnalytics.track(name, data); } catch (_) {}
    }
  };

  const encode = (value) => encodeURIComponent(value || '');

  const isActive = (item) => {
    if (item.active === false) return false;
    if (item.annual) {
      const from = item.showFromMonthDay || '01-01';
      const until = item.showUntilMonthDay || '12-31';
      return from <= until ? (from <= monthDay && monthDay <= until) : (monthDay >= from || monthDay <= until);
    }
    const from = item.showFrom || '2000-01-01';
    const until = item.showUntil || '2999-12-31';
    return from <= todayISO && todayISO <= until;
  };

  const isUpcoming = (item) => {
    if (item.active === false) return false;
    if (!item.annual) return item.showFrom && item.showFrom > todayISO;
    const from = item.showFromMonthDay || '01-01';
    const until = item.showUntilMonthDay || '12-31';
    if (from <= until) return monthDay < from;
    return false;
  };

  const applyYear = () => {
    $all('[data-auto-year], #copyYear').forEach(el => { el.textContent = String(today.getFullYear()); });
  };

  const applyActionButtons = (siteData) => {
    const b = siteData.business || {};
    $all('[data-az-action="order"], .glf-button').forEach(btn => {
      if (btn.tagName === 'BUTTON') {
        btn.classList.add('glf-button');
        btn.dataset.glfCuid = b.orderCuid || btn.dataset.glfCuid || '';
        btn.dataset.glfRuid = b.orderRuid || btn.dataset.glfRuid || '';
      }
    });
    $all('[data-az-action="reserve"]').forEach(btn => {
      btn.classList.add('glf-button');
      btn.dataset.glfReservation = 'true';
      btn.dataset.glfCuid = b.orderCuid || btn.dataset.glfCuid || '';
      btn.dataset.glfRuid = b.orderRuid || btn.dataset.glfRuid || '';
    });
    $all('[data-az-action="menu"]').forEach(a => { if (b.menuPdf) a.href = b.menuPdf; });
    $all('[data-az-action="whatsapp"]').forEach(a => { if (b.whatsappHref) a.href = b.whatsappHref; });
    $all('[data-az-action="email"]').forEach(a => { if (b.email) a.href = `mailto:${b.email}`; });
  };

  const applyContactBlocks = (siteData) => {
    const b = siteData.business || {};
    $all('[data-auto-contact]').forEach(block => {
      block.innerHTML = `<h2>Contact Aziana</h2>
        <p>For same-day questions, reservations, catering, private events or group dinners, contact Aziana directly.</p>
        <p><a href="${b.phoneHref}">${b.phone}</a> · <a href="${b.whatsappHref}">WhatsApp ${b.whatsapp}</a> · <a href="mailto:${b.email}">${b.email}</a></p>`;
    });
  };

  const applyInquiryLinks = (siteData) => {
    const b = siteData.business || {};
    const templates = siteData.inquiryTemplates || {};
    const eventText = templates.eventWhatsApp || 'Hi Aziana, I would like to ask about an event or group dinner. Date:  Guests:  Budget: ';
    const eventBody = templates.eventEmailBody || 'Event date:\nGuest count:\nPreferred time:\nBudget:\nFood preferences:\nContact number:';

    $all('[data-auto-event-whatsapp]').forEach(a => {
      a.href = `${b.whatsappHref}?text=${encode(eventText)}`;
    });
    $all('[data-auto-event-email]').forEach(a => {
      a.href = `mailto:${b.email}?subject=${encode('Events & Catering Inquiry')}&body=${encode(eventBody)}`;
    });
    $all('[data-auto-general-whatsapp]').forEach(a => {
      a.href = `${b.whatsappHref}?text=${encode(templates.generalWhatsApp || 'Hi Aziana, I have a question.')}`;
    });
  };

  const getCampaigns = (campaignData, state = 'active') => {
    const campaigns = campaignData.campaigns || [];
    if (state === 'upcoming') return campaigns.filter(isUpcoming);
    if (state === 'all') return campaigns.filter(c => c.active !== false);
    return campaigns.filter(isActive);
  };

  const campaignCard = (c) => `<article class="campaign-card">
    <small>${c.season || 'Aziana'}</small>
    <h3><a href="${c.href}">${c.title}</a></h3>
    <p>${c.summary}</p>
  </article>`;

  const renderCampaigns = (campaignData) => {
    const pageKey = (document.body.dataset.page || location.pathname.split('/').pop().replace('.html','') || 'home');
    $all('[data-auto-campaigns]').forEach(section => {
      const list = section.querySelector('.auto-campaign-list') || section;
      const mode = section.dataset.autoCampaigns || 'active';
      let items = getCampaigns(campaignData, mode === 'upcoming' ? 'upcoming' : 'active');
      if (mode === 'all') items = getCampaigns(campaignData, 'all');
      if (mode === 'relevant') {
        const relevant = items.filter(c => (c.tags || []).includes(pageKey));
        items = relevant.length ? relevant : items.slice(0, 2);
      }
      list.innerHTML = items.slice(0, Number(section.dataset.limit || 3)).map(campaignCard).join('');
      if (!items.length) section.hidden = true;
    });
  };

  const renderSeasonLabel = (campaignData) => {
    const active = getCampaigns(campaignData, 'active');
    const label = active[0]?.season || 'Aziana';
    $all('[data-auto-season-label]').forEach(el => { el.textContent = label; });
  };

  const trackClicks = () => {
    document.addEventListener('click', (event) => {
      const target = event.target.closest('a,button');
      if (!target) return;
      const label = (target.textContent || target.href || '').trim().slice(0, 80);
      const href = target.href || '';
      if (target.classList.contains('glf-button') || target.dataset.azAction) sendEvent('aziana_cta_click', { label, href, action: target.dataset.azAction || 'gloriafood', page: document.body.dataset.page || location.pathname });
      if (href.includes('wa.me')) sendEvent('aziana_whatsapp_click', { label, href, page: location.pathname });
      if (href.includes('mailto:')) sendEvent('aziana_email_click', { label, href, page: location.pathname });
      if (href.includes('/menus/') || href.endsWith('.pdf')) sendEvent('aziana_menu_pdf_click', { label, href, page: location.pathname });
      if (href.includes('tel:')) sendEvent('aziana_phone_click', { label, href, page: location.pathname });
    }, { passive: true });
  };

  const init = async () => {
    applyYear();
    trackClicks();

    const [siteData, campaignData] = await Promise.all([
      fetch('/site-data.json').then(r => r.ok ? r.json() : {}).catch(() => ({})),
      fetch('/campaign-config.json').then(r => r.ok ? r.json() : {}).catch(() => ({}))
    ]);

    applyActionButtons(siteData);
    applyContactBlocks(siteData);
    applyInquiryLinks(siteData);
    renderCampaigns(campaignData);
    renderSeasonLabel(campaignData);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
