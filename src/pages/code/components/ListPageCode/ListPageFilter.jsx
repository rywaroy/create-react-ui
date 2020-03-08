import React, { Component } from 'react';
import { Button } from 'antd';
import GenerateForm from '@/components/GenerateForm';
import SetForm from '@/components/CreateForm/SetForm';
import styles from './index.less';

class ListPageFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formOption: [],
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
        const formOption = [...this.state.formOption];
        formOption.splice(index, 1);
        this.setState({
            formOption,
        });
    }

    /**
     * 添加
     */
    add = values => {
        console.log(values);
        const formOption = [...this.state.formOption];
        formOption.push(values);
        this.setState({
            formOption,
        });
        this.closeAdd();
    }

    render() {
        const { formOption, visibleSetForm, setFormKey } = this.state;
        return (
            <div style={{ marginTop: '20px' }}>
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
                    {formOption.length > 0 && (
                        <Button type="primary" onClick={this.handleSubmit} className={styles.testButton}>
                            测试rules
                        </Button>
                    )}
                </div>
                <SetForm
                    visibleSetForm={visibleSetForm}
                    key={setFormKey}
                    onCancel={this.closeAdd}
                    onOk={this.add}
                    zIndex="1002"
                    disableFormItemLayout
                />
            </div>
        );
    }
}

export default ListPageFilter;
