import React from 'react';
import { IMaterial } from '@/types/making';
import styles from './index.less';

const Modal: React.FC<any> = ({ keyFS, onCancelFS, onOkFS, visibleFS, modalName, ...props }) => (
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
        refFS: '{{modalName}}Ref',
        title: '弹窗标题',
        visible: true,
        modalName: 'modal',
        onOkFS: '{{modalName}}Submit',
        extraComponent: false,
        extraName: 'component',
        expansion: '{...{{modalName}}Props}',
        visibleFS: '{{extraComponent ? \'visible\' : \'\'}}',
        onCancelFS: '{{extraComponent ? \'onCancel\' : \'\'}}',
    },
    defaultProps: {
        className: `${styles.modal} ant-modal-content`,
    },
    extraProps: {
        refFS: '{{modalName}}Ref',
        onOkFS: '{{modalName}}Submit',
        expansion: '{...{{modalName}}Props}',
    },
    haveChildren: true,
    haveWrap: false,
    editComponents: [
        { name: 'className' },
        { name: 'style' },
        { name: 'prop', props: { propName: 'extraComponent', propType: 'boolean' } },
        { name: 'prop', props: { propName: 'extraName', propType: 'string' } },
        { name: 'prop', props: { propName: 'title', propType: 'string' } },
        { name: 'prop', props: { propName: 'modalName', propType: 'string' } },
        { name: 'prop', props: { propName: 'visible', propType: 'boolean' } },
    ],
    ext: {
        type: 'modal',
        code: {
            'index.js': {
                importDeclaration: {
                    antd: {
                        export: ['Modal'],
                    },
                    behooks: {
                        export: ['useModal'],
                    },
                    react: {
                        export: ['useRef'],
                    },
                },
                variableDeclarator: [
                    'const {{modalName}}Ref = useRef(null);',
                ],
                methods: [
                    `const { toggle: {{modalName}}Toggle, modalProps: {{modalName}}Props } = useModal({
                        form: {{modalName}}Ref.current ? {{modalName}}Ref.current.getForm() : false,
                    });`,
                    `const {{modalName}}Submit = (values) => {
                        {{modalName}}Toggle();
                    }`,
                    `const {{modalName}}Open = () => {
                        {{modalName}}Toggle();
                    }`,
                ],
            },
        },
        extraCode: {
            'index.js': {
                importDeclaration: {
                    antd: {
                        export: ['Modal'],
                    },
                    react: {
                        default: 'React',
                    },
                },
                destructuring: {
                    props: ['visible', 'onOk', 'onCancel'],
                },
                methods: [
                    `const {{modalName}}Submit = () => {
                        onOk();
                    }`,
                ],
            },
        },
    },
};

export default Modal;
