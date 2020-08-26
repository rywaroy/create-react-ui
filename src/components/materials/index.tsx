import { Row, Col, Button, Table, Form, InputNumber, Input } from 'antd';
import { IMaterial } from '@/types/making';
import { DivMaterial } from './DivTag';
import { SpanMaterial } from './SpanTag';
import { PMaterial } from './PTag';
import { GenerateFormMaterial } from './GenerateForm';
import { ListFilterMaterial } from './ListFilter';
import materialWrap from './MaterialWrap';

const ColMaterial: IMaterial = {
    name: '栅格',
    tag: 'Col',
    from: 'antd',
    id: 1,
    component: Col,
    intro: 'col',
    props: {
        span: 12,
    },
    defaultProps: {
        style: {
            minHeight: '50px',
        },
    },
    haveChildren: true,
    haveWrap: false,
    editComponents: [
        { name: 'prop', props: { propName: 'span', propType: 'number' } },
    ],
};

const RowMaterial: IMaterial = {
    name: '栅格',
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
    editComponents: [],
    children: [
        { ...ColMaterial, id: 1 },
        { ...ColMaterial, id: 2 },
    ],
};

const ButtonMaterial: IMaterial = {
    name: '按钮',
    tag: 'Button',
    from: 'antd',
    id: Math.random(),
    component: Button,
    intro: 'antd 按钮组件',
    props: {
        children: '按钮',
        type: 'primary',
    },
    haveChildren: false,
    haveWrap: false,
    editComponents: [
        { name: 'prop', props: { propName: 'type', propType: 'string' } },
        { name: 'prop', props: { propName: 'children', propType: 'string' } },
    ],
};

const TableMaterial: IMaterial = {
    name: '表格',
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
    props: {
        placeholder: '111',
    },
    haveChildren: false,
    editComponents: [],
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
        { name: 'prop', props: { propName: 'label', propType: 'string' } },
        { name: 'layout' },
    ],
};

const InputNumberMaterial: IMaterial = {
    name: '输入框 InputNumber',
    tag: 'InputNumber',
    from: 'antd',
    id: Math.random(),
    component: materialWrap(InputNumber),
    intro: '输入框InputNumber组件',
    props: {},
    haveWrap: false,
    haveChildren: false,
    editComponents: [],
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
    InputNumberMaterial,
];

export default materials;
