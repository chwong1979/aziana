// Odarius App Suite analytics (GA4)
// Tenant-neutral helper used for suite-level traffic measurement.
(function () {
  var id = 'G-8EXGF5H9C4';
  if (typeof window === 'undefined' || window.__odariusAnalyticsInstalled) return;
  window.__odariusAnalyticsInstalled = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
  document.head.appendChild(s);
  window.gtag('js', new Date());
  window.gtag('config', id);
})();
