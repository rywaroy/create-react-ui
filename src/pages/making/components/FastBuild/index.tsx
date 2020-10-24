import * as React from 'react';
import { Modal, Form, Switch, Radio, message } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { YLComponentsList, LYTComponentsList } from '../../map';

interface IProps extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
    onOk: (values: any) => void;
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

    onOk = () => {
        const data = this.props.form.getFieldsValue();
        let f = false;
        Object.keys(data).forEach(key => {
            if (data[key]) {
                f = true;
            }
        });
        if (!f) {
            message.error('请选择页面配置');
            return;
        }
        this.props.onOk({
            project: this.state.project,
            values: data,
        });
    }

    render() {
        const { project } = this.state;
        const { visible, form } = this.props;
        const { getFieldDecorator } = form;
        const formList = project === '油涟后台' ? YLList : LYTList;

        return (
            <Modal
                title="快速配置"
                visible={visible}
                onOk={this.onOk}
                onCancel={this.props.onCancel}>
                <Form labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                    <Form.Item label="项目">
                        <Radio.Group value={project} onChange={e => this.setState({ project: e.target.value })}>
                            <Radio value="油涟后台">油涟</Radio>
                            <Radio value="陆运通后台">陆运通</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {
                        formList.map((item: IFormList) => (
                            <Form.Item label={item.name} key={item.tag}>
                                {
                                    getFieldDecorator(item.tag, {
                                        valuePropName: 'checked',
                                        initialValue: item.initialValue,
                                    })(<Switch />)
                                }
                            </Form.Item>
                        ))
                    }
                </Form>
            </Modal>
        );
    }
}

export default Form.create<IProps>()(FastBuild);
