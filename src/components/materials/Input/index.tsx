import { Input } from 'antd';
import { IMaterial } from '@/types/making';
import materialWrap from '../MaterialWrap';

export const InputMaterial: IMaterial = {
    name: '输入框 Input',
    tag: 'Input',
    from: 'antd',
    id: Math.random(),
    component: materialWrap(Input),
    intro: '输入框Input组件',
    props: {},
    haveChildren: false,
    editComponents: [
        { name: 'className' },
        { name: 'style' },
        { name: 'prop', props: { propName: 'placeholder', propType: 'string' } },
    ],
    ext: {
        code: {
            'index.js': {
                importDeclaration: {
                    antd: {
                        export: ['Input'],
                    },
                },
            },
        },
    },
};
