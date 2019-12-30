import React, { Component } from 'react';
import TemplateItem from '@/components/TemplateItem';

class FormCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            configVisible: false,
            configKey: Math.random(),
        };
    }

    /**
     * 打开form文件配置
     */
    openFormCode = () => {
        this.setState({
            configKey: Math.random(),
        }, () => {
            this.setState({
                configVisible: true,
            });
        });
    }

    /**
     * 关闭form文件配置
     */
    closeFormCode = () => {
        this.setState({
            configVisible: false,
        });
    }

    render() {
        return (
            <div>
                <TemplateItem
                    title="form组件配置对象"
                    intro="配合油涟组件GenerateForm使用"
                    imgClassName="formImg"
                    add={this.openFormCode}/>
            </div>
        );
    }
}

export default FormCode;