import { Input } from 'antd';
import { IMaterial } from '@/types/making';
import materialWrap from '../MaterialWrap';

export const PasswordMaterial: IMaterial = {
    name: '密码框 Password',
    tag: 'Input.Password',
    from: 'antd',
    id: Math.random(),
    component: materialWrap(Input.Password, 'inline-block'),
    intro: '密码框 Password组件',
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
