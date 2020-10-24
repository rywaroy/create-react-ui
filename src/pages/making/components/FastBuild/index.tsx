import * as React from 'react';
import { Modal, Form, Switch, Radio } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { YLComponentsList, LYTComponentsList } from './map';

interface IProps extends FormComponentProps {

}

interface IState {
    project: string;
}

interface IFormList {
    tag: string;
    name: string;
    [props: string]: any;
}

const YLList = YLComponentsList.filter(item => item.name);
const LYTList = LYTComponentsList.filter(item => item.name);

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
        const formList = project === '油涟后台' ? YLList : LYTList;

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
                        formList.map((item: IFormList) => (
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
