import { Row, Col } from 'antd';
import { IMaterial } from '@/types/making';
import BaseContent from './BaseContent';

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

const materials: IMaterial[] = [
    RowMaterial,
    ColMaterial,
];

export default materials;
