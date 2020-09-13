import React from 'react';
import { IMaterial } from '@/types/making';
import materialWrap from '../MaterialWrap';
import styles from './index.less';

const PageHeaderLayout: React.FC<any> = (props) => (
    <div className={`${styles.layout} lyt`}>{props.children}</div>
);

export const PageHeaderLayoutMaterial: IMaterial = {
    name: 'layout',
    tag: 'PageHeaderLayout',
    from: '@/layouts/PageHeaderLayout',
    id: Math.random(),
    component: materialWrap(PageHeaderLayout),
    intro: 'PageHeaderLayout',
    props: {},
    project: '陆运通后台',
    haveChildren: true,
    // haveWrap: false,
    editComponents: [
        { name: 'className' },
        { name: 'style' },
    ],
};

export default PageHeaderLayout;
