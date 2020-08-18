import React from 'react';
import { IMaterial } from '@/types/making';
import styles from './index.less';

const DivTag: React.FC<any> = (props) => (
    <div className={styles.divStyle} {...props} />
);

export const DivMaterial: IMaterial = {
    name: 'div',
    tag: 'div',
    from: '',
    id: 3,
    component: DivTag,
    intro: 'div标签',
    props: {},
    haveChildren: true,
    editComponents: [
        { name: 'className' },
        { name: 'style' },
    ],
};

export default DivTag;
