import { Select } from 'antd';
import { IMaterial } from '@/types/making';
import materialWrap from '../MaterialWrap';

export const SelectMaterial: IMaterial = {
    name: '选择框 Select',
    tag: 'Select',
    from: 'antd',
    id: Math.random(),
    component: materialWrap(Select, 'inline-block'),
    intro: '选择框 Select组件',
    props: {
        style: {
            width: '200px',
        },
    },
    haveChildren: false,
    editComponents: [
        { name: 'className' },
        { name: 'style' },
    ],
    ext: {
        code: {
            'index.js': {
                importDeclaration: {
                    antd: {
                        export: ['Select'],
                    },
                },
            },
        },
    },
};
