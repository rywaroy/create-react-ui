import { DatePicker } from 'antd';
import { IMaterial } from '@/types/making';
import materialWrap from '../MaterialWrap';

const { MonthPicker } = DatePicker;

export const MonthPickerMaterial: IMaterial = {
    name: '月份选择框 MonthPicker',
    tag: 'DatePicker.MonthPicker',
    from: 'antd',
    id: Math.random(),
    component: materialWrap(MonthPicker, 'inline-block'),
    intro: '月份选择框 MonthPicker组件',
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
