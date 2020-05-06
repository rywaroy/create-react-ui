import React, { Component } from 'react';
import { Row, Col, Table, Card } from 'antd';

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
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: '测试1',
                    id: 1,
                },
                {
                    name: '测试2',
                    id: 2,
                },
                {
                    name: '测试3',
                    id: 3,
                },
            ],
        };
    }

    render() {
        const { data } = this.state;
        return (
            <div>
                <Row>
                    <Col span={10}>
                        <Card title="label配置" bordered={false}>
                            <Table columns={columns} dataSource={data} />
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ConfigList;
