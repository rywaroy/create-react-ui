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
            forms: [], // 弹窗列表
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
     * 接收form
     */
    getFormObject = values => {
        const forms = [...this.state.forms];
        forms.push(values);
        this.setState({
            forms,
        });
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
                    zIndex={1002}>
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
