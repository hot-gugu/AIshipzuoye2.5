(function(){
  function sync(){
    var root=document.getElementById('moduleRoot')||document;
    var headToolbar=root.querySelector('.page-head .toolbar'); if(headToolbar) headToolbar.style.display='none';
    var panel=Array.from(root.querySelectorAll('section.panel')).find(function(p){return p.querySelector('table')&&/模型版本/.test(p.textContent)});
    if(!panel) return;
    var stat=panel.parentElement&&panel.parentElement.querySelector('.stats .stat');
    if(stat){var label=stat.querySelector('div'); if(label) label.textContent='算法版本更新次数';}
    var stats=root.querySelector('.stats'); if(stats) stats.style.display='none';
    var filters=root.querySelector('.filters');
    if(filters&&!filters.dataset.enhanced){filters.dataset.enhanced='1';filters.innerHTML='<select class="select"><option>全部模型</option><option>人的模型</option><option>安全帽模型</option></select><input class="input" placeholder="搜索算法名称或发布人"><input class="input publish-date" type="date" aria-label="发布时间">';}
    var hd=panel.querySelector('.panel-hd');
    if(hd&&!hd.querySelector('#batchPublish')){var b=document.createElement('button');b.id='batchPublish';b.className='btn btn-primary';b.textContent='批量发布';b.style.marginLeft='8px';hd.appendChild(b);}
    var table=panel.querySelector('table'); if(!table||table.dataset.enhanced)return;
    table.dataset.enhanced='1';
    var rows=[
      ['v3.2.1','未佩戴安全帽','MODEL-PS-3.2.1','未佩戴安全帽模型','TRAIN-012 / DS-v12','2026-08-25 10:18','张安全','待发布'],
      ['v2.4.0','未系安全带','MODEL-BELT-2.4.0','未系安全带模型','TRAIN-008 / DS-v8','2026-08-25 10:18','张安全','待发布'],
      ['v1.8.0','烟火识别','MODEL-FIRE-1.8.0','烟火识别模型','TRAIN-006 / DS-v9','2026-08-25 10:18','张安全','已发布']
    ];
    table.innerHTML='<thead><tr><th>版本</th><th>模型编号 / 模型名称</th><th>训练 / 数据集</th><th>发布时间</th><th>发布人</th><th>状态</th><th>操作</th></tr></thead><tbody></tbody>';
    var tbody=table.querySelector('tbody');
    rows.forEach(function(r){var tr=document.createElement('tr');tr.className='table-row border-t';tr.innerHTML='<td><label class="version-cell">'+(r[7]==='待发布'?'<input type="checkbox" class="publish-check" aria-label="选择 '+r[0]+'"> ':'')+'<span>'+r[0]+'</span></label></td><td><strong>'+r[2]+'</strong><br><span class="muted">'+r[3]+'</span></td><td>'+r[4]+'</td><td>'+r[5]+'</td><td>'+r[6]+'</td><td><span class="status '+(r[7]==='已发布'?'s-ok':'s-warn')+'">'+r[7]+'</span></td><td>'+(r[7]==='待发布'?'<button class="btn btn-primary publish-one">立即发布</button>':'')+'</td>';tbody.appendChild(tr);});
    var style=document.createElement('style');style.textContent='.version-cell{display:inline-flex;align-items:center;gap:8px;white-space:nowrap}.publish-check{width:16px;height:16px;accent-color:#2563eb;vertical-align:middle}.publish-one{padding:6px 12px!important;font-size:12px!important;line-height:1.2!important}#batchPublish{padding:7px 14px!important}.publish-date{min-width:150px}';document.head.appendChild(style);
    function publish(tr){var st=tr.querySelector('.status');if(!st||st.textContent.trim()==='已发布')return;if(!confirm('确认发布该模型版本？'))return;st.textContent='已发布';st.className='status s-ok';var c=tr.querySelector('.publish-check');if(c)c.remove();var cell=tr.lastElementChild;if(cell)cell.innerHTML='';}
    tbody.addEventListener('click',function(e){var btn=e.target.closest('.publish-one');if(btn&&!btn.dataset.published)publish(btn.closest('tr'));});
    var batch=document.getElementById('batchPublish'); if(batch)batch.addEventListener('click',function(){var selected=Array.from(tbody.querySelectorAll('.publish-check:checked')).map(function(c){return c.closest('tr')});if(!selected.length){alert('请先选择待发布版本');return;}if(!confirm('确认批量发布选中的 '+selected.length+' 个版本？'))return;selected.forEach(function(tr){var st=tr.querySelector('.status');st.textContent='已发布';st.className='status s-ok';var c=tr.querySelector('.publish-check');if(c)c.remove();tr.lastElementChild.innerHTML='';});alert('批量发布成功');});
  }
  setTimeout(sync,80);
})();
