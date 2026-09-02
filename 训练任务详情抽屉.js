(function () {
  function detail(task) {
    var isDone = task === 'TRAIN-202608-012';
    var progress = isDone ? 100 : 76;
    var status = isDone ? '训练完成' : '训练中';
    return '<div class="overlay training-detail-overlay"><aside class="drawer training-detail-drawer">' +
      '<div class="overlay-hd"><div><h2>训练任务详情</h2><small>' + task + ' · 算力调度平台反馈</small></div><span class="close" data-training-close>×</span></div>' +
      '<div class="overlay-body"><div class="training-summary"><div><span>当前状态</span><strong class="' + (isDone ? 'done' : 'running') + '">' + status + '</strong></div><div><span>训练进度</span><strong>' + progress + '%</strong></div><div><span>优先级</span><strong class="priority p3">P3</strong></div></div>' +
      '<section class="task-section"><h3>训练进度</h3><div class="task-progress"><i style="width:' + progress + '%"></i></div><div class="progress-meta"><span>Epoch ' + (isDone ? '80 / 80' : '61 / 80') + '</span><span>' + progress + '%</span></div></section>' +
      '<section class="task-section"><h3>任务信息</h3><div class="kv"><span>关联数据集</span><b>DS-v12</b><span>模型名称</span><b>安全帽模型，人的模型，反光衣模型</b><span>提交方式</span><b>自动/手动-张三</b><span>提交时间</span><b>2026-08-25 02:00</b></div></section>' +
      '<section class="task-section"><h3>算力服务器</h3><div class="server-card"><div class="server-icon"><i class="fa fa-server"></i></div><div><strong>GPU-09 · 中心训练集群</strong><p>节点状态正常，任务运行稳定</p></div></div><div class="kv"><span>CPU</span><b>Intel Xeon Gold 6338 · 8 核</b><span>内存</span><b>32 GB / 64 GB</b><span>GPU</span><b>NVIDIA A100 · 16 GB</b><span>GPU利用率</span><b>86%</b><span>资源队列</span><b>中心训练池</b><span>调度优先级</span><b>P3 · 批量训练</b></div></section>' +
      // '<section class="task-section"><h3>运行反馈</h3><div class="timeline"><div class="phase done"><i>✓</i>已提交</div><div class="phase done"><i>✓</i>资源分配</div><div class="phase ' + (isDone ? 'done' : 'active') + '"><i>' + (isDone ? '✓' : '3') + '</i>模型训练</div><div class="phase ' + (isDone ? 'done' : '') + '"><i>' + (isDone ? '✓' : '4') + '</i>结果回传</div></div><div class="permission-tip">' + (isDone ? '训练已完成，结果及模型指标已回传至当前数据集。' : '任务正在算力调度平台运行，完成后将自动回传训练结果。') + '</div></section></div>' +
      '<div class="overlay-ft"><button class="btn" data-training-close>关闭</button></div></aside></div>';
  }
  function open(task) { var host = document.getElementById('overlayRoot'); if (!host) { host = document.createElement('div'); host.id = 'overlayRoot'; document.body.appendChild(host) } host.innerHTML = detail(task || 'TRAIN-202608-012'); }
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href*="训练任务管理.html"], [data-training-task]');
    if (link) { e.preventDefault(); e.stopImmediatePropagation(); open(link.dataset.trainingTask || link.textContent.trim()); return; }
    if (e.target.closest('[data-training-close]')) { var host = document.getElementById('overlayRoot'); if (host) host.innerHTML = ''; }
  }, true);
  var style = document.createElement('style'); style.textContent = '.training-detail-drawer{width:min(680px,96vw)}.training-summary{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:18px}.training-summary>div{padding:14px;border:1px solid #dbe4f0;border-radius:9px;background:#f8fafc}.training-summary span{display:block;color:#64748b;font-size:12px;margin-bottom:7px}.training-summary strong{font-size:20px}.training-summary .done{color:#059669}.training-summary .running{color:#2563eb}.task-section{border:1px solid #dbe4f0;border-radius:10px;padding:16px;margin-bottom:14px}.task-section h3{margin:0 0 14px;font-size:15px}.task-progress{height:10px;border-radius:10px;background:#e2e8f0;overflow:hidden}.task-progress i{display:block;height:100%;background:linear-gradient(90deg,#2563eb,#60a5fa)}.progress-meta{display:flex;justify-content:space-between;margin-top:8px;color:#64748b;font-size:12px}.server-card{display:flex;align-items:center;gap:12px;padding:12px;background:#eff6ff;border-radius:8px;margin-bottom:14px}.server-card p{margin:4px 0 0;color:#64748b;font-size:12px}.server-icon{width:42px;height:42px;border-radius:8px;background:#2563eb;color:#fff;display:grid;place-items:center;font-size:18px}@media(max-width:600px){.training-summary{grid-template-columns:1fr}.training-detail-drawer .timeline{align-items:flex-start}}'; document.head.appendChild(style);
})();
