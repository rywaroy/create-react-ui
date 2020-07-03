import React, { Component } from 'react';
import { Input, Button, Popover, message, Modal, Select } from 'antd';
import { IListPageButton, IFormObject } from '@/types/code';
import styles from './index.less';

interface IProps {
    title: string;
    buttons: IListPageButton[];
    popupForms: IFormObject[];
    getTitle: (value: string) => void;
    getButtons: (bottons: IListPageButton[]) => void;
}

interface IState {
    buttonTitle: string;
    visible: boolean;
    popKey: number;
    popName: string;
    popIndex: number;
}

class ListPageHeader extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            buttonTitle: '',
            visible: false,
            popKey: Math.random(),
            popName: '',
            popIndex: 0,
        };
    }

    /**
     * 传出标题内容
     */
    sendTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.getTitle(e.target.value);
    }

    /**
     * 添加按钮
     */
    addButton = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13) {
            const { buttons } = this.props;
            const { buttonTitle } = this.state;
            const newButtons = [...buttons];
            newButtons.push({
                title: buttonTitle,
            });
            this.setState({
                buttonTitle: '',
            });
            this.props.getButtons(newButtons);
        }
    }

    /**
     * 删除按钮
     */
    deleteButton = (index: number) => {
        const buttons = [...this.props.buttons];
        buttons.splice(index, 1);
        this.props.getButtons(buttons);
    }

    /**
     * 链接弹窗
     */
    linkPop = (index: number) => {
        if (this.props.popupForms.length === 0) {
            message.error('暂无弹窗');
            return;
        }
        this.setState({
            visible: true,
            popIndex: index,
            popKey: Math.random(),
        });
    }

    /**
     * 关闭弹窗列表
     */
    closePop = () => {
        this.setState({
            visible: false,
        });
    }

    /**
     * 选择弹窗
     */
    popChange = (value: string) => {
        this.setState({
            popName: value,
        });
    }

    /**
     * 确认弹窗
     */
    selectPop = () => {
        const { buttons } = this.props;
        const { popIndex, popName } = this.state;
        const newButtons = [...buttons];
        newButtons[popIndex].linkName = popName;
        this.props.getButtons(newButtons);
        this.closePop();
    }

    render() {
        const { title, buttons, popupForms } = this.props;
        const { buttonTitle, visible, popKey } = this.state;

        return (
            <div className={styles.title}>
                <Input placeholder="页面标题" className={styles.titleInput} value={title} onChange={this.sendTitle} />
                <div>
                    {
                        buttons.map((item, index) => (
                            <Popover
                                trigger="hover"
                                content={(
                                    <>
                                        <span className={styles.deleteButton} onClick={() => this.deleteButton(index)}>删除</span>
                                        <span className={styles.deleteButtonLine}>|</span>
                                        <span className={styles.deleteButton} onClick={() => this.linkPop(index)}>链接弹窗</span>
                                    </>
                                )}
                                key={index}>
                                <Button type="primary" className={styles.button}>{item.title}</Button>
                            </Popover>
                        ))
                    }
                    <Input placeholder="回车添加操作按钮" className={styles.buttonInput} onChange={e => this.setState({ buttonTitle: e.target.value })} onKeyDown={this.addButton} value={buttonTitle} />
                </div>
                <Modal
                    title="弹窗列表"
                    visible={visible}
                    key={popKey}
                    onCancel={this.closePop}
                    onOk={this.selectPop}>
                    <Select style={{ width: '100%' }} onChange={this.popChange}>
                        {
                            popupForms.map((item, index) => (
                                <Select.Option value={item.name} key={index}>
                                    {item.title}
                                    -
                                    {item.name}
                                </Select.Option>
                            ))
                        }
                    </Select>
                </Modal>
            </div>
        );
    }
}

export default ListPageHeader;
