import { DatePicker } from 'antd';
import { IMaterial } from '@/types/making';
import materialWrap from '../MaterialWrap';

const { RangePicker } = DatePicker;

export const RangePickerMaterial: IMaterial = {
    name: '时间区间选择框 RangePicker',
    tag: 'DatePicker.RangePicker',
    from: 'antd',
    id: Math.random(),
    component: materialWrap(RangePicker, 'inline-block'),
    intro: '时间区间选择框 RangePicker组件',
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
