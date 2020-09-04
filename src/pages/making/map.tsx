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
