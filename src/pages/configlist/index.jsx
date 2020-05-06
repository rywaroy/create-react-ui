import React, { Component } from 'react';
import { Row, Col, Table, Card } from 'antd';
import { connect } from 'dva';

const columns = [
    {
        title: 'label',
        dataIndex: 'name',
    },
    {
        title: '操作',
        key: 'option',
    },
];

class ConfigList extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'global/getLabelConfig',
        });
    }

    render() {
        const { labelList } = this.props.global;
        return (
            <div>
                <Row>
                    <Col span={10}>
                        <Card title="label配置" bordered={false}>
                            <Table columns={columns} dataSource={labelList} rowKey="id" />
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect(({ global }) => ({ global }))(ConfigList);
