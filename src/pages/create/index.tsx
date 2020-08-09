import React from 'react';
import { Form, Switch, Button, Alert, message } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { getList, createProject } from '@/services/create';
import { IConfigOption } from '@/types/create';
import styles from './index.less';

export interface IState {
    list: IConfigOption[];
    isEmpty: boolean;
}

export interface IProps extends FormComponentProps {}

class Create extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            list: [],
            isEmpty: true,
        };
    }

    /**
     * 创建
     */
    create = () => {
        const formData = this.props.form.getFieldsValue();
        const data = [];
        Object.keys(formData).forEach(key => {
            if (formData[key]) {
                data.push(key);
            }
        });
        createProject({
            list: data,
        }).then(() => {
            message.success('创建成功');
            this.reset();
        });
    }

    /**
     * 重置
     */
    reset = () => {
        this.props.form.resetFields();
    }

    componentDidMount() {
        getList().then(res => {
            const { list, isEmpty } = res.data.data;
            this.setState({
                list,
                isEmpty,
            });
        });
    }

    render() {
        const { list, isEmpty } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 12 },
            wrapperCol: { span: 12 },
        };
        return (
            <div className={styles.createBox}>
                <Alert banner closable type="success" message={isEmpty ? '请添加配置' : '已有工程，追加配置'} />
                <div className={styles.createForm}>
                    <Form style={{ marginBottom: '20px' }}>
                        {
                            list.map((item) => (
                                <Form.Item key={item.value} label={item.name} labelAlign="left" {...formItemLayout}>
                                    {
                                        getFieldDecorator(item.value, {
                                            valuePropName: 'checked',
                                        })(<Switch />)
                                    }
                                </Form.Item>
                            ))
                        }
                    </Form>
                    <Button type="primary" style={{ marginRight: '10px' }} onClick={this.create}>生成</Button>
                    <Button onClick={this.reset}>重置</Button>
                </div>
            </div>
        );
    }
}

export default Form.create<IProps>()(Create);
