import { DatePicker } from 'antd';
import { IMaterial } from '@/types/making';
import materialWrap from '../MaterialWrap';

export const DatePickerMaterial: IMaterial = {
    name: '日期选择框 DatePicker',
    tag: 'DatePicker',
    from: 'antd',
    id: Math.random(),
    component: materialWrap(DatePicker, 'inline-block'),
    intro: '日期选择框 DatePicker组件',
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
                        export: ['DatePicker'],
                    },
                },
            },
        },
    },
};
