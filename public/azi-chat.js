/* ============================================================
   Aziana — "Azi" public chat widget  (self-contained, embeddable)
   Brain stays in AIOS: POST https://ai.odarius.com/public/advisor
   No login · FAQ-first · Haiku-pinned · per-IP rate limited server-side
   v0.1.1 — compact content-hugging panel, slim header
   ============================================================ */
(function () {
  if (window.__aziChat) return;          // guard against double-load
  window.__aziChat = true;

  var ENDPOINT  = 'https://ai.odarius.com/public/advisor';
  var WA_URL    = 'https://wa.me/17215880022';
  var WA_LABEL  = 'WhatsApp · +1 (721) 588-0022';
  var TEL_URL   = 'tel:+17215426988';
  var TEL_LABEL = 'Call · +1 (721) 542-6988';

  var GREETING = "Hi, I'm Azi — Aziana's assistant. Ask me about our hours, the menu, or making a reservation.";
  var CHIPS = ['What are your hours?', 'Do you have vegetarian sushi?', 'How do I make a reservation?'];

  var history = [];   // {role, content} — last 6 sent to the brain
  var busy = false;
  var started = false;
  var typingRow = null;

  var ICON_CHAT = '<svg viewBox="0 0 24 24" fill="none" stroke="#f3ece0" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>';
  var ICON_SEND = '<svg viewBox="0 0 24 24" fill="none" stroke="#2c0527" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="6 11 12 5 18 11"/></svg>';

  /* ---------- scoped styles ---------- */
  var css = [
    '#azi-chat-root *{box-sizing:border-box;}',
    '#azi-launcher{position:fixed;right:20px;bottom:20px;width:60px;height:60px;border-radius:50%;border:none;cursor:pointer;z-index:2147483000;background:linear-gradient(145deg,#7b0046,#2c0527);box-shadow:0 8px 28px rgba(44,5,39,.45);display:flex;align-items:center;justify-content:center;transition:transform .2s ease,box-shadow .2s ease;}',
    '#azi-launcher:hover{transform:translateY(-2px) scale(1.04);box-shadow:0 12px 34px rgba(123,0,70,.5);}',
    '#azi-launcher svg{width:28px;height:28px;}',
    '#azi-launcher .azi-dot{position:absolute;top:11px;right:11px;width:9px;height:9px;border-radius:50%;background:#ef8b17;box-shadow:0 0 0 2px #2c0527;}',
    '#azi-panel{position:fixed;right:20px;bottom:90px;width:min(360px,calc(100vw - 32px));max-height:min(72vh,500px);background:#15121a;border:1px solid rgba(243,236,224,.12);border-radius:16px;overflow:hidden;z-index:2147483001;display:none;flex-direction:column;box-shadow:0 24px 60px rgba(0,0,0,.55);font-family:"Inter",-apple-system,BlinkMacSystemFont,sans-serif;color:#f3ece0;opacity:0;transform:translateY(12px) scale(.98);transition:opacity .22s ease,transform .22s ease;}',
    '#azi-panel.azi-open{display:flex;opacity:1;transform:none;}',
    '.azi-head{display:flex;align-items:center;gap:10px;padding:9px 13px;background:linear-gradient(135deg,#7b0046,#2c0527);border-bottom:1px solid rgba(239,139,23,.25);}',
    '.azi-avatar{width:32px;height:32px;border-radius:50%;flex:0 0 32px;background:radial-gradient(circle at 32% 30%,#9b1968,#7b0046);display:flex;align-items:center;justify-content:center;font-family:"Cormorant Garamond",Georgia,serif;font-size:19px;font-weight:600;color:#f3ece0;border:1px solid rgba(243,236,224,.28);}',
    '.azi-head-meta{flex:1;min-width:0;}',
    '.azi-head-meta b{font-family:"Cormorant Garamond",Georgia,serif;font-weight:600;font-size:16px;line-height:1.1;display:block;}',
    '.azi-head-meta span{font-size:9.5px;letter-spacing:.15em;text-transform:uppercase;color:rgba(243,236,224,.65);}',
    '.azi-close{background:none;border:none;color:rgba(243,236,224,.8);cursor:pointer;font-size:24px;line-height:1;padding:2px 6px;border-radius:8px;}',
    '.azi-close:hover{color:#fff;background:rgba(255,255,255,.12);}',
    '.azi-msgs{flex:1 1 auto;min-height:0;overflow-y:auto;padding:14px 14px;display:flex;flex-direction:column;gap:10px;}',
    '.azi-msgs::-webkit-scrollbar{width:7px;}',
    '.azi-msgs::-webkit-scrollbar-thumb{background:rgba(243,236,224,.14);border-radius:4px;}',
    '.azi-row{display:flex;width:100%;}',
    '.azi-row.azi-user{justify-content:flex-end;}',
    '.azi-col{display:flex;flex-direction:column;gap:8px;max-width:90%;}',
    '.azi-bubble{padding:10px 14px;border-radius:14px;font-size:14.5px;line-height:1.5;white-space:pre-wrap;word-wrap:break-word;}',
    '.azi-bot .azi-bubble{background:#1d1923;border:1px solid rgba(243,236,224,.08);border-top-left-radius:4px;}',
    '.azi-user .azi-bubble{background:#7b0046;color:#fff;border-top-right-radius:4px;}',
    '.azi-chips{display:flex;flex-wrap:wrap;gap:8px;}',
    '.azi-chip{background:rgba(239,139,23,.1);border:1px solid rgba(239,139,23,.4);color:#f9a440;padding:7px 12px;border-radius:999px;font-size:13px;cursor:pointer;font-family:inherit;transition:background .15s ease;}',
    '.azi-chip:hover{background:rgba(239,139,23,.2);}',
    '.azi-actions{display:flex;flex-wrap:wrap;gap:8px;}',
    '.azi-action{display:inline-flex;align-items:center;gap:6px;text-decoration:none;font-size:12.5px;font-weight:500;padding:8px 12px;border-radius:10px;border:1px solid rgba(243,236,224,.2);color:#f3ece0;}',
    '.azi-action.azi-wa{background:rgba(37,211,102,.14);border-color:rgba(37,211,102,.5);}',
    '.azi-action.azi-call{background:rgba(239,139,23,.14);border-color:rgba(239,139,23,.5);}',
    '.azi-action:hover{filter:brightness(1.15);}',
    '.azi-typing{display:flex;gap:5px;align-items:center;}',
    '.azi-typing i{width:7px;height:7px;border-radius:50%;background:#877d8a;animation:azi-bounce 1.2s infinite ease-in-out;}',
    '.azi-typing i:nth-child(2){animation-delay:.15s;}',
    '.azi-typing i:nth-child(3){animation-delay:.3s;}',
    '@keyframes azi-bounce{0%,60%,100%{transform:translateY(0);opacity:.5;}30%{transform:translateY(-5px);opacity:1;}}',
    '.azi-input{display:flex;gap:8px;padding:12px;border-top:1px solid rgba(243,236,224,.1);align-items:flex-end;}',
    '.azi-input textarea{flex:1;resize:none;background:#1d1923;border:1px solid rgba(243,236,224,.14);border-radius:12px;color:#f3ece0;font-family:inherit;font-size:14px;padding:10px 12px;max-height:96px;line-height:1.4;outline:none;}',
    '.azi-input textarea:focus{border-color:rgba(239,139,23,.6);}',
    '.azi-send{flex:0 0 auto;width:40px;height:40px;border-radius:11px;border:none;cursor:pointer;background:linear-gradient(145deg,#ef8b17,#d2740a);display:flex;align-items:center;justify-content:center;transition:transform .15s ease,opacity .15s ease;}',
    '.azi-send svg{width:18px;height:18px;}',
    '.azi-send:disabled{opacity:.4;cursor:default;}',
    '.azi-send:not(:disabled):hover{transform:scale(1.06);}',
    '.azi-foot{text-align:center;font-size:10.5px;color:#877d8a;padding:0 14px 10px;}',
    '@media (max-width:480px){#azi-panel{right:12px;left:12px;width:auto;bottom:80px;max-height:calc(100dvh - 92px);}#azi-launcher{right:16px;bottom:16px;}}'
  ].join('');

  /* ---------- inject ---------- */
  var style = document.createElement('style');
  style.id = 'azi-chat-style';
  style.textContent = css;
  document.head.appendChild(style);

  var root = document.createElement('div');
  root.id = 'azi-chat-root';
  root.innerHTML =
    '<button id="azi-launcher" aria-label="Chat with Azi, Aziana assistant" aria-expanded="false">' + ICON_CHAT + '<span class="azi-dot"></span></button>' +
    '<section id="azi-panel" role="dialog" aria-label="Chat with Azi" aria-modal="false">' +
      '<div class="azi-head">' +
        '<div class="azi-avatar" aria-hidden="true">A</div>' +
        '<div class="azi-head-meta"><b>Azi</b><span>Aziana Assistant</span></div>' +
        '<button class="azi-close" aria-label="Close chat">&times;</button>' +
      '</div>' +
      '<div class="azi-msgs" aria-live="polite"></div>' +
      '<div class="azi-input">' +
        '<textarea rows="1" placeholder="Ask Azi a question\u2026" aria-label="Message"></textarea>' +
        '<button class="azi-send" aria-label="Send" disabled>' + ICON_SEND + '</button>' +
      '</div>' +
      '<div class="azi-foot">Azi can make mistakes \u2014 please confirm bookings by phone.</div>' +
    '</section>';
  document.body.appendChild(root);

  var launcher = root.querySelector('#azi-launcher');
  var panel    = root.querySelector('#azi-panel');
  var msgs     = root.querySelector('.azi-msgs');
  var ta       = root.querySelector('textarea');
  var sendBtn  = root.querySelector('.azi-send');
  var closeBtn = root.querySelector('.azi-close');

  /* ---------- render helpers ---------- */
  function scrollDown(){ msgs.scrollTop = msgs.scrollHeight; }

  function addRow(who){
    var row = document.createElement('div');
    row.className = 'azi-row azi-' + who;
    var col = document.createElement('div');
    col.className = 'azi-col';
    row.appendChild(col);
    msgs.appendChild(row);
    return col;
  }

  function addBubble(col, text){
    var b = document.createElement('div');
    b.className = 'azi-bubble';
    b.textContent = text;
    col.appendChild(b);
  }

  function addUser(text){ var c = addRow('user'); addBubble(c, text); scrollDown(); }
  function addBot(text){ var c = addRow('bot'); addBubble(c, text); scrollDown(); return c; }

  function addContacts(col){
    var wrap = document.createElement('div');
    wrap.className = 'azi-actions';
    var a1 = document.createElement('a');
    a1.className = 'azi-action azi-wa'; a1.href = WA_URL; a1.target = '_blank'; a1.rel = 'noopener';
    a1.textContent = WA_LABEL;
    var a2 = document.createElement('a');
    a2.className = 'azi-action azi-call'; a2.href = TEL_URL;
    a2.textContent = TEL_LABEL;
    wrap.appendChild(a1); wrap.appendChild(a2);
    col.appendChild(wrap);
    scrollDown();
  }

  function addChips(col){
    var wrap = document.createElement('div');
    wrap.className = 'azi-chips';
    CHIPS.forEach(function(q){
      var c = document.createElement('button');
      c.className = 'azi-chip'; c.type = 'button'; c.textContent = q;
      c.addEventListener('click', function(){ send(q); });
      wrap.appendChild(c);
    });
    col.appendChild(wrap);
    scrollDown();
  }

  function showTyping(){
    typingRow = document.createElement('div');
    typingRow.className = 'azi-row azi-bot';
    typingRow.innerHTML = '<div class="azi-col"><div class="azi-bubble azi-typing"><i></i><i></i><i></i></div></div>';
    msgs.appendChild(typingRow); scrollDown();
  }
  function hideTyping(){ if (typingRow){ typingRow.remove(); typingRow = null; } }

  /* ---------- input state ---------- */
  function updateSend(){ sendBtn.disabled = busy || !ta.value.trim(); }
  function setBusy(v){ busy = v; ta.disabled = v; updateSend(); }
  function autoGrow(){ ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 96) + 'px'; }

  function fallbackBubble(){
    var col = addBot("Sorry \u2014 I can't reach our assistant right now. Please reach us directly:");
    addContacts(col);
  }

  /* ---------- talk to the brain ---------- */
  function send(text){
    text = (text || '').trim();
    if (!text || busy) return;
    var chips = msgs.querySelector('.azi-chips');
    if (chips) chips.remove();

    addUser(text);
    ta.value = ''; autoGrow();
    var prior = history.slice(-6);          // last 6 turns for context
    history.push({ role: 'user', content: text });
    setBusy(true); showTyping();

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history: prior })
    })
    .then(function(r){ return r.json().catch(function(){ return null; }); })
    .then(function(data){
      hideTyping();
      if (!data || data.ok === false || !data.text){ fallbackBubble(); return; }
      var col = addBot(data.text);
      history.push({ role: 'assistant', content: data.text });
      if (data.source === 'limit' || data.source === 'fallback'){ addContacts(col); }
    })
    .catch(function(){ hideTyping(); fallbackBubble(); })
    .then(function(){ setBusy(false); ta.focus(); });   // runs after success or error
  }

  /* ---------- open / close ---------- */
  function startConvo(){
    if (started) return;
    started = true;
    var col = addBot(GREETING);
    addChips(col);
  }
  function openPanel(){
    panel.classList.add('azi-open');
    launcher.setAttribute('aria-expanded', 'true');
    var dot = launcher.querySelector('.azi-dot'); if (dot) dot.style.display = 'none';
    startConvo();
    setTimeout(function(){ ta.focus(); }, 250);
  }
  function closePanel(){
    panel.classList.remove('azi-open');
    launcher.setAttribute('aria-expanded', 'false');
  }

  /* ---------- wire up ---------- */
  launcher.addEventListener('click', function(){
    panel.classList.contains('azi-open') ? closePanel() : openPanel();
  });
  closeBtn.addEventListener('click', closePanel);
  ta.addEventListener('input', function(){ autoGrow(); updateSend(); });
  ta.addEventListener('keydown', function(e){
    if (e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); send(ta.value); }
  });
  sendBtn.addEventListener('click', function(){ send(ta.value); });
})();
