import React from 'react';
import { Form, Switch, Button, Alert } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { getList } from '@/services/create';
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
            isEmpty: false,
        };
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
                    <Form>
                        {
                            list.map((item) => (
                                <Form.Item key={item.value} label={item.name} labelAlign="left" {...formItemLayout}>
                                    {
                                        getFieldDecorator(item.value)(<Switch />)
                                    }
                                </Form.Item>
                            ))
                        }
                    </Form>
                    <Button type="primary" style={{ marginRight: '10px' }}>生成</Button>
                    <Button>重置</Button>
                </div>
            </div>
        );
    }
}

export default Form.create<IProps>()(Create);
