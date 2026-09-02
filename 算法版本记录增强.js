(function(){
  setTimeout(function(){
    var root=document.getElementById('moduleRoot')||document;
    var stats=root.querySelector('.stats'); if(stats) stats.style.display='none';
    var panel=Array.from(root.querySelectorAll('section.panel')).find(function(p){return p.querySelector('table')});
    if(!panel) return;
    var filters=root.querySelector('.filters'); if(filters) filters.innerHTML='<select class="select"><option>全部算法</option><option>未佩戴安全帽</option><option>烟火识别</option></select><input class="input" placeholder="搜索算法名称或版本号"><input class="input" type="date" aria-label="记录时间">';
    var hd=panel.querySelector('.panel-hd'); if(hd) hd.innerHTML='<div><h2>算法版本记录</h2><span class="muted">模型发布后自动生成的算法版本变更记录</span></div>';
    var t=panel.querySelector('table'); if(!t)return;
    t.innerHTML='<thead><tr><th>算法版本</th><th>算法名称</th><th>关联模型及版本</th><th>版本生成时间</th><th>变更说明</th></tr></thead><tbody><tr><td><strong>ALG-PS v3.2.1</strong></td><td>未佩戴安全帽</td><td>人的模型 v3.2.1<br>安全帽模型 v2.4.0</td><td>2026-08-25 10:18</td><td>模型发布后自动升级</td></tr><tr><td><strong>ALG-PS v3.2.0</strong></td><td>未佩戴安全帽</td><td>人的模型 v3.2.0<br>安全帽模型 v2.3.1</td><td>2026-07-16 09:42</td><td>人的模型版本更新</td></tr><tr><td><strong>ALG-FIRE v1.8.0</strong></td><td>烟火识别</td><td>烟火模型 v1.8.0</td><td>2026-06-14 14:06</td><td>首次发布生成</td></tr></tbody>';
  },80);
})();
