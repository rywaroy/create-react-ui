import React, { Component } from 'react';
import { Modal } from 'antd';
import CreateTable from '@/components/CreateTable';
import ListPageHeader from './ListPageHeader';
import ListPageFilter from './ListPageFilter';
import styles from './index.less';


class ListPageModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '', // 页面标题
            buttons: [], // 页面操作按钮
            formOption: [], // 表单配置
        };
    }

    tableCode = '' // 表格代码

    tableColumns = [] // 表格配置

    getTableCode = code => {
        this.tableCode = code;
    }

    getTableColumns = columns => {
        this.tableColumns = columns;
    }


    render() {
        const { visible, onCancel } = this.props;
        const { title, buttons, formOption } = this.state;
        return (
            <Modal
                visible={visible}
                title="配置"
                width="1200px"
                onCancel={() => { onCancel(); }}>
                <div className={styles.listPage}>
                    <ListPageHeader
                        title={title}
                        buttons={buttons}
                        getTitle={text => this.setState({ title: text })}
                        getButtons={list => this.setState({ buttons: list })} />
                    <ListPageFilter
                        formOption={formOption}
                        getFormOption={values => this.setState({ formOption: values })} />
                    <CreateTable
                        isEditVariable={false}
                        getCode={this.getTableCode}
                        getColumns={this.getTableColumns} />
                </div>
            </Modal>
        );
    }
}

export default ListPageModal;
