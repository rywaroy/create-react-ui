import React, { Component } from 'react';
import { Button } from 'antd';
import styles from '../index.less';

class TemplateItem extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        const { title, intro, imgClassName } = this.props;
        return (
            <li className={styles.item}>
                <div className={`${styles.img} ${imgClassName}`}>
                    <div className={styles.mask}>
                        <Button type="primary">添加到项目</Button>
                    </div>
                </div>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.intro}>{intro}</p>
            </li>
        );
    }
}

export default TemplateItem;