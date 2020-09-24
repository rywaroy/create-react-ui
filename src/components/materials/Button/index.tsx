import { Button } from 'antd';
import { IMaterial } from '@/types/making';
import materialWrap from '../MaterialWrap';

export const ButtonMaterial: IMaterial = {
    name: '按钮 Button',
    tag: 'Button',
    from: 'antd',
    id: Math.random(),
    component: materialWrap(Button, 'inline-block'),
    intro: 'antd 按钮组件',
    props: {
        children: '按钮',
        type: 'primary',
    },
    haveChildren: false,
    editComponents: [
        { name: 'className' },
        { name: 'style' },
        { name: 'prop', props: { propName: 'type', propType: 'string' } },
        { name: 'prop', props: { propName: 'children', propType: 'string' } },
    ],
    ext: {
        code: {
            'index.js': {
                importDeclaration: {
                    antd: {
                        export: ['Button'],
                    },
                },
            },
        },
    },
};
