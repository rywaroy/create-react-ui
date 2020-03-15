import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import CreateForm from '@/components/CreateForm';

class ListPagePopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            modalKey: Math.random(),
        };
    }

    /**
     * 打开弹窗配置弹窗
     */
    addPopup = () => {
        this.setState({
            visible: true,
            modalKey: Math.random(),
        });
    }

    render() {
        const { visible, modalKey } = this.state;

        return (
            <div>
                <Button type="primary" onClick={this.addPopup}>添加弹窗</Button>
                <Modal
                    title="popup组件配置"
                    width="1400px"
                    visible={visible}
                    key={modalKey}
                    maskClosable={false}
                    zIndex={1002}>
                    <CreateForm
                        type="modal" />
                </Modal>
            </div>
        );
    }
}

export default ListPagePopup;
