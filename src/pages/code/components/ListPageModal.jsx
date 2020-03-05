import React, { Component } from 'react';
import { Modal, Input } from 'antd';
import styles from '../index.less';

class ListPageModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '', // 页面标题
            buttons: [], // 页面操作按钮
            buttonTitle: '', // 操作按钮文字
        };
    }

    /**
     * 添加
     */
    addButton = e => {
        if (e.keyCode === 13) {
            const { buttons, buttonTitle } = this.state;
            const newButtons = [...buttons];
            newButtons.push(buttonTitle);
            this.setState({
                buttons: newButtons,
                buttonTitle: '',
            });
        }
    }

    render() {
        const { visible, onCancel } = this.props;
        const { title, buttonTitle } = this.state;
        return (
            <Modal
                visible={visible}
                title="配置"
                width="1200px"
                onCancel={() => { onCancel(); }}>
                <div className={styles.listPage}>
                    <div className={styles.title}>
                        <Input placeholder="页面标题" className={styles.titleInput} value={title} onChange={e => this.setState({ title: e.target.value })} />
                        <div>
                            <Input placeholder="回车添加操作按钮" className={styles.buttonInput} onChange={e => this.setState({ buttonTitle: e.target.value })} onKeyDown={this.addButton} value={buttonTitle} />
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default ListPageModal;
