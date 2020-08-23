import { Row, Col, Button, Table } from 'antd';
import { IMaterial } from '@/types/making';
import { DivMaterial } from './DivTag';
import { SpanMaterial } from './SpanTag';

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
    component: Table,
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

const materials: IMaterial[] = [
    RowMaterial,
    ColMaterial,
    ButtonMaterial,
    DivMaterial,
    SpanMaterial,
    TableMaterial,
];

export default materials;
