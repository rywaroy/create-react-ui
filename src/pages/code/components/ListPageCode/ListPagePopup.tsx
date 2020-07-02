import React, { Component } from 'react';
import { Button, Modal, Input } from 'antd';
import CreateForm from '@/components/CreateForm';
import GenerateForm from '@/components/GenerateForm';
import { IFormObject } from '@/types/code';
import styles from './index.less';

interface IProps {
    getForms: (forms: IFormObject[]) => void;
}

interface IState {
    visible: boolean;
    modalKey: number;
    forms: IFormObject[];
}

class ListPagePopup extends Component<IProps, IState> {
    createForm: any;

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
    getFormObject = (values: IFormObject) => {
        const forms = [...this.state.forms];
        const { name } = values;
        values.name = this.checkName(name, forms);
        forms.push(values);
        this.setState({
            forms,
        }, () => this.props.getForms(forms));
    }

    /**
     * 检查同名
     */
    checkName(name: string, forms: IFormObject[]) {
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
    deletePopup(index: number) {
        const forms = [...this.state.forms];
        forms.splice(index, 1);
        this.setState({
            forms,
        }, () => this.props.getForms(forms));
    }

    /**
     * 修改弹窗标题
     */
    changePopupTitle = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const forms = [...this.state.forms];
        forms[index].title = e.target.value;
        this.setState({
            forms,
        }, () => this.props.getForms(forms));
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
                                <div className={styles.popupTitle}>
                                    弹窗标题：
                                    <Input className={styles.popupTitleInput} value={item.title} allowClear onChange={(e) => this.changePopupTitle(e, index)} />
                                </div>

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
