(() => {
  const SIDEBAR_WIDTH = 240;

  const menuGroups = [
    { title: '首页', icon: 'fa-home', href: '首页.html' },
    { title: '监测一张图', icon: 'fa-picture-o', href: '方案图册.html' },
    {
      title: '智能监护中心',
      icon: 'fa-shield',
      children: [
        {
          title: '作业智能监测',
          icon: 'fa-video-camera',
          children: [
            { title: '作业计划管理', href: '作业计划管理.html' },
            { title: '作业智能监测', href: '实时监控.html' },
            { title: '事后视频倒查', href: '视频倒查列表页面.html' }
          ]
        },
        { title: '重点区域监测', icon: 'fa-map-marker' },
        { title: 'AI预警核查', icon: 'fa-bell', href: 'AI隐患核查.html' },
        {
          title: '隐患违章管理',
          icon: 'fa-exclamation-triangle',
          children: [
            { title: '违章查处', href: '隐患违章管理-违章查处.html' },
            { title: '隐患查处', href: '隐患违章管理-隐患查处.html' }
          ]
        },
        {
          title: '履职统计',
          icon: 'fa-bar-chart',
          children: [
            { title: '领导履职统计', href: '领导履职台账.html' },
            { title: '违章统计分析', href: '违章统计分析.html' },
            { title: '隐患统计分析', href: '隐患统计分析.html' }
          ]
        }
      ]
    },
    {
      title: '算法训练中心',
      icon: 'fa-graduation-cap',
      children: [
        {
          title: '算法管理',
          icon: 'fa-cubes',
          children: [
            { title: '算法管理', href: '算法管理.html' },
            { title: '算法精准度分析', href: '算法精准度分析列表.html' }
          ]
        },
        {
          title: '算法训练',
          icon: 'fa-graduation-cap',
          children: [
            { title: '样本与数据集', href: '算力算法调度管理-样本与数据集.html' },
            { title: '模型发布管理', href: '算力算法调度管理-模型版本管理.html' },
            { title: '算法版本记录', href: '算力算法调度管理-模型发布管理.html' }
          ]
        },
        {
          title: '训练样本库',
          icon: 'fa-database',
          children: [
            { title: '训练正负样本库', href: '数据回溯正负样本.html' },
            { title: '隐患库', href: '隐患库.html' }
          ]
        },
        {
          title: '参数配置',
          icon: 'fa-sliders',
          children: [
            { title: '模型目标物标签', href: '模型目标物标签管理.html' },
            { title: '训练参数配置', href: '训练参数配置.html' }
          ]
        }
      ]
    },
    {
      title: '智能调度中心',
      icon: 'fa-microchip',
      children: [
        { title: '设备管理', href: '设备管理列表.html' },
        { title: '算力智能调度', href: '算力智能调度简版.html' }
      ]
    },
    {
      title: '基础配置中心',
      icon: 'fa-cogs',
      children: [
        {
          title: '基础管理',
          icon: 'fa-sliders',
          children: [
            { title: '违章规则管理', href: '违章规则管理.html' },
            { title: '违章类型管理', href: '违章类型管理.html' },
            { title: '违章等级管理', href: '违章等级管理.html' },
            { title: '隐患分类管理', href: '隐患分类管理.html' },
            { title: '隐患等级管理', href: '隐患等级管理.html' },
            { title: '作业区域管理', href: '作业区域管理.html' },
            { title: '作业类型管理', href: '作业类型管理.html' },
            { title: '人脸采集库', href: '人脸采集库.html' },
            { title: '作业班次', href: '作业班次.html' }
          ]
        },
        {
          title: '系统管理',
          icon: 'fa-gear',
          children: [
            { title: '成员管理' },
            { title: '组织架构' },
            { title: '角色管理' },
            { title: '岗位管理' }
          ]
        }
      ]
    },
    { title: '产品功能说明', icon: 'fa-book', href: '产品功能说明.html' }
  ];

  const actionRoutes = [
    { labels: ['新增作业计划', '新建作业计划'], href: '新增作业计划.html', exact: true },
    { labels: ['选择摄像头'], href: '选择摄像头.html', exact: true },
    { labels: ['无视频作业', '无视频作业(8)'], href: '无视频作业.html', exact: true },
    { labels: ['查看监控'], href: '实时监控.html', exact: true },
    { labels: ['标记违章'], href: 'AI预警实时和倒查标记.html', exact: true },
    { labels: ['抓拍'], href: '抓拍违章.html', exact: true },
    { labels: ['倒查'], href: '视频倒查按作业计划.html', exact: true },
    { labels: ['查看回放'], href: '视频倒查按作业计划.html', exact: true },
    { labels: ['复核'], href: 'AI识别的违章复核.html', exact: true },
    { labels: ['树状预览'], href: '设备管理树状.html', exact: true },
    { labels: ['详情'], href: '算法精准度分析.html', exact: true, pages: ['算法精准度分析列表.html'] }
  ];

  const normalize = text => (text || '').replace(/\s+/g, '').trim();
  const currentFile = decodeURIComponent(location.pathname.split('/').pop() || '');
  const isSamePage = href => currentFile === href;
  const go = href => {
    if (!isSamePage(href)) location.href = href;
  };

  const flattenMenu = groups => groups.flatMap(group => group.children ? group.children : [group]);
  const activeGroup = group => group.children?.some(child => isSamePage(child.href) || activeGroup(child));

  const injectStyle = () => {
    if (document.getElementById('unified-navigation-style')) return;
    const style = document.createElement('style');
    style.id = 'unified-navigation-style';
    style.textContent = `
      .unified-sidebar {
        position: fixed !important;
        left: 0 !important;
        top: 0 !important;
        bottom: 0 !important;
        width: ${SIDEBAR_WIDTH}px !important;
        min-width: ${SIDEBAR_WIDTH}px !important;
        z-index: 9999 !important;
        background: #0f244e !important;
        color: #dbe7ff !important;
        display: flex !important;
        flex-direction: column !important;
        overflow: hidden !important;
        box-shadow: 4px 0 18px rgba(15, 36, 78, 0.16) !important;
      }
      .unified-sidebar * { box-sizing: border-box; }
      .unified-sidebar-logo {
        height: 72px;
        padding: 16px 18px;
        display: flex;
        align-items: center;
        gap: 12px;
        border-bottom: 1px solid rgba(255,255,255,0.1);
        flex-shrink: 0;
      }
      .unified-logo-mark {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        background: #fff;
        color: #165dff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 18px;
      }
      .unified-menu {
        flex: 1;
        padding: 14px 10px 18px;
        overflow-y: auto;
      }
      .unified-menu::-webkit-scrollbar { width: 5px; }
      .unified-menu::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.18); border-radius: 999px; }
      .unified-menu-item,
      .unified-menu-group-title {
        min-height: 42px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        color: #c7d5f5;
        text-decoration: none;
        font-size: 14px;
        line-height: 1.2;
        transition: all .18s ease;
      }
      .unified-menu-item:hover {
        background: rgba(255,255,255,0.09);
        color: #fff;
        transform: translateX(2px);
      }
      .unified-menu-item.active {
        background: rgba(22,93,255,0.28);
        color: #fff;
        font-weight: 600;
        box-shadow: inset 3px 0 0 #4f8cff;
      }
      .unified-menu-group { margin-top: 4px; }
      .unified-menu-group-title {
        color: #8fa4cf;
        font-weight: 600;
        cursor: pointer;
        justify-content: space-between;
      }
      .unified-menu-group-title:hover { background: rgba(255,255,255,0.07); color: #fff; }
      .unified-menu-group-title.active { color: #fff; }
      .unified-menu-group-title > .fa-angle-down { transition: transform .18s ease; }
      .unified-menu-group.collapsed > .unified-menu-group-title > .fa-angle-down { transform: rotate(-90deg); }
      .unified-menu-group.collapsed > .unified-menu-children { display: none; }
      .unified-group-main {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .unified-menu-children {
        margin: 2px 0 8px 26px;
        padding-left: 8px;
        border-left: 1px solid rgba(255,255,255,0.12);
      }
      .unified-menu-children .unified-menu-item {
        min-height: 34px;
        padding: 8px 10px;
        font-size: 13px;
        border-radius: 8px;
      }
      .unified-menu-children .unified-menu-group { margin-top: 2px; }
      .unified-menu-children .unified-menu-group-title { min-height: 36px; padding: 8px 10px; font-size: 13px; border-radius: 8px; }
      .unified-menu-children .unified-menu-children { margin-left: 18px; }
      .unified-menu-item.placeholder {
        cursor: default;
        color: #8fa4cf;
      }
      .unified-menu-item.placeholder:hover {
        background: transparent;
        color: #8fa4cf;
        transform: none;
      }
      .unified-menu-footer {
        padding: 12px 16px;
        color: #8fa4cf;
        font-size: 12px;
        border-top: 1px solid rgba(255,255,255,0.1);
      }
      .unified-content-shift {
        margin-left: ${SIDEBAR_WIDTH}px !important;
        width: calc(100% - ${SIDEBAR_WIDTH}px) !important;
      }
      @media (max-width: 900px) {
        .unified-sidebar { transform: translateX(-${SIDEBAR_WIDTH}px); }
        .unified-content-shift { margin-left: 0 !important; width: 100% !important; }
      }
    `;
    document.head.appendChild(style);
  };

  const createLogo = () => {
    const logo = document.createElement('div');
    logo.className = 'unified-sidebar-logo';
    logo.innerHTML = `
      <div class="unified-logo-mark"><i class="fa fa-cube"></i></div>
      <div>
        <div style="font-size:13px;font-weight:700;color:#fff;line-height:1.35;">视频AI识别自进化能力平台</div>
        <div style="font-size:12px;color:#8fa4cf;margin-top:3px;">智慧管控系统</div>
      </div>
    `;
    return logo;
  };

  const createItem = ({ title, icon, href }) => {
    const item = document.createElement(href ? 'a' : 'div');
    if (href) item.href = href;
    item.className = `unified-menu-item${href && isSamePage(href) ? ' active' : ''}${href ? '' : ' placeholder'}`;
    item.innerHTML = `${icon ? `<i class="fa ${icon}" style="width:18px;text-align:center;"></i>` : '<span style="width:7px;height:7px;border-radius:999px;background:currentColor;opacity:.65;"></span>'}<span>${title}</span>`;
    return item;
  };

  const menuStateKey = path => `unified-menu:${path}`;
  const readMenuState = path => {
    try { return sessionStorage.getItem(menuStateKey(path)); } catch (_) { return null; }
  };
  const writeMenuState = (path, collapsed) => {
    try { sessionStorage.setItem(menuStateKey(path), collapsed ? 'collapsed' : 'expanded'); } catch (_) {}
  };

  const createGroup = (group, depth = 0, path = group.title) => {
    const wrapper = document.createElement('div');
    const savedState = readMenuState(path);
    const initiallyCollapsed = savedState ? savedState === 'collapsed' : depth === 0;
    wrapper.className = `unified-menu-group${initiallyCollapsed ? ' collapsed' : ''}`;

    const title = document.createElement('div');
    title.className = `unified-menu-group-title${activeGroup(group) ? ' active' : ''}`;
    title.innerHTML = `
      <span class="unified-group-main"><i class="fa ${group.icon}" style="width:18px;text-align:center;"></i><span>${group.title}</span></span>
      ${group.children.length ? '<i class="fa fa-angle-down"></i>' : '<span aria-hidden="true"></span>'}
    `;

    const children = document.createElement('div');
    children.className = `unified-menu-children${group.children.length ? '' : ' empty'}`;
    group.children.forEach(child => children.appendChild(child.children ? createGroup(child, depth + 1, `${path}/${child.title}`) : createItem(child)));

    title.addEventListener('click', () => {
      if (!group.children.length) return;
      wrapper.classList.toggle('collapsed');
      writeMenuState(path, wrapper.classList.contains('collapsed'));
    });

    wrapper.append(title, children);
    return wrapper;
  };

  const shiftContent = aside => {
    const parent = aside.parentElement;
    const target = aside.nextElementSibling || (parent !== document.body ? parent : null);
    if (target) target.classList.add('unified-content-shift');
  };

  const renderMenu = () => {
    injectStyle();
    let aside = document.querySelector('aside[data-unified-menu-host]') || document.querySelector('aside');
    if (!aside) {
      aside = document.createElement('aside');
      document.body.insertBefore(aside, document.body.firstChild);
    }
    if (!aside || aside.dataset.unifiedMenu === 'true') return;

    aside.dataset.unifiedMenu = 'true';
    aside.className = 'unified-sidebar';
    aside.innerHTML = '';

    const nav = document.createElement('nav');
    nav.className = 'unified-menu';
    menuGroups.forEach(group => {
      nav.appendChild(group.children ? createGroup(group, 0, group.title) : createItem(group));
    });

    const footer = document.createElement('div');
    footer.className = 'unified-menu-footer';
    footer.innerHTML = '<i class="fa fa-location-arrow"></i> 菜单已统一固定，点击可跳转页面';

    aside.append(createLogo(), nav, footer);
    shiftContent(aside);
  };

  const bindElement = (element, href) => {
    if (!element || element.dataset.linkBound === href) return;
    element.dataset.linkBound = href;
    element.style.cursor = 'pointer';
    element.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      go(href);
    });
  };

  const bindByText = ({ labels, href, exact = true }, scope = document) => {
    const normalizedLabels = labels.map(normalize);
    const candidates = scope.querySelectorAll('a, button, span, div, i, li, td');
    candidates.forEach(element => {
      const text = normalize(element.getAttribute('title') || element.textContent);
      if (!text) return;
      const matched = exact
        ? normalizedLabels.some(label => text === label)
        : normalizedLabels.some(label => text === label || text.includes(label));
      if (matched) bindElement(element.closest('a, button') || element, href);
    });
  };

  const bindActions = () => {
    actionRoutes.forEach(route => {
      if (route.pages && !route.pages.includes(currentFile)) return;
      bindByText(route);
    });
  };

  const setup = () => {
    renderMenu();
    bindActions();
    if (!document.querySelector('script[data-global-ai-assistant]') && !document.getElementById('global-ai-assistant')) {
      const script = document.createElement('script');
      const navigationScript = Array.from(document.scripts).find((item) => /navigation\.js(?:\?|$)/.test(item.src));
      script.src = new URL('ai-assistant.js?v=20260902-5', navigationScript?.src || location.href).href;
      script.dataset.globalAiAssistant = 'true';
      document.head.appendChild(script);
    }
  };

  if (decodeURI(location.pathname).endsWith('隐患库.html')) { const s=document.createElement('script'); s.src='隐患库增强.js'; document.body.appendChild(s); const m=document.createElement('style'); m.textContent='#photos>div>div:first-child{position:relative;overflow:hidden}#photos>div>div:first-child:after{content:"";position:absolute;left:24%;top:18%;width:48%;height:58%;border:2px solid #ef4444}#photos>div>div:first-child:before{content:"隐患目标 92%";position:absolute;left:24%;top:0;background:#ef4444;color:#fff;font-size:10px;padding:1px 4px;z-index:2}.overflow-x-auto table thead th:nth-child(8),.overflow-x-auto table tbody td:nth-child(8){display:none!important}'; document.head.appendChild(m); }
  if (decodeURI(location.pathname).endsWith('隐患库.html')) { const h=document.querySelector('.hint'); if(h) h.textContent='当前隐患库还有 860 张未训练图片，可导入训练数据集进行训练。'; }
  if (decodeURI(location.pathname).endsWith('人工标注工作台.html')) { const s=document.createElement('script'); s.src='标注属性增强.js'; document.body.appendChild(s); }
  if (decodeURI(location.pathname).endsWith('人工标注工作台.html')) { document.addEventListener('click',e=>{ if(e.target.closest('#objectSelection button')) window.annotationTarget=e.target.closest('#objectSelection button').textContent.trim(); }); window.annotationTarget='人物'; }
  if (decodeURI(location.pathname).endsWith('算力算法调度管理-训练任务管理.html')) { const s=document.createElement('style'); s.textContent='.page-main table th:nth-child(2),.page-main table td:nth-child(2){display:none!important}'; document.head.appendChild(s); }
  if (decodeURI(location.pathname).endsWith('算力算法调度管理-数据集详情.html')) { const labels=['人的模型','安全帽模型','反光衣模型','人员摔倒模型','口罩模型']; const sync=()=>document.querySelectorAll('.mark-name').forEach((el,i)=>{const next=labels[i%labels.length];if(el.textContent!==next)el.textContent=next}); setTimeout(sync,0); const g=document.getElementById('imageGrid'); if(g)new MutationObserver(sync).observe(g,{childList:true,subtree:true}); }
  if (decodeURI(location.pathname).endsWith('算力算法调度管理-模型版本管理.html')) { const s=document.createElement('script'); s.src='模型版本管理增强.js'; document.body.appendChild(s); }
  if (decodeURI(location.pathname).endsWith('算力算法调度管理-模型发布管理.html')) { const s=document.createElement('script'); s.src='算法版本记录增强.js'; document.body.appendChild(s); }
  if (/算力算法调度管理-(样本与数据集|数据集详情)\.html$/.test(decodeURI(location.pathname))) { const s=document.createElement('script'); s.src='训练任务详情抽屉.js'; document.body.appendChild(s); }
  if (decodeURI(location.pathname).endsWith('算力算法调度管理-样本与数据集.html')) { const s=document.createElement('script'); s.src='样本与数据集创建方式增强.js'; document.body.appendChild(s); }
  if (decodeURI(location.pathname).endsWith('算力算法调度管理-样本与数据集.html')) { const s=document.createElement('style'); s.textContent='.page-main table td:last-child{white-space:nowrap;display:flex;align-items:center;gap:6px}.page-main table td:last-child .link{display:inline-flex;align-items:center;justify-content:center;height:28px;padding:0 10px;margin:0;border:1px solid #bfdbfe;border-radius:5px;background:#eff6ff;color:#1d4ed8;font-size:12px;text-decoration:none}.page-main table td:last-child .link:hover{background:#dbeafe;border-color:#2563eb}.page-main table td:last-child .link.danger{border-color:#fecaca;background:#fff5f5;color:#dc2626}.page-main table td:last-child .import-dropdown{display:inline-flex}.page-main table td:last-child .import-trigger{height:28px!important;padding:0 10px!important;border:1px solid #bfdbfe!important;border-radius:5px!important;background:#eff6ff!important;color:#1d4ed8!important;font-size:12px!important;font-weight:600}.page-main table td:last-child .import-trigger:hover{background:#dbeafe!important;border-color:#2563eb!important}'; document.head.appendChild(s); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
