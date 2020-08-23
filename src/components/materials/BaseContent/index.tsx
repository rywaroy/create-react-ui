import React from 'react';
import { IMaterial } from '@/types/making';
import styles from './index.less';

const BaseContent: React.FC<any> = (props) => (
    <div className={styles.baseContent} {...props} />
);

export const BaseContentMaterial: IMaterial = {
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
    haveWrap: false,
    editComponents: [],
};

export default BaseContent;
