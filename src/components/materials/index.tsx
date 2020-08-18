import { Row, Col } from 'antd';
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
    DivMaterial,
    SpanMaterial,
];

export default materials;
