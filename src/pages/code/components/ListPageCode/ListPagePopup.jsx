import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import CreateForm from '@/components/CreateForm';
import GenerateForm from '@/components/GenerateForm';
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

    /**
     * 接收form
     */
    getFormObject = values => {
        const forms = [...this.state.forms];
        const { name } = values;
        values.name = this.checkName(name, forms);
        forms.push(values);
        this.setState({
            forms,
        });
    }

    /**
     * 检查同名
     */
    checkName(name, forms) {
        for (let i = 0; i < forms.length; i++) {
            if (forms[i].name === name) {
                name = `${name}1`;
                return this.checkName(name, forms);
            }
        }
        return name;
    }

    /**
     * 删除弹窗
     */
    deletePopup(index) {
        const forms = [...this.state.forms];
        forms.splice(index, 1);
        this.setState({
            forms,
        });
    }

    render() {
        const { visible, modalKey, forms } = this.state;

        return (
            <div>
                <Button type="primary" onClick={this.addPopup}>添加弹窗</Button>
                <div className={styles.popupBox}>
                    {
                        forms.map((item, index) => (
                            <div className={styles.popupItem} style={{ width: `${item.width}px` }} key={item.name}>
                                <Button type="primary" icon="delete" size="small" className={styles.popupDelete} onClick={() => this.deletePopup(index)} />
                                <GenerateForm
                                    isEdit={false}
                                    formSet={item.options} />
                            </div>
                        ))
                    }

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
