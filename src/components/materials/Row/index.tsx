import { Row } from 'antd';
import { IMaterial } from '@/types/making';
import { ColMaterial } from '../Col';

export const RowMaterial: IMaterial = {
    name: '栅格 Row',
    tag: 'Row',
    from: 'antd',
    id: 2,
    component: Row,
    intro: 'row',
    props: {
        gutter: 24,
    },
    haveChildren: true,
    haveWrap: false,
    editComponents: [
        { name: 'className' },
        { name: 'style' },
    ],
    children: [
        { ...ColMaterial, id: 1 },
        { ...ColMaterial, id: 2 },
    ],
    ext: {
        code: {
            'index.js': {
                importDeclaration: {
                    antd: {
                        export: ['Row'],
                    },
                },
            },
        },
    },
};
