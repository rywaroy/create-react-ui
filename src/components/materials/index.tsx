import { Row, Col } from 'antd';
import { IMaterial } from '@/types/making';
import BaseContent from './BaseContent';
import DivTag from './DivTag';
import SpanTag from './SpanTag';

export const baseContent: IMaterial = {
    name: '根组件',
    tag: 'BaseContent',
    from: 'xxx',
    id: 1,
    component: BaseContent,
    intro: '根目录',
    props: {},
    defaultProps: {
        style: {
            width: '100%',
            height: '100%',
        },
    },
    haveChildren: true,
    editComponents: [],
};

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
    editComponents: [],
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
        ColMaterial,
        ColMaterial,
    ],
};

const DivMaterial: IMaterial = {
    name: 'div',
    tag: 'div',
    from: '',
    id: 3,
    component: DivTag,
    intro: 'div标签',
    props: {},
    haveChildren: true,
    editComponents: [],
};

const SpanMaterial: IMaterial = {
    name: 'span',
    tag: 'span',
    from: '',
    id: 4,
    component: SpanTag,
    intro: 'span标签',
    props: {
        children: ['测试文字测试文字'],
    },
    haveChildren: false,
    editComponents: [],
};

const materials: IMaterial[] = [
    RowMaterial,
    ColMaterial,
    DivMaterial,
    SpanMaterial,
];

export default materials;
