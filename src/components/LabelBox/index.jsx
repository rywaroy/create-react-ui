import React, { Component } from 'react';
import { Popover } from 'antd';
import styles from './index.less';

class LabelBox extends Component {
    openBox() {
        this.props.openBox();
    }

    render() {
        const { labelShow, labelList } = this.props;
        const labelTitle = (
            <div className={styles.labelTitle}>
                label列表
                <span>(点击复制)</span>
            </div>
        );
        const LabelList = (
            <div className={styles.labelList}>
                {
                    labelList.map(item => (
                        <div className={styles.labelItem}>{item.name}</div>
                    ))
                }
            </div>
        );
        return (
            <Popover placement="topRight" title={labelTitle} content={LabelList} trigger="click" visible={labelShow}>
                <div className={styles.labelBox}>
                    <div className={labelShow ? styles.labelIconActive : styles.labelIcon} onClick={() => this.openBox()} />
                </div>
            </Popover>
        );
    }
}

export default LabelBox;
