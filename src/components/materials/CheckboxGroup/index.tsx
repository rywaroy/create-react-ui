import { Checkbox } from 'antd';
import { IMaterial } from '@/types/making';
import materialWrap from '../MaterialWrap';

export const CheckboxGroupMaterial: IMaterial = {
    name: '多选 CheckboxGroup',
    tag: 'Checkbox.Group',
    from: 'antd',
    id: Math.random(),
    component: materialWrap(Checkbox.Group, 'inline-block'),
    intro: '多选 CheckboxGroup组件',
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
                        export: ['Checkbox'],
                    },
                },
            },
        },
    },
};
