(function () {
  'use strict';

  if (document.getElementById('global-ai-assistant') || document.getElementById('assistantDrawer') || document.querySelector('.assistant-fab')) return;

  const style = document.createElement('style');
  style.textContent = `
    #global-ai-assistant { position: fixed; right: 0; top: 20%; z-index: 9998; font-family: Inter, "Microsoft YaHei", sans-serif; touch-action: none; }
    .gaa-rail { width: 68px; height: 150px; display: flex; align-items: center; justify-content: center; padding-left: 7px; border-radius: 32px 0 0 32px; background: linear-gradient(145deg,#dcecff 0%,#a9ccff 100%); box-shadow: 0 8px 24px rgba(37,99,235,.18); }
    .gaa-trigger { width: 52px; min-height: 126px; border: 0; border-radius: 19px; background: rgba(255,255,255,.96); color: #2458ad; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; cursor: pointer; box-shadow: 0 7px 20px rgba(48,91,164,.16); transition: transform .2s ease, box-shadow .2s ease; }
    .gaa-trigger:hover { transform: translateX(-3px); box-shadow: 0 9px 25px rgba(48,91,164,.25); }
    .gaa-trigger:focus-visible { outline: 3px solid rgba(37,99,235,.35); outline-offset: 2px; }
    .gaa-icon { width: 28px; height: 28px; border-radius: 10px; background: #edf4ff; display: grid; place-items: center; font-size: 15px; }
    .gaa-label { writing-mode: vertical-rl; letter-spacing: 3px; font-size: 16px; line-height: 1; font-weight: 700; }
    .gaa-mask { position: fixed; inset: 0; z-index: 9998; background: rgba(15,23,42,.34); opacity: 0; pointer-events: none; transition: opacity .22s ease; }
    .gaa-drawer { position: fixed; z-index: 9999; right: 0; top: 0; width: min(440px, 92vw); height: 100vh; background: #f7f9fc; color: #172033; box-shadow: -12px 0 32px rgba(15,23,42,.2); transform: translateX(105%); transition: transform .25s ease; display: flex; flex-direction: column; }
    .gaa-open .gaa-mask { opacity: 1; pointer-events: auto; }
    .gaa-open .gaa-drawer { transform: translateX(0); }
    .gaa-head { height: 64px; padding: 0 20px; background: #fff; border-bottom: 1px solid #e5eaf1; display: flex; align-items: center; justify-content: space-between; flex: 0 0 auto; }
    .gaa-title { display: flex; align-items: center; gap: 10px; font-size: 18px; font-weight: 700; }
    .gaa-title-badge { width: 34px; height: 34px; border-radius: 12px; display: grid; place-items: center; color: #fff; background: linear-gradient(135deg,#3b82f6,#2563eb); }
    .gaa-close { width: 34px; height: 34px; border: 0; border-radius: 9px; background: transparent; color: #64748b; cursor: pointer; font-size: 22px; }
    .gaa-close:hover { background: #f1f5f9; }
    .gaa-body { flex: 1; overflow-y: auto; padding: 20px; }
    .gaa-welcome { padding: 17px; border: 1px solid #dbeafe; border-radius: 14px; background: linear-gradient(145deg,#eff6ff,#fff); font-size: 14px; line-height: 1.7; }
    .gaa-welcome strong { display: block; margin-bottom: 4px; color: #1d4ed8; font-size: 16px; }
    .gaa-section-title { margin: 22px 0 10px; color: #64748b; font-size: 13px; }
    .gaa-suggestions { display: grid; gap: 9px; }
    .gaa-suggestion { padding: 12px 14px; border: 1px solid #e2e8f0; border-radius: 11px; background: #fff; color: #334155; text-align: left; cursor: pointer; font-size: 14px; }
    .gaa-suggestion:hover { border-color: #93c5fd; color: #2563eb; background: #f8fbff; }
    .gaa-message { margin-top: 16px; padding: 13px 15px; border-radius: 12px; font-size: 14px; line-height: 1.65; }
    .gaa-message.user { margin-left: 42px; background: #2563eb; color: #fff; }
    .gaa-message.bot { margin-right: 24px; border: 1px solid #e2e8f0; background: #fff; color: #334155; }
    .gaa-foot { padding: 14px 16px 18px; background: #fff; border-top: 1px solid #e5eaf1; flex: 0 0 auto; }
    .gaa-compose { display: flex; gap: 9px; align-items: flex-end; padding: 8px; border: 1px solid #cbd5e1; border-radius: 13px; background: #fff; }
    .gaa-input { flex: 1; min-height: 38px; max-height: 96px; padding: 9px 8px; border: 0; outline: 0; resize: none; color: #1e293b; background: transparent; font: inherit; }
    .gaa-send { width: 38px; height: 38px; border: 0; border-radius: 10px; background: #2563eb; color: #fff; cursor: pointer; }
    .gaa-tip { margin-top: 7px; color: #94a3b8; text-align: center; font-size: 11px; }
    @media (max-height: 680px) { #global-ai-assistant { top: 14%; transform: scale(.9); transform-origin: right top; } }
  `;
  document.head.appendChild(style);

  const root = document.createElement('div');
  root.id = 'global-ai-assistant';
  root.innerHTML = `
    <div class="gaa-rail">
      <button class="gaa-trigger" type="button" aria-label="打开AI助手" aria-expanded="false">
        <span class="gaa-icon" aria-hidden="true"><i class="fa-regular fa-message">▢</i></span>
        <span class="gaa-label">AI助手</span>
      </button>
    </div>
  `;

  const overlay = document.createElement('div');
  overlay.className = 'gaa-layer';
  overlay.innerHTML = `
    <div class="gaa-mask" aria-hidden="true"></div>
    <aside class="gaa-drawer" role="dialog" aria-modal="true" aria-label="AI助手">
      <header class="gaa-head">
        <div class="gaa-title"><span class="gaa-title-badge"><i class="fa-regular fa-message">▢</i></span>AI助手</div>
        <button class="gaa-close" type="button" aria-label="关闭AI助手">×</button>
      </header>
      <div class="gaa-body">
        <div class="gaa-welcome"><strong>您好，我是AI助手</strong>我可以帮您查询作业、统计预警数据、罗列待办事项，并快速跳转到对应业务页面。</div>
        <div class="gaa-section-title">您可以这样问</div>
        <div class="gaa-suggestions">
          <button class="gaa-suggestion" type="button">今天有多少作业？</button>
          <button class="gaa-suggestion" type="button">统计近7天各单位违章预警</button>
          <button class="gaa-suggestion" type="button">我有哪些待查处事项？</button>
          <button class="gaa-suggestion" type="button">查看当前作业的实时监控</button>
        </div>
        <div class="gaa-chat" aria-live="polite"></div>
      </div>
      <footer class="gaa-foot">
        <div class="gaa-compose"><textarea class="gaa-input" rows="1" placeholder="请输入您想查询的内容"></textarea><button class="gaa-send" type="button" aria-label="发送"><i class="fa-solid fa-arrow-up">↑</i></button></div>
        <div class="gaa-tip">回答将遵循当前账号的数据权限范围</div>
      </footer>
    </aside>
  `;
  document.body.append(root, overlay);

  const trigger = root.querySelector('.gaa-trigger');
  const mask = overlay.querySelector('.gaa-mask');
  const closeButton = overlay.querySelector('.gaa-close');
  const input = overlay.querySelector('.gaa-input');
  const send = overlay.querySelector('.gaa-send');
  const chat = overlay.querySelector('.gaa-chat');

  let dragging = false, moved = false, startX = 0, startY = 0, originX = 0, originY = 0;
  root.querySelector('.gaa-rail').addEventListener('pointerdown', (event) => {
    dragging = true; moved = false; startX = event.clientX; startY = event.clientY;
    const rect = root.getBoundingClientRect(); originX = rect.left; originY = rect.top;
    root.setPointerCapture?.(event.pointerId);
  });
  root.querySelector('.gaa-rail').addEventListener('pointermove', (event) => {
    if (!dragging) return;
    const dx = event.clientX - startX, dy = event.clientY - startY;
    if (Math.abs(dx) + Math.abs(dy) > 4) moved = true;
    if (!moved) return;
    const x = Math.max(0, Math.min(window.innerWidth - root.offsetWidth, originX + dx));
    const y = Math.max(8, Math.min(window.innerHeight - root.offsetHeight, originY + dy));
    root.style.left = `${x}px`; root.style.top = `${y}px`; root.style.right = 'auto';
  });
  root.querySelector('.gaa-rail').addEventListener('pointerup', () => { dragging = false; });
  root.querySelector('.gaa-rail').addEventListener('click', (event) => { if (moved) { event.preventDefault(); event.stopImmediatePropagation(); moved = false; } }, true);

  function setOpen(open) {
    document.documentElement.classList.toggle('gaa-open', open);
    trigger.setAttribute('aria-expanded', String(open));
    if (open) setTimeout(() => input.focus(), 260);
  }

  function ask(text) {
    const value = String(text || '').trim();
    if (!value) return;
    chat.insertAdjacentHTML('beforeend', `<div class="gaa-message user"></div>`);
    chat.lastElementChild.textContent = value;
    input.value = '';
    setTimeout(() => {
      const reply = document.createElement('div');
      reply.className = 'gaa-message bot';
      reply.textContent = '已收到您的问题。正式接入后，我会依据当前账号权限查询业务数据，并展示查询范围、统计口径和数据更新时间。';
      chat.appendChild(reply);
      reply.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 350);
  }

  trigger.addEventListener('click', () => {
    const scriptUrl = document.currentScript?.src || location.href;
    const assistantUrl = new URL('AI助手PRD交付包/AI助手交互原型.html', scriptUrl);
    assistantUrl.searchParams.set('returnTo', location.href);
    location.href = assistantUrl.href;
  });
  mask.addEventListener('click', () => setOpen(false));
  closeButton.addEventListener('click', () => setOpen(false));
  send.addEventListener('click', () => ask(input.value));
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); ask(input.value); }
  });
  overlay.querySelectorAll('.gaa-suggestion').forEach((button) => button.addEventListener('click', () => ask(button.textContent)));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setOpen(false); });
})();
