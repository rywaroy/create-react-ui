import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import CreateForm from '@/components/CreateForm';
// import GenerateForm from '@/components/GenerateForm';
import styles from './index.less';

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

    /**
     * 关闭弹窗配置弹窗
     */
    closePopupModal = () => {
        this.setState({
            visible: false,
        });
    }

    /**
     * 生成弹窗
     */
    createPopup = () => {
        this.createForm.create();
        this.closePopupModal();
    }

    render() {
        const { visible, modalKey } = this.state;

        return (
            <div>
                <Button type="primary" onClick={this.addPopup}>添加弹窗</Button>
                <div className={styles.popupBox}>
                    {/* <GenerateForm
                        isEdit={false}
                        forms/> */}
                </div>
                <Modal
                    title="popup组件配置"
                    width="1400px"
                    visible={visible}
                    key={modalKey}
                    maskClosable={false}
                    zIndex={1002}
                    onCancel={this.closePopupModal}
                    onOk={this.createPopup}>
                    <CreateForm
                        type="modal"
                        wrappedComponentRef={ref => { this.createForm = ref; }}
                        getFormObject={this.getFormObject} />
                </Modal>
            </div>
        );
    }
}

export default ListPagePopup;
