import React, { Component } from 'react';
import { Button } from 'antd';
import GenerateForm from '@/components/GenerateForm';
import styles from './index.less';

class ListPageFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formOption: [],
        };
    }

    /**
     * 打开添加弹窗
     */
    openAdd = () => {

    }

    /**
     * 模拟提交
     */
    handleSubmit = e => {
        e.preventDefault();
        this.generateForm.verify();
    };

    render() {
        const { formOption } = this.state;
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

            </div>
        );
    }
}

export default ListPageFilter;
