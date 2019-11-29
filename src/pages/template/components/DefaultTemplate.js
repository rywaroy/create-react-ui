import React, { Component } from 'react';
import { Modal, Form } from 'antd';
import TemplateItem from './TemplateItem';

class DefaultTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            key: Math.random(),
        };
    }

    addDefaultTemplate = () => {
        this.setState({
            visible: true,
            key: Math.random(),
        });
    }

    handleOk = () => {

    }

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }

    render() {
        const { visible, key } = this.state;

        return (
            <div>
                <TemplateItem
                    title="默认react模板"
                    intro="包含index.js 可配置变量名"
                    imgClassName="defaultImg"
                    add={this.addDefaultTemplate}/>
                <Modal
                    title="添加默认模板"
                    key={key}
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>

                </Modal>
            </div>
        );
    }
}

export default DefaultTemplate;