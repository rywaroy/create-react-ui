import React from 'react';
import { IMaterial } from '@/types/making';
import styles from './index.less';

const Modal: React.FC<any> = (props) => (
    <>
        {
            props.visible
                ? (
                    <div {...props}>
                        <div className="ant-modal-header">
                            <div className="ant-modal-title">{props.title}</div>
                        </div>
                        <div className="ant-modal-body">
                            {props.children}
                        </div>
                        <div className="ant-modal-footer">
                            <div>
                                <button type="button" className="ant-btn"><span>取 消</span></button>
                                <button type="button" className="ant-btn ant-btn-primary"><span>确 定</span></button>
                            </div>
                        </div>
                    </div>
                )
                : null
        }
    </>
);

export const ModalMaterial: IMaterial = {
    name: '弹窗 Modal',
    tag: 'Modal',
    from: 'antd',
    id: Math.random(),
    component: Modal,
    intro: '弹窗 Modal组件',
    props: {
        title: '弹窗标题',
        visible: true,
    },
    defaultProps: {
        className: `${styles.modal} ant-modal-content`,
    },
    haveChildren: true,
    haveWrap: false,
    editComponents: [
        { name: 'className' },
        { name: 'style' },
        { name: 'prop', props: { propName: 'visible', propType: 'boolean' } },
    ],
    ext: {
        type: 'modal',
    },
};

export default Modal;
