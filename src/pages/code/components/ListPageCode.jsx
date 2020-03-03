import React, { Component } from 'react';
import { Modal } from 'antd';
import TemplateItem from '@/components/TemplateItem';

class ListPageCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            configVisible: false,
            configKey: Math.random(),
        };
    }

    render() {
        const { configKey, configVisible } = this.state;

        return (
            <div>
                <TemplateItem
                    title="列表页面配置对象"
                    imgClassName="listPageImg"
                    add={this.openListPageCode} />
                <Modal
                    title="form组件配置"
                    key={configKey}
                    visible={configVisible}>
                    <div />
                </Modal>
            </div>

        );
    }
}

export default ListPageCode;
