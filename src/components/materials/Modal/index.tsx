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
        title: '弹窗标题',
        visible: true,
        keyFS: '{{extraComponent ? \'\' : `${modalName}Key`}}',
        modalName: 'modal',
        visibleFS: '{{extraComponent ? \'visible\' : `${modalName}Visible`}}',
        onCancelFS: '{{extraComponent ? \'onCancel\' : `${modalName}Cancel`}}',
        onOkFS: '{{modalName}}Submit',
        extraComponent: false,
        extraName: 'component',
    },
    defaultProps: {
        className: `${styles.modal} ant-modal-content`,
    },
    extraProps: {
        keyFS: '{{modalName}}Key',
        visibleFS: '{{modalName}}Visible',
        onCancelFS: '{{modalName}}Cancel',
        onOkFS: '{{modalName}}Submit',
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
                },
                destructuring: {
                    '{{namespace}}': ['{{modalName}}Visible', '{{modalName}}Key'],
                },
                methods: [
                    // `const {{modalName}}Cancel = () => {
                    //     {{extraComponent ? 'props.onCancel();' : \`dispatch({type: "\${namespace}/updateState",payload: {\${modalName}Visible: false},})\`}};
                    // }
                    // `,
                    // `const {{modalName}}Submit = (values) => {
                    //     {{extraComponent ? 'props.onOk();' : \`\${modalName}Cancel();\`}}
                    // }`,
                    // '{{extraComponent ? \'\' : `const ${modalName}Open = () => {dispatch({type: "${namespace}/updateState",payload: {${modalName}Key: Math.random(),${modalName}Visible: true,},});}`}}',
                    `const {{modalName}}Cancel = () => {
                        dispatch({
                            type: '{{namespace}}/updateState',
                            payload: {
                                {{modalName}}Visible: false,
                            }
                        })
                    }`,
                    `const {{modalName}}Submit = (values) => {
                        {{modalName}}Cancel();
                    }`,
                    `const {{modalName}}Open = () => {
                        dispatch({
                            type: '{{namespace}}/updateState',
                            payload: {
                                {{modalName}}Key: Math.random(),
                                {{modalName}}Visible: true,
                            }
                        });
                    }`,
                ],
            },
            'model.js': {
                state: {
                    '{{modalName}}Visible': 'false',
                    '{{modalName}}Key': 'Math.random()',
                },
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
