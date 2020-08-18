import React from 'react';
import { IMaterial } from '@/types/making';
import styles from './index.less';

const SpanTag: React.FC<any> = (props) => (
    <span className={styles.spanStyle} {...props} />
);

export const SpanMaterial: IMaterial = {
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

export default SpanTag;
