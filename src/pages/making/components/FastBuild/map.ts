export const YLComponentsList = [
    { id: 1, tag: 'main', props: { className: 'bg-w' } },
    { id: 0.01, pid: 1, tag: 'SubHeader', name: '页面标题栏', props: { title: '标题' } },
    { id: 0.02, pid: 0.01, tag: 'Button', name: '导出按钮', props: { children: '导出', type: 'primary' } },
    { id: 0.03, pid: 1, tag: 'div', props: { className: 'padding20' } },
    { id: 0.04, pid: 0.03, name: '列表筛选表单', tag: 'ListFilter' },
    { id: 0.05, pid: 0.03, name: '表格', tag: 'Table' },
];

export const LYTComponentsList = [
    { id: 1, tag: 'main' },
    { id: 0.01, pid: 1, tag: 'PageHeaderLayout' },
    { id: 0.02, pid: 0.01, tag: 'BreadCrumb', name: '面包屑' },
    { id: 0.03, pid: 0.01, tag: 'ListFilter', name: '列表筛选表单' },
    { id: 0.04, pid: 0.01, tag: 'div', props: { className: 'tableWrapper' } },
    { id: 0.05, pid: 0.04, tag: 'Table', name: '表格' },
    { id: 0.06, pid: 0.04, tag: 'Button', name: '导出按钮', props: { children: '导出Excel', style: { position: 'absolute', right: 0, top: '-40px' } } },
];
