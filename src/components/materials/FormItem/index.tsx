import React from 'react';
import { Form } from 'antd';
import { IMaterial } from '@/types/making';

const FormItem: React.FC<any> = (props) => (
    <Form.Item {...props} />
);

export const FormItemMaterial: IMaterial = {
    name: 'Form.Item',
    tag: 'Form.Item',
    from: 'antd',
    id: Math.random(),
    component: FormItem,
    intro: 'Form Input标签',
    props: {
        label: '标签名',
    },
    haveWrap: false,
    haveChildren: true,
    editComponents: [
        { name: 'prop', props: { propName: 'label', propType: 'string' } },
        { name: 'layout' },
    ],
};

export default FormItem;
