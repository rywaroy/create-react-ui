import React, { Component } from 'react';
import { Row, Col, Card, Switch } from 'antd';
import { connect } from 'dva';
import { changeLabelDisplay } from '@/services/configlist';
import { GlobalModelState } from '@/models/global';
import LabelList from './components/LabelList';
import ClassList from './components/ClassList';
import styles from './index.less';

interface IState {

}

interface IProps {
    global: GlobalModelState;
    dispatch: Function;
}

class ConfigList extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {};
    }

    changeDisplay = (value: boolean) => {
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
        const { labelDisplay } = this.props.global;

        return (
            <div className="base-content">
                <Row>
                    <Col span={7}>
                        <Card
                            className={styles.cardBox}
                            title="label配置"
                            bordered={false}
                            extra={(
                                <>
                                    <Switch checkedChildren="展示" unCheckedChildren="隐藏" style={{ marginRight: '10px' }} onChange={this.changeDisplay} checked={labelDisplay} />
                                </>
                            )}>
                            <LabelList {...this.props} />
                        </Card>
                    </Col>
                    <Col span={7} offset={1}>
                        <Card
                            className={styles.cardBox}
                            title="class缓存"
                            bordered={false}>
                            <ClassList {...this.props} />
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect(({ global }: { global: GlobalModelState }) => ({ global }))(ConfigList);
