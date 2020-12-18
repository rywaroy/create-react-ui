import React from 'react';
import { Form, Modal, TreeSelect, Input } from 'antd';
import { useSelector } from 'dva';
import { FormComponentProps } from 'antd/es/form';
import { GlobalModelState } from '@/models/global';

interface IProps extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
}

const CreateMockModal = (props: IProps) => {
    const { visible, onCancel, form } = props;
    const { getFieldDecorator } = form;
    const { files } = useSelector<any, GlobalModelState>(state => state.global);
    return (
        <Modal
            title="创建mock"
            visible={visible}
            onCancel={onCancel}>
            <Form>
                <Form.Item label="API url">
                    {
                        getFieldDecorator('url', {
                            rules: [
                                { required: true, message: '请填写url' },
                            ],
                        })(
                            <Input />,
                        )
                    }
                </Form.Item>
                <Form.Item label="文件夹/文件">
                    {
                        getFieldDecorator('path', {
                            rules: [
                                { required: true, message: '请选择文件夹或文件路径' },
                            ],
                        })(
                            <TreeSelect
                                showSearch
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                placeholder="请选择路径"
                                allowClear
                                treeData={files} />,
                        )
                    }
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Form.create<IProps>()(CreateMockModal);
