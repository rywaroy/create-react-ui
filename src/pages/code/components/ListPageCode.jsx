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

    /**
     * 打开ListPage文件配置
     */
    openListPageCode = () => {
        this.setState({
            configKey: Math.random(),
        }, () => {
            this.setState({
                configVisible: true,
            });
        });
    }

    /**
     * 关闭ListPage文件配置
     */
    closeListPageCode = () => {
        this.setState({
            configVisible: false,
        });
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
                    visible={configVisible}
                    onCancel={this.closeListPageCode}>
                    <div />
                </Modal>
            </div>

        );
    }
}

export default ListPageCode;
