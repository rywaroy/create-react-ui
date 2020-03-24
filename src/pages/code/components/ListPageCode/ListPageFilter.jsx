import React, { Component } from 'react';
import { Button } from 'antd';
import GenerateForm from '@/components/GenerateForm';
import SetForm from '@/components/CreateForm/SetForm';
import styles from './index.less';

class ListPageFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleSetForm: false,
            setFormKey: Math.random(),
        };
    }

    /**
     * 模拟提交
     */
    handleSubmit = e => {
        e.preventDefault();
        this.generateForm.verify();
    };

    /**
     * 打开添加弹窗
     */
    openAdd = () => {
        this.setState({
            visibleSetForm: true,
            setFormKey: Math.random(),
        });
    }

    /**
     * 关闭添加弹窗
     */
    closeAdd = () => {
        this.setState({
            visibleSetForm: false,
        });
    }

    /**
     * 删除item
     */
    deleteItem = index => {
        const formOption = [...this.props.formOption];
        formOption.splice(index, 1);
        this.props.getFormOption(formOption);
    }

    /**
     * 添加
     */
    add = values => {
        const formOption = [...this.props.formOption];
        formOption.push(values);
        this.props.getFormOption(formOption);
        this.closeAdd();
    }

    render() {
        const { visibleSetForm, setFormKey } = this.state;
        const { formOption } = this.props;
        return (
            <div className={styles.filterBox}>
                <div>
                    筛选表单：
                    <Button type="primary" onClick={this.openAdd}>添加</Button>
                </div>
                <div className={styles.formBox}>
                    <GenerateForm
                        formSet={formOption}
                        formType="filter"
                        wrappedComponentRef={el => { this.generateForm = el; }}
                        deleteItem={this.deleteItem}
                    />
                </div>
                <SetForm
                    visibleSetForm={visibleSetForm}
                    key={setFormKey}
                    onCancel={this.closeAdd}
                    onOk={this.add}
                    zIndex={1002}
                    isFilterForm
                />
            </div>
        );
    }
}

export default ListPageFilter;
