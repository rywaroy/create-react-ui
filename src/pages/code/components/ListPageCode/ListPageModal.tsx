import React, { Component } from 'react';
import { Modal, message } from 'antd';
import CreateTable from '@/components/CreateTable';
import CreateForm from '@/components/CreateForm';
import { IListPageOption, IListPageButton, IFormObject, ITableObject } from '@/types/code';
import ListPageHeader from './ListPageHeader';
import ListPagePopup from './ListPagePopup';
import styles from './index.less';

interface IProps {
    visible: boolean;
    onCancel: () => void;
    getPageOtion: (pageOption: IListPageOption) => void;
}

interface IState {
    title: string;
    buttons: IListPageButton[];
    popupForms: IFormObject[];
}

class ListPageModal extends Component<IProps, IState> {
    filterForm: any;

    table: any;

    constructor(props: IProps) {
        super(props);
        this.state = {
            title: '', // 页面标题
            buttons: [], // 页面操作按钮
            popupForms: [], // 弹窗列表
        };
    }

    formObject: IFormObject; // 表单对象

    tableObject: ITableObject; // 表格对象

    /**
     * 生成代码
     */
    create = () => {
        this.filterForm.create();
        this.table.create();
        const { title, buttons } = this.state;
        if (!title) {
            message.error('请输入页面标题');
            return;
        }
        if (!this.tableObject) {
            message.error('请添加页面表格');
            return;
        }
        const { getPageOtion } = this.props;
        const { popupForms } = this.state;
        getPageOtion && getPageOtion({
            title,
            buttons,
            formObject: this.formObject,
            tableObject: this.tableObject,
            popupForms,
        });
    }

    /**
     * 获取筛选表单对象
     */
    getFormObject = (formObject: IFormObject) => {
        this.formObject = formObject;
    }

    /**
     * 获取表格对象
     */
    getTableObject = (tableObject: ITableObject) => {
        this.tableObject = tableObject;
    }

    render() {
        const { visible, onCancel } = this.props;
        const { title, buttons, popupForms } = this.state;
        return (
            <Modal
                visible={visible}
                title="配置"
                width="1200px"
                maskClosable={false}
                onCancel={() => { onCancel(); }}
                onOk={this.create}>
                <div className={styles.listPage}>
                    <div className={styles.listPageBox}>
                        <span className={styles.listPageTag}>页面头部</span>
                        <ListPageHeader
                            title={title}
                            buttons={buttons}
                            popupForms={popupForms}
                            getTitle={text => this.setState({ title: text })}
                            getButtons={list => this.setState({ buttons: list })} />
                    </div>
                    <div className={styles.listPageBox}>
                        <span className={styles.listPageTag}>筛选</span>
                        <CreateForm
                            wrappedComponentRef={el => { this.filterForm = el; }}
                            isEditVariable={false}
                            height={300}
                            width={900}
                            getFormObject={this.getFormObject} />
                    </div>
                    <div className={styles.listPageBox}>
                        <span className={styles.listPageTag}>表格</span>
                        <CreateTable
                            ref={el => { this.table = el; }}
                            isEditVariable={false}
                            popupForms={popupForms}
                            getTableObject={this.getTableObject} />
                    </div>
                    <div className={styles.listPageBox}>
                        <span className={styles.listPageTag}>弹窗</span>
                        <ListPagePopup
                            getForms={forms => { this.setState({ popupForms: forms }); }} />
                    </div>
                </div>
            </Modal>
        );
    }
}

export default ListPageModal;
