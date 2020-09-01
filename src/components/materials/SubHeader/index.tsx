import React from 'react';
import { IMaterial } from '@/types/making';
import materialWrap from '../MaterialWrap';
import styles from './index.less';

export default function SubHeader(props) {
    return (
        <div className={`${props.className} ${styles.subHeaderWrap}`}>
            <div className={styles.title}>{props.title}</div>
            <div className={styles.rightContent}>{props.children}</div>
        </div>
    );
}

export const SubHeaderMaterial: IMaterial = {
    name: '页面标题栏',
    tag: 'SubHeader',
    from: '@/componenets',
    id: Math.random(),
    component: materialWrap(SubHeader),
    intro: '页面标题栏组件',
    props: {},
    haveChildren: true,
    editComponents: [
        { name: 'className' },
        { name: 'style' },
        { name: 'prop', props: { propName: 'title', propType: 'string' } },
    ],
};
