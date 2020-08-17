import React from 'react';
import styles from './index.less';

const SpanTag: React.FC<any> = (props) => (
    <span className={styles.spanStyle} {...props} />
);

export default SpanTag;
