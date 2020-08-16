import React from 'react';
import styles from './index.less';

const BaseContent: React.FC<any> = (props) => (
    <div className={styles.baseContent} {...props} />
);

export default BaseContent;
