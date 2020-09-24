import { Input } from 'antd';
import { IMaterial } from '@/types/making';
import materialWrap from '../MaterialWrap';

export const TextAreaGroupMaterial: IMaterial = {
    name: '文本框 TextArea',
    tag: 'Input.TextArea',
    from: 'antd',
    id: Math.random(),
    component: materialWrap(Input.TextArea, 'inline-block'),
    intro: '文本框 TextArea组件',
    props: {},
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
                        export: ['Input'],
                    },
                },
            },
        },
    },
};
