import React, { Component } from 'react';
import { Modal, message } from 'antd';
import CreateTable from '@/components/CreateTable';
import CreateForm from '@/components/CreateForm';
import ListPageHeader from './ListPageHeader';
import ListPagePopup from './ListPagePopup';
import styles from './index.less';


class ListPageModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '', // 页面标题
            buttons: [], // 页面操作按钮
        };
    }

    tableCode = '' // 表格代码

    tableColumns = [] // 表格配置

    tableData = [] // 表格数据

    formCode = '' // filter表单代码

    popupForms = [] // 弹窗列表

    /**
     * 生成代码
     */
    create = () => {
        this.filterForm.create();
        this.table.create();
        this.popup.create();
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
        getPageOtion && getPageOtion({
            title,
            buttons,
            tableCode: this.tableCode,
            tableColumns: this.tableColumns,
            tableData: this.tableData,
            formCode: this.formCode,
            popupForms: this.popupForms,
        });
    }


    render() {
        const { visible, onCancel } = this.props;
        const { title, buttons } = this.state;
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
                            getTitle={text => this.setState({ title: text })}
                            getButtons={list => this.setState({ buttons: list })} />
                    </div>
                    <div className={styles.listPageBox}>
                        <span className={styles.listPageTag}>筛选</span>
                        <CreateForm
                            wrappedComponentRef={el => { this.filterForm = el; }}
                            isEditVariable={false}
                            height={150}
                            getCode={code => { this.formCode = code; }} />
                    </div>
                    <div className={styles.listPageBox}>
                        <span className={styles.listPageTag}>表格</span>
                        <CreateTable
                            ref={el => { this.table = el; }}
                            isEditVariable={false}
                            getCode={code => { this.tableCode = code; }}
                            getColumns={columns => { this.tableColumns = columns; }}
                            getDataSource={data => { this.tableData = data; }} />
                    </div>
                    <div className={styles.listPageBox}>
                        <span className={styles.listPageTag}>弹窗</span>
                        <ListPagePopup
                            ref={el => { this.popup = el; }}
                            getForms={forms => { this.popupForms = forms; }} />
                    </div>
                </div>
            </Modal>
        );
    }
}

export default ListPageModal;
