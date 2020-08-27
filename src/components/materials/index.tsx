import { Row, Col, Button, Table, Form, InputNumber, Input, Select, DatePicker, Checkbox, Radio } from 'antd';
import { IMaterial } from '@/types/making';
import { DivMaterial } from './DivTag';
import { SpanMaterial } from './SpanTag';
import { PMaterial } from './PTag';
import { GenerateFormMaterial } from './GenerateForm';
import { ListFilterMaterial } from './ListFilter';
import materialWrap from './MaterialWrap';

const ColMaterial: IMaterial = {
    name: '栅格 Col',
    tag: 'Col',
    from: 'antd',
    id: 1,
    component: Col,
    intro: 'col',
    props: {
        span: 12,
    },
    defaultProps: {},
    haveChildren: true,
    haveWrap: false,
    editComponents: [
        { name: 'className' },
        { name: 'style' },
        { name: 'prop', props: { propName: 'span', propType: 'number' } },
    ],
};

const RowMaterial: IMaterial = {
    name: '栅格 Row',
    tag: 'Row',
    from: 'antd',
    id: 2,
    component: Row,
    intro: 'row',
    props: {
        gutter: 24,
    },
    haveChildren: true,
    haveWrap: false,
    editComponents: [
        { name: 'className' },
        { name: 'style' },
    ],
    children: [
        { ...ColMaterial, id: 1 },
        { ...ColMaterial, id: 2 },
    ],
};

const ButtonMaterial: IMaterial = {
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
};

const TableMaterial: IMaterial = {
    name: '表格 Table',
    tag: 'Table',
    from: 'antd',
    id: Math.random(),
    component: materialWrap(Table),
    intro: 'antd 表格组件',
    props: {
        columns: [
            { title: '属性1', dataIndex: '属性1' },
            { title: '属性2', dataIndex: '属性2' },
            { title: '属性3', dataIndex: '属性3' },
            { title: '属性4', dataIndex: '属性4' },
            { title: '属性5', dataIndex: '属性5' },
        ],
        dataSource: [
            { 属性1: '测试数据', 属性2: '测试数据', 属性3: '测试数据', 属性4: '测试数据', 属性5: '测试数据', id: 1 },
            { 属性1: '测试数据', 属性2: '测试数据', 属性3: '测试数据', 属性4: '测试数据', 属性5: '测试数据', id: 2 },
        ],
        rowKey: 'id',
    },
    haveChildren: false,
    editComponents: [
        { name: 'className' },
        { name: 'style' },
        { name: 'table' },
    ],
};

const FormMaterial: IMaterial = {
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
};

const InputMaterial: IMaterial = {
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
};

const FormItemMaterial: IMaterial = {
    name: 'Form.Item',
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
};

const InputNumberMaterial: IMaterial = {
    name: '输入框 InputNumber',
    tag: 'InputNumber',
    from: 'antd',
    id: Math.random(),
    component: materialWrap(InputNumber, 'inline-block'),
    intro: '输入框InputNumber组件',
    props: {},
    haveChildren: false,
    editComponents: [
        { name: 'className' },
        { name: 'style' },
        { name: 'prop', props: { propName: 'max', propType: 'number' } },
        { name: 'prop', props: { propName: 'min', propType: 'number' } },
        { name: 'prop', props: { propName: 'precision', propType: 'number' } },
        { name: 'prop', props: { propName: 'step', propType: 'number' } },
    ],
};

const SelectMaterial: IMaterial = {
    name: '选择框 Select',
    tag: 'Select',
    from: 'antd',
    id: Math.random(),
    component: materialWrap(Select, 'inline-block'),
    intro: '选择框 Select组件',
    props: {
        style: {
            width: '200px',
        },
    },
    haveChildren: false,
    editComponents: [
        { name: 'className' },
        { name: 'style' },
    ],
};

const PasswordMaterial: IMaterial = {
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
};

const DatePickerMaterial: IMaterial = {
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
};

const { RangePicker, MonthPicker } = DatePicker;

const MonthPickerMaterial: IMaterial = {
    name: '月份选择框 MonthPicker',
    tag: 'MonthPicker',
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
};

const RangePickerMaterial: IMaterial = {
    name: '时间区间选择框 RangePicker',
    tag: 'RangePicker',
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
};

const CheckboxGroupMaterial: IMaterial = {
    name: '多选 CheckboxGroup',
    tag: 'Checkbox.Group',
    from: 'antd',
    id: Math.random(),
    component: materialWrap(Checkbox.Group, 'inline-block'),
    intro: '多选 CheckboxGroup组件',
    props: {
        options: [
            { label: '测试数据1', value: '测试数据1' },
            { label: '测试数据2', value: '测试数据2' },
        ],
    },
    haveChildren: false,
    editComponents: [
        { name: 'className' },
        { name: 'style' },
    ],
};

const TextAreaGroupMaterial: IMaterial = {
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
};

const RadioGroupMaterial: IMaterial = {
    name: '单选 RadioGroup',
    tag: 'Radio.Group',
    from: 'antd',
    id: Math.random(),
    component: materialWrap(Radio.Group, 'inline-block'),
    intro: '单选 RadioGroup组件',
    props: {
        options: [
            { label: '测试数据1', value: '测试数据1' },
            { label: '测试数据2', value: '测试数据2' },
        ],
    },
    haveChildren: false,
    editComponents: [
        { name: 'className' },
        { name: 'style' },
    ],
};

const materials: IMaterial[] = [
    RowMaterial,
    ColMaterial,
    ButtonMaterial,
    DivMaterial,
    SpanMaterial,
    PMaterial,
    TableMaterial,
    GenerateFormMaterial,
    ListFilterMaterial,
    FormMaterial,
    FormItemMaterial,
    InputMaterial,
    TextAreaGroupMaterial,
    SelectMaterial,
    CheckboxGroupMaterial,
    RadioGroupMaterial,
    InputNumberMaterial,
    PasswordMaterial,
    DatePickerMaterial,
    MonthPickerMaterial,
    RangePickerMaterial,
];

export default materials;
