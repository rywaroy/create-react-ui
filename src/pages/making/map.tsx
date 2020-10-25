import React from 'react';
import { IMaterial, IColumn } from '@/types/making';

export function loadMaterial(material: IMaterial) {
    const { tag } = material;
    switch (tag) {
    case 'Table':
        loadTable(material);
        break;
    default:
        break;
    }
}

function loadTable(material: IMaterial) {
    const { columns }: { columns: IColumn[] } = material.props;

    if (columns.length > 0 && columns[columns.length - 1].key === 'action') {
        const column = columns[columns.length - 1];
        column.render = () => (
            <>
                {column.opts.map((item, i) => (item.link ? (
                    <a href="/" target="_blank" className="mr10" key={i}>
                        {item.text}
                    </a>
                ) : (
                    <span className="opt-link" key={i}>
                        {item.text}
                    </span>
                )))}
            </>
        );
    }
}

export const YLComponentsList = [
    { id: 1, tag: 'main', props: { className: 'bg-w' } },
    { id: 0.01, pid: 1, tag: 'SubHeader', name: '页面标题栏', props: { title: '标题' }, initialValue: true },
    { id: 0.02, pid: 0.01, tag: 'Button', name: '导出按钮', props: { children: '导出', type: 'primary' }, initialValue: false },
    { id: 0.03, pid: 1, tag: 'div', props: { className: 'padding20' } },
    { id: 0.04, pid: 0.03, name: '列表筛选表单', tag: 'ListFilter', initialValue: true },
    { id: 0.05, pid: 0.03, name: '表格', tag: 'Table', initialValue: true },
];

export const LYTComponentsList = [
    { id: 1, tag: 'main' },
    { id: 0.01, pid: 1, tag: 'PageHeaderLayout' },
    { id: 0.02, pid: 0.01, tag: 'BreadCrumb', name: '面包屑', initialValue: true },
    { id: 0.03, pid: 0.01, tag: 'ListFilter', name: '列表筛选表单', initialValue: true },
    { id: 0.04, pid: 0.01, tag: 'div', props: { className: 'tableWrapper' } },
    { id: 0.05, pid: 0.04, tag: 'Table', name: '表格', initialValue: true },
    { id: 0.06, pid: 0.04, tag: 'Button', name: '导出按钮', props: { children: '导出Excel', style: { position: 'absolute', right: 0, top: '-40px' } }, initialValue: false },
];
