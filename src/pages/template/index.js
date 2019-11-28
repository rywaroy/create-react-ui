import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import styles from './index.css';

class Template extends Component {

    render() {
        return (
            <div>
                <ul className="clearfix">
                    <li className={styles.item}>
                        <div className={`${styles.img} ${styles.defaultImg}`}>
                            <div className={styles.mask}>
                                <Button type="primary">添加到项目</Button>
                            </div>
                        </div>
                        <h3 className={styles.title}>默认react模板</h3>
                        <p className={styles.intro}>包含index.js 可配置变量名</p>
                    </li>
                </ul>
            </div>
        );
    }
}

export default connect(({ global }) => ({ global }))(Template);