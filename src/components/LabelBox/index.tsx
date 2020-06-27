import React, { Component } from 'react';
import { Popover } from 'antd';
import Clipboard from 'clipboard';
import { ILabelItem } from '@/types/file';
import styles from './index.less';

interface IProps {
    openBox: () => void;
    labelShow: boolean;
    labelList: ILabelItem[];
}

class LabelBox extends Component<IProps, null> {
    clipboard: Clipboard

    openBox() {
        this.props.openBox();
    }

    componentDidMount() {
        this.clipboard = new Clipboard('.label-text-copy');
    }

    componentWillUnmount() {
        this.clipboard.destroy();
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
                        <div className={`${styles.labelItem} label-text-copy`} data-clipboard-text={item.name}>{item.name}</div>
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
