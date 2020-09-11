import { Form } from 'antd';
import { IMaterial } from '@/types/making';
import materialWrap from '../MaterialWrap';

export const FormItemMaterial: IMaterial = {
    name: '表单 Form.Item',
    tag: 'Form.Item',
    from: 'antd',
    id: Math.random(),
    component: materialWrap(Form.Item),
    intro: 'Form Input标签',
    props: {
        label: '标签名',
    },
    haveChildren: true,
    editComponents: [
        { name: 'className' },
        { name: 'style' },
        { name: 'prop', props: { propName: 'label', propType: 'string' } },
        { name: 'layout' },
    ],
    ext: {
        code: {
            'index.js': {
                importDeclaration: {
                    antd: {
                        export: ['Form'],
                    },
                },
            },
        },
    },
};
