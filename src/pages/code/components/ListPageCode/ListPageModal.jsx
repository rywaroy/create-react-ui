import React, { Component } from 'react';
import { Modal, Input, Button, Popover } from 'antd';
import styles from './index.less';


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
     * 添加按钮
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

    /**
     * 删除按钮
     */
    deleteButton = index => {
        const buttons = [...this.state.buttons];
        buttons.splice(index, 1);
        this.setState({ buttons });
    }

    render() {
        const { visible, onCancel } = this.props;
        const { title, buttonTitle, buttons } = this.state;
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
                            {
                                buttons.map((item, index) => (
                                    <Popover trigger="hover" content={<span className={styles.deleteButton} onClick={() => this.deleteButton(index)}>删除</span>} key={index}>
                                        <Button type="primary" className={styles.button}>{item}</Button>
                                    </Popover>
                                ))
                            }
                            <Input placeholder="回车添加操作按钮" className={styles.buttonInput} onChange={e => this.setState({ buttonTitle: e.target.value })} onKeyDown={this.addButton} value={buttonTitle} />
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default ListPageModal;
