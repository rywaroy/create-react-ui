import React, { Component } from 'react';
import { Modal, message } from 'antd';
import CreateTable from '@/components/CreateTable';
import CreateForm from '@/components/CreateForm';
import { IListPageOption, IListPageButton, IFormObject, IColumn, IDataSource } from '@/types/code';
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

    tableCode = '' // 表格代码

    tableColumns: IColumn[] = [] // 表格配置

    tableData: IDataSource[] = [] // 表格数据

    formCode = '' // filter表单代码

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
        if (this.tableColumns.length === 0) {
            message.error('请添加页面表格');
            return;
        }
        const { getPageOtion } = this.props;
        const { popupForms } = this.state;
        getPageOtion && getPageOtion({
            title,
            buttons,
            tableCode: this.tableCode,
            tableColumns: this.tableColumns,
            tableData: this.tableData,
            formCode: this.formCode,
            popupForms,
        });
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
                            getCode={code => { this.formCode = code; }} />
                    </div>
                    <div className={styles.listPageBox}>
                        <span className={styles.listPageTag}>表格</span>
                        <CreateTable
                            ref={el => { this.table = el; }}
                            isEditVariable={false}
                            popupForms={popupForms}
                            getCode={code => { this.tableCode = code; }}
                            getColumns={columns => { this.tableColumns = columns; }}
                            getDataSource={data => { this.tableData = data; }} />
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
