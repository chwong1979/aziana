(() => {
  const today = new Date();
  const todayISO = today.toISOString().slice(0, 10);
  const $all = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const sendEvent = (name, data = {}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...data });
    if (window.cloudflareWebAnalytics) {
      try { window.cloudflareWebAnalytics.track(name, data); } catch (_) {}
    }
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
  };

  const applyContactBlocks = (siteData) => {
    const b = siteData.business || {};
    $all('[data-auto-contact]').forEach(block => {
      block.innerHTML = `<h2>Contact Aziana</h2>
        <p>For same-day questions, reservations, catering, private events or group dinners, contact Aziana directly.</p>
        <p><a href="${b.phoneHref}">${b.phone}</a> · <a href="${b.whatsappHref}">WhatsApp ${b.whatsapp}</a> · <a href="mailto:${b.email}">${b.email}</a></p>`;
    });
  };

  const activeCampaigns = (campaignData) => {
    return (campaignData.campaigns || []).filter(c => {
      const from = c.showFrom || '2000-01-01';
      const until = c.showUntil || '2999-12-31';
      return from <= todayISO && todayISO <= until;
    });
  };

  const renderCampaigns = (campaignData) => {
    const pageKey = (document.body.dataset.page || location.pathname.split('/').pop().replace('.html','') || 'home');
    $all('[data-auto-campaigns]').forEach(section => {
      const list = section.querySelector('.auto-campaign-list') || section;
      const mode = section.dataset.autoCampaigns;
      let items = activeCampaigns(campaignData);
      if (mode === 'relevant') {
        const relevant = items.filter(c => (c.tags || []).includes(pageKey));
        items = relevant.length ? relevant : items.slice(0, 2);
      }
      list.innerHTML = items.slice(0, 3).map(c => `<article class="campaign-card">
        <small>${c.season || 'Aziana'}</small>
        <h3><a href="${c.href}">${c.title}</a></h3>
        <p>${c.summary}</p>
      </article>`).join('');
      if (!items.length) section.hidden = true;
    });
  };

  const trackClicks = () => {
    document.addEventListener('click', (event) => {
      const target = event.target.closest('a,button');
      if (!target) return;
      const label = (target.textContent || target.href || '').trim().slice(0, 80);
      const href = target.href || '';
      if (target.classList.contains('glf-button') || target.dataset.azAction) sendEvent('aziana_cta_click', { label, href, action: target.dataset.azAction || 'gloriafood' });
      if (href.includes('wa.me')) sendEvent('aziana_whatsapp_click', { label, href });
      if (href.includes('mailto:')) sendEvent('aziana_email_click', { label, href });
      if (href.includes('/menus/') || href.endsWith('.pdf')) sendEvent('aziana_menu_pdf_click', { label, href });
      if (href.includes('tel:')) sendEvent('aziana_phone_click', { label, href });
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
    renderCampaigns(campaignData);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();