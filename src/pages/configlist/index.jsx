import React, { Component } from 'react';
import { Row, Col, Table, Card, Modal, Input, message } from 'antd';
import { connect } from 'dva';
import { patchLabelConfig } from '@/services/configlist';
import styles from './index.less';

class ConfigList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labelName: '',
            labelId: '',
            labelVisible: false,
        };
    }

    columns = [
        {
            title: 'label',
            dataIndex: 'name',
        },
        {
            title: '操作',
            key: 'id',
            render: record => (
                    <>
                        <span className={styles.optBtn} onClick={() => this.openLabel(record)}>修改</span>
                        <span className={styles.optBtn}>删除</span>
                    </>
            ),
        },
    ];

    /**
     * 获取label配置列表
     */
    getLabelConfig() {
        this.props.dispatch({
            type: 'global/getLabelConfig',
        });
    }

    /**
     * 打开label编辑弹窗
     */
    openLabel({ id, name }) {
        this.setState({
            labelId: id,
            labelName: name,
            labelVisible: true,
        });
    }

    /**
     * 打开label编辑弹窗
     */
    closeLabel = () => {
        this.setState({
            labelVisible: false,
        });
    }

    /**
     * 编辑label
     */
    onChangeLabel = e => {
        this.setState({
            labelName: e.target.value,
        });
    }

    /**
     * 确认修改babel
     */
    confirmChangeLabel = () => {
        const { labelId, labelName } = this.state;
        patchLabelConfig({
            id: labelId,
            name: labelName,
        }).then(() => {
            message.success('修改成功');
            this.closeLabel();
            this.getLabelConfig();
        });
    }

    componentDidMount() {
        this.getLabelConfig();
    }

    render() {
        const { labelList } = this.props.global;
        const { labelName, labelVisible } = this.state;

        return (
            <div>
                <Row>
                    <Col span={10}>
                        <Card title="label配置" bordered={false}>
                            <Table columns={this.columns} dataSource={labelList} rowKey="id" />
                        </Card>
                    </Col>
                </Row>
                <Modal
                    visible={labelVisible}
                    onCancel={this.closeLabel}
                    onOk={this.confirmChangeLabel}>
                    <div style={{ paddingTop: '20px' }}>
                        <Input placeholder="请输入label" maxLength={10} value={labelName} onChange={this.onChangeLabel} />
                    </div>
                </Modal>
            </div>
        );
    }
}

export default connect(({ global }) => ({ global }))(ConfigList);
