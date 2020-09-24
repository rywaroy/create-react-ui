import { InputNumber } from 'antd';
import { IMaterial } from '@/types/making';
import materialWrap from '../MaterialWrap';

export const InputNumberMaterial: IMaterial = {
    name: '输入框 InputNumber',
    tag: 'InputNumber',
    from: 'antd',
    id: Math.random(),
    component: materialWrap(InputNumber, 'inline-block'),
    intro: '输入框InputNumber组件',
    props: {},
    haveChildren: false,
    editComponents: [
        { name: 'className' },
        { name: 'style' },
        { name: 'prop', props: { propName: 'max', propType: 'number' } },
        { name: 'prop', props: { propName: 'min', propType: 'number' } },
        { name: 'prop', props: { propName: 'precision', propType: 'number' } },
        { name: 'prop', props: { propName: 'step', propType: 'number' } },
    ],
    ext: {
        code: {
            'index.js': {
                importDeclaration: {
                    antd: {
                        export: ['InputNumber'],
                    },
                },
            },
        },
    },
};
