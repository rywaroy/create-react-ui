import { Form } from 'antd';
import { IMaterial } from '@/types/making';
import materialWrap from '../MaterialWrap';

export const FormMaterial: IMaterial = {
    name: '表单Form',
    tag: 'Form',
    from: 'antd',
    id: Math.random(),
    component: materialWrap(Form),
    intro: '表单Form组件',
    props: {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 10,
        },
    },
    haveChildren: true,
    editComponents: [
        { name: 'className' },
        { name: 'style' },
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
                destructuring: {
                    props: ['form'],
                    form: ['getFieldDecorator'],
                },
            },
        },
    },
};
