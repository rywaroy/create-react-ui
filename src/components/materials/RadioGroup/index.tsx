import { Radio } from 'antd';
import { IMaterial } from '@/types/making';
import materialWrap from '../MaterialWrap';

export const RadioGroupMaterial: IMaterial = {
    name: '单选 RadioGroup',
    tag: 'Radio.Group',
    from: 'antd',
    id: Math.random(),
    component: materialWrap(Radio.Group, 'inline-block'),
    intro: '单选 RadioGroup组件',
    props: {
        options: [
            { label: '测试数据1', value: '测试数据1' },
            { label: '测试数据2', value: '测试数据2' },
        ],
    },
    haveChildren: false,
    editComponents: [
        { name: 'className' },
        { name: 'style' },
        { name: 'options', props: { propName: 'options' } },
    ],
    ext: {
        code: {
            'index.js': {
                importDeclaration: {
                    antd: {
                        export: ['Radio'],
                    },
                },
            },
        },
    },
};
