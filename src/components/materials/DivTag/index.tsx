import React from 'react';
import styles from './index.less';

const DivTag: React.FC<any> = (props) => (
    <div className={styles.divStyle} {...props} />
);

export default DivTag;
