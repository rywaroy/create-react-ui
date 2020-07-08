import React from 'react';
import { Button } from 'antd';
import styles from './index.less';

interface IProps {
    title: string;
    intro: string;
    imgClassName: string;
    add: () => void;
}

const TemplateItem:React.FC<IProps> = props => {
    const { title, intro, imgClassName } = props;
    return (
        <div className={styles.item}>
            <div className={`${styles.img} ${imgClassName}`}>
                <div className={styles.mask}>
                    <Button type="primary" onClick={() => props.add()}>添加到项目</Button>
                </div>
            </div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.intro}>{intro}</p>
        </div>
    );
};

export default TemplateItem;
