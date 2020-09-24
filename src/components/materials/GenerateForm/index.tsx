import React from 'react';
import { Form, Select, DatePicker, Row, Col, Input, InputNumber, Checkbox, Radio } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { ISetFormValues } from '@/types/code';
import { IMaterial } from '@/types/making';
import materialWrap from '../MaterialWrap';
import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea, Password } = Input;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const CheckboxGroup = Checkbox.Group;
const { RangePicker, MonthPicker } = DatePicker;

/* 目前支持的form表单类型 */
const mapTypeToComponent = {
    label: '',
    input: {
        WrappedComponent: Input,
    },
    inputnumber: {
        WrappedComponent: InputNumber,
    },
    password: {
        WrappedComponent: Password,
    },
    select: {
        WrappedComponent: Select,
        defaultProps: {
            allowClear: true,
        },
        optionsData: 'selectOptions',
        SubComponent: Option,
    },
    datepicker: {
        WrappedComponent: DatePicker,
    },
    monthpicker: {
        WrappedComponent: MonthPicker,
    },
    rangepicker: {
        WrappedComponent: RangePicker,
    },
    checkbox: {
        WrappedComponent: Checkbox,
    },
    checkboxgroup: {
        WrappedComponent: CheckboxGroup,
        optionsData: 'checkboxOptions',
        SubComponent: Checkbox,
        style: {
            marginLeft: '10px',
        },
    },
    textarea: {
        WrappedComponent: TextArea,
        defaultProps: {
            autosize: { minRows: 2, maxRows: 3 },
        },
    },
    radiogroup: {
        WrappedComponent: RadioGroup,
        optionsData: 'radioOptions',
        SubComponent: Radio,
        SubComponentMap: {
            defalut: Radio,
            button: RadioButton,
        },
        style: {
            marginLeft: '10px',
        },
    },
};

interface IProps extends FormComponentProps {
    className?: string;
    formSet: ISetFormValues[];
    gutter?: number;
    formType?: string;
    labelCol?: { span: number };
    wrapperCol?: { span: number };
}

class GenerateForm extends React.Component<IProps, any> {
    // 提供给父组件用的校验方法
    verify = (callback?: (errors: Error, fieldsValue: any) => void) => {
        this.props.form.validateFields((errors, fieldsValue) => {
            callback && callback(errors, fieldsValue);
        });
    };

    /* form 实例 */
    getForm = () => this.props.form;

    resetFields = () => this.props.form.resetFields();

    getFieldValue = (key: string) => this.props.form.getFieldValue(key);

    setFields = (obj: object) => this.props.form.setFields(obj);

    setFieldsValue = (obj: object) => this.props.form.setFieldsValue(obj);

    render() {
        /* formSet代表form表单的配置 */
        const { className, formSet, form, gutter = 0, formType, labelCol = { span: 8 }, wrapperCol = { span: 16 } } = this.props;
        const { getFieldDecorator } = form;

        return (
            <Form className={`${styles.generateFormWrap} ${className}`} labelCol={labelCol} wrapperCol={wrapperCol}>
                <Row gutter={gutter}>
                    {
                        formSet.map((item, key) => {
                            const {
                                isShow = true, // 该配置项是否显示
                                rules, // ant design Form原生校验规则
                                initialValue, // ant design Form原生初始值
                                validate = [], // ant design Form原生校验属性
                                type, // 组件类型
                                label, // ant design Form原生表单项label
                                colon = true, // ant design Form原生：是否显示label后边的冒号
                                props, // 外部传入给组件的属性
                                name, // ant design Form原生name属性
                                span = formType === 'filter' ? 8 : 12, // 表单项的布局长度
                                colClass = '', /* 表单col的样式 */
                                options = {}, // //ant design Form原生表单项options
                                formItemLayout, // 表单项lable、表单组件的布局
                            } = item;
                            const { WrappedComponent, defaultProps } = mapTypeToComponent[type.toLowerCase()];

                            const realOptions = {
                                rules,
                                validate,
                                validateFirst: true, // 当某一规则校验不通过时，是否停止剩下的规则的校验
                                ...options,
                            };

                            if ('initialValue' in item) {
                                realOptions.initialValue = initialValue;
                            }

                            /* 控制编辑、新增时,部分选型是否显示 */
                            if (!isShow) {
                                return null;
                            }

                            /* select 、radiogroup、checkboxgroup等含有子项的组件 */
                            if (type.toLowerCase() === 'select' || type.toLowerCase() === 'radiogroup' || type.toLowerCase() === 'checkboxgroup') {
                                /* 对于存在多种类型子组件时，可以通过subComponent字段告知组件使用哪种类型的子组件，子组件类型定义在mapTypeToComponent的SubComponentMap中 */
                                const { optionsData, SubComponentMap, style } = mapTypeToComponent[type.toLowerCase()];
                                let { SubComponent } = mapTypeToComponent[type.toLowerCase()];
                                const subOptionsData = item[optionsData] || item.dataOptions;
                                const { models } = item;
                                const [valueKey = 'value', labelKey = 'label'] = models || [];

                                /* 当前组件有个子组件时，通过subComponent可配置具体选择哪个 */
                                if (item.subComponent) {
                                    SubComponent = SubComponentMap[item.subComponent] || SubComponentMap.defalut;
                                }

                                return (
                                    <Col span={span} key={key} className={colClass}>
                                        <FormItem label={label} colon={colon} {...formItemLayout}>
                                            {getFieldDecorator(name, realOptions)(
                                                <WrappedComponent {...defaultProps} {...props}>
                                                    {
                                                        subOptionsData.length > 0 && subOptionsData.map((v, i) => <SubComponent key={i} value={v[valueKey]} style={style}>{v[labelKey]}</SubComponent>)
                                                    }
                                                </WrappedComponent>,
                                            )}
                                            {
                                                item.addonAfter && item.addonAfter
                                            }
                                        </FormItem>
                                    </Col>
                                );
                            }

                            /* 文本 */
                            if (type.toLowerCase() === 'label') {
                                return (
                                    <Col span={span} key={key} className={colClass}>
                                        <FormItem label={label} colon={colon} {...formItemLayout}>
                                            <span style={{ margin: '0 10px' }}>{initialValue}</span>
                                            {
                                                item.addonAfter && <span>{item.addonAfter}</span>
                                            }
                                        </FormItem>
                                    </Col>
                                );
                            }

                            return (
                                <Col span={span} key={key} className={colClass}>
                                    <FormItem label={label} colon={colon} {...formItemLayout}>

                                        {getFieldDecorator(name, realOptions)(
                                            <WrappedComponent {...defaultProps} {...props} form={form} />,
                                        )}
                                        {
                                            item.addonAfter && item.addonAfter
                                        }
                                    </FormItem>
                                </Col>
                            );
                        })
                    }
                </Row>
            </Form>
        );
    }
}

export const GenerateFormMaterial: IMaterial = {
    name: '表单',
    tag: 'GenerateForm',
    from: '@/components',
    id: Math.random(),
    component: materialWrap(Form.create<IProps>()(GenerateForm)),
    intro: '表单组件',
    props: {
        formSet: [],
    },
    haveChildren: false,
    editComponents: [
        { name: 'className' },
        { name: 'style' },
        { name: 'layout' },
        { name: 'form', props: { propName: 'formSet' } },
    ],
    project: '油涟后台',
    ext: {
        code: {
            'index.js': {
                importDeclaration: {
                    '@/componenets': {
                        export: ['GenerateForm'],
                    },
                },
            },
        },
    },
};

export default Form.create<IProps>()(GenerateForm);
