import React, { Component } from 'react';
import { Popover } from 'antd';
import styles from './index.less';

class LabelBox extends Component {
    openBox() {
        this.props.openBox();
    }

    render() {
        const { labelShow } = this.props;
        return (
            <Popover placement="topRight" content={111} trigger="click" visible={labelShow}>
                <div className={styles.labelBox}>
                    <div className={labelShow ? styles.labelIconActive : styles.labelIcon} onClick={() => this.openBox()} />
                </div>
            </Popover>
        );
    }
}

export default LabelBox;
