import * as React from 'react';
import { Modal, Form, Switch, Radio } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { YLComponentsList } from './map';

export interface IProps extends FormComponentProps {

}

export interface IState {
    project: string;
}

const YLList = YLComponentsList.filter(item => item.name);

class FastBuild extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            project: '油涟后台',
        };
    }

    render() {
        const { project } = this.state;
        const { getFieldDecorator } = this.props.form;

        return (
            <Modal
                title="快速配置"
                visible>
                <Form labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                    <Form.Item label="项目">
                        <Radio.Group value={project} onChange={e => this.setState({ project: e.target.value })}>
                            <Radio value="油涟后台">油涟</Radio>
                            <Radio value="陆运通后台">陆运通</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {
                        YLList.map(item => (
                            <Form.Item label={item.name}>
                                {
                                    getFieldDecorator(item.tag)(<Switch />)
                                }
                            </Form.Item>
                        ))
                    }
                </Form>
            </Modal>
        );
    }
}

export default Form.create()(FastBuild);
