(function(){
var modules={
 overview:{title:'平台总览',sub:'算力、算法、任务和边缘运行态势',kind:'overview'},
 tasks:{title:'智能任务管理',sub:'管理长期业务任务配置、版本与触发策略',kind:'tasks'},
 executions:{title:'任务执行中心',sub:'管理每一次实际运行的执行实例与不可变快照',kind:'executions'},
 scenes:{title:'场景模板管理',sub:'沉淀可复用的安全生产场景配置',kind:'cards'},
 algorithms:{title:'算法资源池',sub:'统一管理算法包、版本、授权与运行兼容性',kind:'table'},
 compute:{title:'算力资源池',sub:'统一监控中心集群、边缘智盒与移动节点',kind:'compute'},
 policies:{title:'调度策略配置',sub:'配置优先级、抢占、配额、重试与降级策略',kind:'cards'},
 rules:{title:'事件规则引擎',sub:'将算法结果过滤、持续判断、去重、聚合为业务事件',kind:'table'},
 training:{title:'训练任务管理',sub:'训练、自动评测与质量门槛管理',kind:'training'},
 datasets:{title:'样本与数据集',sub:'管理样本审核、批次和可追溯数据集版本',kind:'table'},
 models:{title:'模型版本管理',sub:'管理模型版本、指标、兼容设备与审核状态',kind:'models'},
 rollouts:{title:'模型发布管理',sub:'灰度发布、运行观察、全量发布与人工回滚',kind:'rollouts'},
 edges:{title:'边缘设备管理',sub:'管理设备心跳、资源、模型部署和断网恢复',kind:'compute'},
 licenses:{title:'算法授权管理',sub:'管理单位、算法、版本、并发和授权有效期',kind:'table'},
 alerts:{title:'告警与异常',sub:'集中处理节点、任务、授权、发布与模型异常',kind:'alerts'},
 audit:{title:'审计日志',sub:'追溯任务、策略、训练、审核、发布与边缘指令',kind:'table'}
};
var body=document.body,key=body.getAttribute('data-module')||'overview',m=modules[key],root=document.getElementById('moduleRoot');
var stats={overview:[['GPU总数','32 张','中心24 / 边缘8','#2563eb'],['GPU利用率','68.4%','阈值 70%','#10b981'],['运行任务','86 个','P0 18 / P1 35','#8b5cf6'],['排队任务','12 个','P2 8 / P3 4','#f59e0b'],['边缘在线率','96.8%','30 / 31 台','#10b981']],tasks:[['任务总数','128','启用 96','#2563eb'],['实时视频任务','72','占 56.3%','#10b981'],['录像分析任务','26','P2队列','#8b5cf6'],['今日触发','1,286','成功 98.6%','#f59e0b'],['配置冲突','3','待处理','#ef4444']],executions:[['运行中','86','P0 18','#10b981'],['排队中','12','最长等待 4分','#f59e0b'],['今日完成','1,238','成功率 98.6%','#2563eb'],['被抢占','6','均为P2/P3','#8b5cf6'],['失败','4','待诊断','#ef4444']],training:[['训练中','3','均为P3','#8b5cf6'],['等待资源','5','夜间执行','#f59e0b'],['今日完成','2','全部达标','#10b981'],['评测中','2','预计18分钟','#2563eb'],['未达标','1','误报率偏高','#ef4444']],models:[['模型版本','48','生产中12','#2563eb'],['待AI审核','3','指标已达标','#f59e0b'],['待业务审核','2','等待确认','#8b5cf6'],['灰度观察','2','覆盖5台设备','#10b981'],['可回滚版本','12','稳定版本','#64748b']],rollouts:[['发布中','2','灰度进度 68%','#2563eb'],['待发布','3','已审批','#f59e0b'],['设备成功','28','成功率93.3%','#10b981'],['设备失败','2','待重试','#ef4444'],['今日回滚','1','人工触发','#8b5cf6']]};
function statHTML(arr){return '<div class="stats">'+arr.map(function(x){return '<div class="stat" style="--accent:'+x[3]+'"><div class="stat-label">'+x[0]+'</div><div class="stat-value">'+x[1]+'</div><div class="stat-note">'+x[2]+'</div></div>'}).join('')+'</div>'}
function head(){return '<header class="page-head"><div><div class="crumb">算力算法调度管理 / '+m.title+'</div><h1>'+m.title+'</h1></div><div class="toolbar"><span class="status s-success">● 平台运行正常</span><button class="btn"><i class="fa fa-bell"></i> 消息 6</button></div></header>'}
function filters(){return '<section class="panel"><div class="filters"><div class="field">所属单位 <select><option>全部授权组织</option><option>齐大山选矿厂</option></select></div><div class="field">状态 <select><option>全部</option><option>运行中</option><option>异常</option></select></div><div class="field">时间 <select><option>今日</option><option>近7天</option><option>近30天</option></select></div><input placeholder="输入名称或编码"><button class="btn btn-primary">查询</button><button class="btn">重置</button></div></section>'}
function table(headers,rows){return '<div class="table-wrap"><table><thead><tr>'+headers.map(function(h){return '<th>'+h+'</th>'}).join('')+'</tr></thead><tbody>'+rows.map(function(r){return '<tr>'+r.map(function(c){return '<td>'+c+'</td>'}).join('')+'</tr>'}).join('')+'</tbody></table></div><div class="pager"><button class="btn btn-sm">‹</button><button class="btn btn-sm btn-primary">1</button><button class="btn btn-sm">2</button><button class="btn btn-sm">3</button><button class="btn btn-sm">›</button></div>'}
function panel(title,actions,content){return '<section class="panel"><div class="panel-hd"><h2>'+title+'</h2><div class="toolbar">'+(actions||'')+'</div></div>'+content+'</section>'}
function overview(){var bars=[62,78,45,88,70,56,82];return statHTML(stats.overview)+'<div class="grid2">'+panel('近7日资源利用趋势','<button class="btn btn-sm">查看容量分析</button>','<div class="chart">'+bars.map(function(v,i){return '<div class="bar" style="height:'+v+'%"><span>8/'+(19+i)+'</span></div>'}).join('')+'</div>')+panel('最近调度事件','<button class="btn btn-sm" data-go="executions">查看全部</button>','<div class="panel-bd event-list"><div class="event"><i class="dot" style="background:#ef4444"></i><div>P0人员持续停留任务抢占P3训练任务<small>10:32 · GPU-07 · 已保留断点</small></div></div><div class="event"><i class="dot" style="background:#10b981"></i><div>模型 v3.2.1 灰度发布完成<small>10:18 · 5/5台边缘设备健康</small></div></div><div class="event"><i class="dot" style="background:#f59e0b"></i><div>边缘节点 EDGE-012 心跳延迟<small>09:56 · 已生成告警</small></div></div><div class="event"><i class="dot"></i><div>P2倒查任务恢复执行<small>09:42 · 从断点 62% 续跑</small></div></div></div>')+'</div><div class="cards"><div class="item-card"><h3>任务优先级分布</h3><div class="kv"><span>P0 实时预警</span><b>18</b><span>P1 常规巡检</span><b>35</b><span>P2 视频倒查</span><b>24</b><span>P3 训练批处理</span><b>9</b></div></div><div class="item-card"><h3>训练与发布</h3><div class="kv"><span>训练/评测</span><b>5</b><span>待双重审核</span><b>5</b><span>灰度发布</span><b>2</b><span>可回滚版本</span><b>12</b></div></div><div class="item-card"><h3>快捷操作</h3><div class="toolbar"><button class="btn btn-primary" data-action="create-task">创建任务</button><button class="btn" data-go="alerts">处理异常</button><button class="btn" data-go="models">审批模型</button></div></div></div>'}
function tasks(){var r=[['高空作业安全监控','TASK-202608-001','高空作业','实时视频','12','3','每日 08:00-18:00','<b class="priority p0">P0</b>','v6','<span class="status s-success">已启用</span>','<span class="link" data-action="drawer">详情</span><span class="link" data-action="edit-task">编辑</span><span class="link" data-action="run">立即执行</span>'],['动火作业烟火检测','TASK-202608-002','危险作业','实时视频','8','2','工作日 14:00-22:00','<b class="priority p0">P0</b>','v3','<span class="status s-success">已启用</span>','<span class="link" data-action="drawer">详情</span><span class="link" data-action="toggle">停用</span><span class="link" data-action="run">立即执行</span>'],['作业视频人员倒查','TASK-202608-003','视频倒查','录像','20','1','作业结束触发','<b class="priority p2">P2</b>','v8','<span class="status s-warn">草稿</span>','<span class="link" data-action="edit-task">编辑</span><span class="link" data-action="copy">复制</span><span class="link" data-action="toggle">启用</span>']];return statHTML(stats.tasks)+panel('任务列表（128）','<button class="btn btn-primary" data-action="create-task"><i class="fa fa-plus"></i> 新建智能任务</button>',table(['任务名称 / 编码','场景','输入类型','摄像头','算法','时间计划','优先级','版本','状态','操作'],r))}
function executions(){var r=[['EXEC-20260825-103201','TASK-202608-001 / v6','定时触发','实时视频','安全帽v3.2.1','<b class="priority p0">P0</b>','边缘实时池','EDGE-008','4GB / 25%','<span class="status s-success">运行中</span>','<span class="progress"><i style="width:68%"></i></span> 68%','<span class="link" data-action="pause">暂停</span><span class="link" data-action="drawer">日志</span><span class="link danger" data-action="terminate">终止</span>'],['EXEC-20260825-102846','TASK-202608-003 / v8','作业联动','录像','人员识别v2.8','<b class="priority p2">P2</b>','中心倒查池','GPU-06','8GB / 35%','<span class="status s-purple">被抢占</span>','<span class="progress"><i style="width:62%"></i></span> 62%','<span class="link" data-action="drawer">抢占原因</span><span class="link" data-action="resume">恢复排队</span>'],['EXEC-20260825-101512','TRAIN-202608-012','手动执行','数据集','安全带v2.4','<b class="priority p3">P3</b>','中心训练池','GPU-09','16GB / 60%','<span class="status s-danger">失败</span>','84%','<span class="link" data-action="retry">重试</span><span class="link" data-action="drawer">诊断</span>']];return statHTML(stats.executions)+panel('执行实例（不可变快照）','<button class="btn">导出执行台账</button>',table(['执行编号','任务 / 版本','触发方式','输入','算法版本','优先级','资源池','实际节点','GPU配额','状态','进度','运行操作'],r))}
var generic={
 scenes:{headers:['模板名称','场景类别','推荐算法','默认优先级','适用输入','使用次数','状态','操作'],rows:[['高空作业监控模板','危险作业','安全带、区域入侵','P0','实时视频','28','<span class="status s-success">启用</span>','详情　生成任务'],['消防通道占用模板','重点部位','通道占用','P1','实时视频','16','<span class="status s-success">启用</span>','详情　复制']]},
 algorithms:{headers:['算法名称','算法编码','当前版本','输入类型','参数能力','兼容芯片','授权状态','运行状态','操作'],rows:[['未佩戴安全帽','ALG-PS-001','v3.2.1','视频/图片','置信度、区域、尺寸','NVIDIA / Atlas','<span class="status s-success">有效</span>','<span class="status s-success">运行中</span>','详情　版本'],['烟火识别','ALG-EN-002','v1.8.0','视频','置信度、灵敏度','NVIDIA','<span class="status s-warn">90天后到期</span>','<span class="status s-success">运行中</span>','详情　关联任务']]},
 policies:{headers:['策略名称','优先级范围','资源阈值','时间窗口','抢占规则','GPU配额','版本','状态','操作'],rows:[['实时安全优先策略','P0 / P1','70%','全天','P0抢占P3后P2','P0保底40%','v5','<span class="status s-success">启用</span>','编辑　复制'],['白天训练限额策略','P3','20%','08:00-18:00','不可抢占P0/P1','P3上限20%','v3','<span class="status s-success">启用</span>','编辑　停用'],['离线任务恢复策略','P2 / P3','资源恢复触发','全天','保留断点自动续跑','按剩余容量','v2','<span class="status s-warn">待发布</span>','编辑　发布']]},
 rules:{headers:['规则名称','关联算法','规则类型','持续时间','去重周期','联动动作','版本','状态','操作'],rows:[['人员持续停留','人员识别','持续判断','5分钟 / 30秒采样','10分钟','预警+排序靠前','v4','<span class="status s-success">启用</span>','编辑　测试'],['消防通道占用','通道占用','持续+聚合','5分钟','30分钟','生成正式报警','v2','<span class="status s-success">启用</span>','编辑　复制']]},
 datasets:{headers:['数据集名称','版本','关联算法','正样本','负样本','待审核','无效','覆盖单位','创建时间','操作'],rows:[['安全帽现场数据集','DS-v12','未佩戴安全帽','12,580','8,260','328','126','4个单位','2026-08-24','详情　生成版本'],['高空安全带数据集','DS-v8','未系安全带','8,920','6,430','186','94','3个单位','2026-08-22','详情　提交训练']]},
 licenses:{headers:['授权编号','授权单位','算法','版本范围','并发路数','已用路数','有效期','状态','操作'],rows:[['LIC-2026-001','齐大山选矿厂','未佩戴安全帽','v3.x','30','18','2026-01-01 至 2027-01-01','<span class="status s-success">有效</span>','详情　续期'],['LIC-2026-008','眼前山铁矿','烟火识别','v1.x','12','10','2026-01-01 至 2026-11-30','<span class="status s-warn">即将到期</span>','详情　调整']]},
 audit:{headers:['时间','操作人','角色','所属单位','对象类型','对象编号','动作','变更摘要','结果','IP'],rows:[['2026-08-25 10:32:08','张安全','算力运维','集团','执行实例','EXEC-103201','调整优先级','P2 调整为 P1','<span class="status s-success">成功</span>','10.2.*.18'],['2026-08-25 10:18:45','李算法','AI研发','集团','模型版本','MODEL-v3.2.1','AI审核通过','指标达到质量门槛','<span class="status s-success">成功</span>','10.2.*.36']]}
};
function compute(){var r=[['GPU-01','中心训练节点','集团中心','NVIDIA A800 × 4','320GB','68%','42% / 58%','63℃','8','<span class="status s-success">健康</span>','12秒前','详情　任务'],['EDGE-008','边缘智盒','齐大山选矿厂','NVIDIA Orin','32GB','71%','46% / 61%','68℃','6','<span class="status s-success">在线</span>','8秒前','详情　模型'],['EDGE-012','边缘智盒','眼前山铁矿','Atlas 300I','24GB','--','38% / 52%','--','4','<span class="status s-danger">心跳异常</span>','6分钟前','诊断　重连']];return statHTML([['节点总数','44','中心12 / 边缘31 / 移动1','#2563eb'],['GPU总量','32张','显存 1.8TB','#8b5cf6'],['健康节点','42','健康率95.5%','#10b981'],['运行任务','86','实时53','#f59e0b'],['异常节点','2','需处理','#ef4444']])+panel('资源节点','<button class="btn btn-primary">接入节点</button>',table(['节点','类型','单位','GPU/芯片','显存','GPU利用率','CPU/内存','温度','任务','健康','心跳','操作'],r))}
function training(){var r=[['TRAIN-202608-012','未佩戴安全帽','DS-v12','v3.1.6','Epoch 80 / Batch 32','GPU-09 16GB','<b class="priority p3">P3</b>','<span class="status s-success">训练中</span>','<span class="progress"><i style="width:76%"></i></span> 76%','详情　停止'],['EVAL-202608-008','烟火识别','DS-v9','v1.7.2','自动评测','GPU-04 8GB','<b class="priority p3">P3</b>','<span class="status s-purple">评测中</span>','45%','详情'],['TRAIN-202608-009','未系安全带','DS-v8','v2.3.4','Epoch 60 / Batch 16','GPU-07 12GB','<b class="priority p3">P3</b>','<span class="status s-danger">未达标</span>','误报率 8.2%','报告　重新训练']];return statHTML(stats.training)+panel('训练与评测任务','<button class="btn btn-primary" data-action="generic">新建训练任务</button>',table(['任务编号','算法','数据集','基础模型','训练参数','算力配额','优先级','状态','进度/结果','操作'],r))}
function models(){var r=[['MODEL-PS-3.2.1','未佩戴安全帽','v3.2.1','TRAIN-012 / DS-v12','96.4%','94.8%','3.1%','+1.8%','NVIDIA/Atlas','<span class="status s-warn">待AI审核</span>','<span class="link" data-action="approve">审核</span><span class="link" data-action="drawer">对比</span>'],['MODEL-BELT-2.4.0','未系安全带','v2.4.0','TRAIN-008 / DS-v8','93.8%','91.2%','4.6%','+1.2%','NVIDIA','<span class="status s-purple">待业务审核</span>','<span class="link" data-action="approve">审核</span>'],['MODEL-FIRE-1.8.0','烟火识别','v1.8.0','TRAIN-006 / DS-v9','95.2%','92.8%','2.9%','--','NVIDIA','<span class="status s-success">生产中</span>','<span class="link" data-go="rollouts">发布记录</span>']];return statHTML(stats.models)+panel('模型版本','<button class="btn">版本对比</button>',table(['模型编号','算法','版本','训练/数据集','精准度','召回率','误报率','生产差值','兼容设备','状态','操作'],r))}
function rollouts(){var r=[['ROLL-202608-018','未佩戴安全帽 v3.2.1','灰度发布','齐大山选矿厂 / 5台','3','5','0','<span class="progress"><i style="width:60%"></i></span> 60%','<span class="status s-success">发布中</span>','<span class="link" data-action="pause">暂停</span><span class="link" data-action="drawer">详情</span>'],['ROLL-202608-015','烟火识别 v1.8.0','全量发布','全部授权设备','28','30','2','93%','<span class="status s-warn">部分失败</span>','<span class="link" data-action="retry">失败重试</span><span class="link danger" data-action="rollback">回滚</span>']];return statHTML(stats.rollouts)+panel('发布任务','<button class="btn btn-primary" data-action="generic">创建发布</button>',table(['发布编号','模型版本','方式','范围','成功','目标','失败','进度','状态','操作'],r))}
function alerts(){var r=[['严重','节点离线','EDGE-012','眼前山铁矿','心跳中断超过5分钟','2026-08-25 10:28','未确认','<span class="link" data-action="handle">处理</span><span class="link" data-action="drawer">详情</span>'],['警告','GPU过热','GPU-07','中心集群','温度达到86℃，P3任务已降级','2026-08-25 10:16','处理中','<span class="link" data-action="handle">更新</span>'],['警告','授权即将到期','LIC-2026-008','眼前山铁矿','剩余97天','2026-08-25 09:20','未确认','<span class="link" data-action="handle">处理</span>']];return statHTML([['未确认','8','严重2','#ef4444'],['处理中','5','平均18分钟','#f59e0b'],['今日恢复','16','自动恢复12','#10b981'],['任务积压','3','P2/P3','#8b5cf6'],['发布异常','2','设备失败','#2563eb']])+panel('异常列表','<button class="btn">告警规则</button>',table(['级别','类型','对象','单位','异常描述','发生时间','状态','操作'],r))}
function render(){var content='';if(m.kind==='overview')content=overview();else if(m.kind==='tasks')content=tasks();else if(m.kind==='executions')content=executions();else if(m.kind==='compute')content=compute();else if(m.kind==='training')content=training();else if(m.kind==='models')content=models();else if(m.kind==='rollouts')content=rollouts();else if(m.kind==='alerts')content=alerts();else{var g=generic[key]||generic.algorithms;content=panel(m.title+'列表','<button class="btn btn-primary" data-action="generic"><i class="fa fa-plus"></i> 新增</button>',table(g.headers,g.rows))}root.innerHTML=head()+'<main class="page-main"><div class="permission-tip"><i class="fa fa-shield"></i> 当前数据范围：本单位及授权下级组织；操作按钮已按角色、对象状态和权限过滤。</div>'+filters()+content+'</main>'}
function wizard(){return '<div class="overlay modal-wrap"><div class="modal"><div class="overlay-hd"><div><h2>新建智能任务</h2><small>配置形成版本快照，启用后历史版本不可覆盖</small></div><span class="close" data-action="close">×</span></div><div class="steps">'+['基本信息','视频输入','算法配置','时间计划','分析参数','规则与资源','确认发布'].map(function(s,i){return '<div class="step '+(i===0?'active':'')+'" data-step="'+i+'">'+(i+1)+'. '+s+'</div>'}).join('')+'</div><div class="overlay-body" id="wizardBody"></div><div class="overlay-ft"><button class="btn" data-action="wizard-prev">上一步</button><button class="btn btn-primary" data-action="wizard-next">下一步</button></div></div></div>'}
var step=0;function wizardBody(){var a=[['任务名称','例如：高空作业安全监控','任务编码','TASK-202608-NEW','所属组织','齐大山选矿厂','负责人','张安全'],['输入类型','实时视频','摄像头组','高空作业摄像头组','摄像头','已选择 12 路','视频平台','海康视频中台'],['算法','未佩戴安全帽','模型版本','v3.2.1','执行顺序','串行优先','联动关系','安全帽 + 区域入侵'],['生效日期','2026-08-25 至 2027-08-24','执行星期','周一至周日','执行时段','08:00 - 18:00','分析频率','连续分析'],['置信度','0.85','灵敏度','中高','采样间隔','1秒','目标尺寸','最小32px / 最大1080px'],['优先级','P0 实时安全预警','GPU配额','显存4GB / 算力25%','资源池','边缘实时资源池','失败策略','自动重试3次'],['配置校验','授权有效 / 设备兼容','时间冲突','无冲突','资源预估','峰值需 3.2 GPU','版本','启用后生成 v1']];var x=a[step];var h='<div class="form-grid">';for(var i=0;i<x.length;i+=2)h+='<div class="form-item"><label class="required">'+x[i]+'</label><input value="'+x[i+1]+'"></div>';h+='</div>';if(step===4)h+='<div class="form-item" style="margin-top:18px"><label>检测区域（矩形 / 多边形）</label><div class="detect-area"><div class="polygon"></div></div></div>';if(step===6)h+='<div class="permission-tip" style="margin-top:18px">✓ 算法授权有效　✓ 模型可发布　✓ 摄像头兼容　✓ 并发容量满足。启用后生成任务版本与调度配置。</div>';document.getElementById('wizardBody').innerHTML=h;document.querySelectorAll('.step').forEach(function(e,i){e.classList.toggle('active',i===step)});var next=document.querySelector('[data-action="wizard-next"]');next.textContent=step===6?'启用任务':'下一步'}
function drawer(title){return '<div class="overlay"><div class="drawer"><div class="overlay-hd"><div><h2>'+title+'</h2><small>对象详情与完整运行轨迹</small></div><span class="close" data-action="close">×</span></div><div class="overlay-body"><div class="kv"><span>对象编号</span><b>OBJ-20260825-001</b><span>所属单位</span><b>齐大山选矿厂</b><span>当前状态</span><b><span class="status s-success">运行正常</span></b><span>数据更新时间</span><b>2026-08-25 10:35:18</b><span>权限范围</span><b>本单位及授权下级</b></div><h3 style="margin-top:25px">调度轨迹</h3><div class="timeline"><div class="phase done"><i>✓</i>提交</div><div class="phase done"><i>✓</i>排队</div><div class="phase done"><i>✓</i>分配资源</div><div class="phase active"><i>4</i>运行中</div><div class="phase"><i>5</i>完成</div></div><h3>不可变执行快照</h3><div class="item-card"><div class="kv"><span>任务版本</span><b>v6</b><span>算法版本</span><b>v3.2.1</b><span>摄像头</span><b>CAM-00018</b><span>GPU配额</span><b>显存4GB / 算力25%</b><span>优先级</span><b>P0</b><span>快照校验值</span><b>f9a8****c210</b></div></div></div><div class="overlay-ft"><button class="btn" data-action="close">关闭</button></div></div></div>'}
function toast(t){var n=document.createElement('div');n.className='toast';n.textContent=t;document.body.appendChild(n);setTimeout(function(){n.remove()},2200)}
document.addEventListener('click', function (e) {
  var el = e.target.closest('[data-action],[data-go]');
  if (!el) return;

  if (el.dataset.go) {
    var map = {
      executions: '任务执行中心',
      alerts: '告警与异常',
      models: '模型版本管理',
      rollouts: '模型发布管理'
    };
    location.href = '算力算法调度管理-' + map[el.dataset.go] + '.html';
    return;
  }

  var a = el.dataset.action;
  var o = document.getElementById('overlayRoot');

  if (a === 'create-task' || a === 'edit-task') {
    o.innerHTML = wizard();
    step = 0;
    wizardBody();
  } else if (a === 'close') {
    o.innerHTML = '';
  } else if (a === 'wizard-next') {
    if (step < 6) {
      step++;
      wizardBody();
    } else {
      o.innerHTML = '';
      toast('任务校验通过，已启用并生成版本 v1');
    }
  } else if (a === 'wizard-prev') {
    if (step > 0) {
      step--;
      wizardBody();
    }
  } else if (a === 'drawer') {
    o.innerHTML = drawer(m.title + '详情');
  } else if (a === 'run') {
    toast('已生成新的执行实例，正在进入调度队列');
  } else if (a === 'pause') {
    el.textContent = '继续';
    el.dataset.action = 'resume';
    toast('执行实例已暂停，不影响任务配置');
  } else if (a === 'resume') {
    el.textContent = '暂停';
    el.dataset.action = 'pause';
    toast('资源恢复，执行实例将从断点继续');
  } else if (a === 'terminate') {
    if (confirm('确认终止本次执行实例？长期任务配置不会被修改。')) {
      toast('执行实例已终止');
    }
  } else if (a === 'retry') {
    toast('已创建重试实例并保留原失败记录');
  } else if (a === 'approve') {
    if (confirm('确认审核通过该模型版本？')) {
      toast('审核通过，已进入下一发布环节');
    }
  } else if (a === 'rollback') {
    if (confirm('确认回滚到上一稳定版本？')) {
      toast('回滚指令已下发，正在同步边缘设备');
    }
  } else if (a === 'handle') {
    toast('异常已确认并进入处理流程');
  } else if (a === 'toggle') {
    toast('任务状态已更新，变更仅影响后续执行');
  } else if (a === 'copy') {
    toast('已复制为新的草稿任务');
  } else if (a === 'generic') {
    toast('已打开新增配置流程');
  }
});
render();
})();
