import React, { Component } from 'react';
import { Modal, InputNumber, Form } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { ISetColumnValue } from '@/types/code';

interface IProps extends FormComponentProps {
    visibleSetColumn: boolean;
    zIndex: number;
    width: number;
    onOk: (values: ISetColumnValue) => void;
    onCancel: () => void;
}

class SetColumn extends Component<IProps, null> {
    /**
     * 配置列
     */
    setLine = () => {
        this.props.form.validateFields((err, values: ISetColumnValue) => {
            if (!err) {
                this.props.onOk(values);
            }
        });
    }

    /**
     * 关闭配置列弹窗
     */
    closeSetLine = () => {
        this.props.onCancel();
    }

    componentDidMount() {
        const { width } = this.props;
        this.props.form.setFieldsValue({
            width: width || undefined,
        });
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { visibleSetColumn, zIndex } = this.props;
        const { getFieldDecorator } = this.props.form;

        return (
            <Modal
                title="设置"
                visible={visibleSetColumn}
                onOk={this.setLine}
                onCancel={this.closeSetLine}
                zIndex={zIndex}>
                <Form {...formItemLayout}>
                    <Form.Item
                        label="width">
                        {getFieldDecorator('width')(
                            <InputNumber />,
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

const SetColumnForm = Form.create<IProps>()(SetColumn);

export default SetColumnForm;
