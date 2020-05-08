import React, { Component } from 'react';
import { Row, Col, Table, Card, Modal, Input, message, Button, Switch } from 'antd';
import { connect } from 'dva';
import { patchLabelConfig, delLabelConfig, addLabelConfig, changeLabelDisplay } from '@/services/configlist';
import styles from './index.less';

const { confirm } = Modal;

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
                        <span className={styles.optBtn} onClick={() => this.delLabel(record)}>删除</span>
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
     * 关闭label编辑弹窗
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
     * 确认修改/添加babel
     */
    confirmChangeLabel = () => {
        const { labelId, labelName } = this.state;
        if (labelId) {
            patchLabelConfig({
                id: labelId,
                name: labelName,
            }).then(() => {
                message.success('修改成功');
                this.closeLabel();
                this.getLabelConfig();
            });
        } else {
            addLabelConfig({
                name: labelName,
            }).then(() => {
                message.success('添加成功');
                this.closeLabel();
                this.getLabelConfig();
            });
        }
    }

    /**
     * 删除label
     */
    delLabel({ id, name }) {
        confirm({
            title: '确认',
            content: `确定要删除 "${name}"`,
            onOk: () => {
                delLabelConfig({
                    id,
                }).then(() => {
                    message.success('删除成功');
                    this.getLabelConfig();
                });
            },
        });
    }

    changeDisplay = value => {
        changeLabelDisplay({
            display: value,
        }).then(() => {
            this.props.dispatch({
                type: 'global/updateState',
                payload: {
                    labelDisplay: value,
                },
            });
        });
    }

    render() {
        const { labelList, labelDisplay } = this.props.global;
        const { labelName, labelVisible } = this.state;

        return (
            <div>
                <Row>
                    <Col span={10}>
                        <Card
                            title="label配置"
                            bordered={false}
                            extra={(
                                <>
                                    <Switch checkedChildren="展示" unCheckedChildren="隐藏" style={{ marginRight: '10px' }} onChange={this.changeDisplay} checked={labelDisplay} />
                                    <Button type="primary" icon="plus" size="small" onClick={() => { this.openLabel({ id: '', name: '' }); }} />
                                </>
                            )}>
                            <Table columns={this.columns} dataSource={labelList} rowKey="id" scroll={{ y: 400 }} />
                        </Card>
                    </Col>
                </Row>
                <Modal
                    visible={labelVisible}
                    onCancel={this.closeLabel}
                    onOk={this.confirmChangeLabel}>
                    <div style={{ paddingTop: '20px' }}>
                        <Input autoFocus placeholder="请输入label" maxLength={10} value={labelName} onChange={this.onChangeLabel} />
                    </div>
                </Modal>
            </div>
        );
    }
}

export default connect(({ global }) => ({ global }))(ConfigList);
