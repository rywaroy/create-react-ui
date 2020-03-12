import React, { Component } from 'react';
import { Modal } from 'antd';
import CreateTable from '@/components/CreateTable';
import CreateForm from '@/components/CreateForm';
import ListPageHeader from './ListPageHeader';
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

    formCode = '' // filter表单代码


    render() {
        const { visible, onCancel } = this.props;
        const { title, buttons } = this.state;
        return (
            <Modal
                visible={visible}
                title="配置"
                width="1200px"
                onCancel={() => { onCancel(); }}>
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
                            isEditVariable={false}
                            height={150}
                            getCode={code => { this.formCode = code; }} />
                    </div>
                    <div className={styles.listPageBox}>
                        <span className={styles.listPageTag}>表格</span>
                        <CreateTable
                            isEditVariable={false}
                            getCode={code => { this.tableCode = code; }}
                            getColumns={columns => { this.tableColumns = columns; }} />
                    </div>
                </div>
            </Modal>
        );
    }
}

export default ListPageModal;
