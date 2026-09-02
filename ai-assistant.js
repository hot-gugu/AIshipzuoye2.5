(function () {
  'use strict';
  if (document.getElementById('global-ai-assistant') || document.querySelector('.assistant-fab')) return;

  var targetPage = new URL('AI助手PRD交付包/AI助手交互原型.html', document.currentScript && document.currentScript.src ? document.currentScript.src : location.href);
  targetPage.searchParams.set('returnTo', location.href);
  var targetUrl = targetPage.href;
  var style = document.createElement('style');
  style.textContent = '#global-ai-assistant{position:fixed;right:0;top:20%;z-index:9998;font-family:"Microsoft YaHei",sans-serif}.gaa-rail{width:68px;height:150px;display:flex;align-items:center;justify-content:center;padding-left:7px;border-radius:32px 0 0 32px;background:linear-gradient(145deg,#dcecff 0%,#a9ccff 100%);box-shadow:0 8px 24px rgba(37,99,235,.18)}.gaa-trigger{width:52px;min-height:126px;border:0;border-radius:19px;background:rgba(255,255,255,.96);color:#2458ad;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;cursor:pointer;box-shadow:0 7px 20px rgba(48,91,164,.16);transition:transform .2s ease,box-shadow .2s ease}.gaa-trigger:hover{transform:translateX(-3px);box-shadow:0 9px 25px rgba(48,91,164,.25)}.gaa-trigger:focus-visible{outline:3px solid rgba(37,99,235,.35);outline-offset:2px}.gaa-icon{width:28px;height:28px;border-radius:10px;background:#edf4ff;display:grid;place-items:center;font-size:15px}.gaa-label{writing-mode:vertical-rl;letter-spacing:3px;font-size:16px;line-height:1;font-weight:700}@media(max-height:680px){#global-ai-assistant{top:14%;transform:scale(.9);transform-origin:right top}}';
  document.head.appendChild(style);

  var root = document.createElement('div');
  root.id = 'global-ai-assistant';
  root.innerHTML = '<div class="gaa-rail"><button class="gaa-trigger" type="button" aria-label="打开AI助手"><span class="gaa-icon" aria-hidden="true"><i class="fa-regular fa-message">▢</i></span><span class="gaa-label">AI助手</span></button></div>';
  document.body.appendChild(root);
  root.querySelector('.gaa-trigger').addEventListener('click', function () { location.href = targetUrl; });
})();
