import { Col } from 'antd';
import { IMaterial } from '@/types/making';

export const ColMaterial: IMaterial = {
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
    ext: {
        code: {
            'index.js': {
                importDeclaration: {
                    antd: {
                        export: ['Col'],
                    },
                },
            },
        },
    },
};
