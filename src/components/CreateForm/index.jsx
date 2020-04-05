import React, { Component } from 'react';
import { Button, InputNumber, Input, Form, Radio } from 'antd';
import cloneDeep from 'loadsh/cloneDeep';
import { typeOptions, variableTypeOptions } from '@/utils/enum';
import GenerateForm from '../GenerateForm';
import SetForm from './SetForm';
import styles from './index.less';

class CreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formOption: [],
            visibleSetForm: false,
            setFormKey: Math.random(),
            width: 1000, // 容器宽度
            type: 'filter', // 表单类型
            name: 'listFilter', // 变量名
            variableType: 'Function', // 变量类型
            labelCol: 8,
            wrapperCol: 16,
            span: 24,
            defaultLayout: false,
            fastList: [
                { label: '', type: 'label' },
                { label: '', type: 'input' },
                { label: '', type: 'select' },
                { label: '', type: 'inputnumber' },
                { label: '', type: 'password' },
                { label: '', type: 'datepicker' },
                { label: '', type: 'monthpicker' },
                { label: '', type: 'rangepicker' },
                { label: '', type: 'checkboxgroup' },
                { label: '', type: 'textarea' },
                { label: '', type: 'radiogroup' },
            ],
        };

        // 配置默认的type
        if (this.props.type) {
            this.state.type = this.props.type;
            if (this.props.type === 'modal') {
                this.state.width = 520;
            }
        }
    }

    openAdd = () => {
        this.setState({
            visibleSetForm: true,
            setFormKey: Math.random(),
        });
    }

    closeAdd = () => {
        this.setState({
            visibleSetForm: false,
        });
    }

    add = values => {
        const formOption = [...this.state.formOption];
        let { defaultLayout } = this.state;
        if (values.formItemLayoutText) {
            // 默认变量布局
            const { labelCol, wrapperCol, span } = this.state;
            values.formItemLayout = {
                labelCol: { span: labelCol },
                wrapperCol: { span: wrapperCol },
            };
            values.span = span;
            defaultLayout = true;
        }
        formOption.push(values);
        this.setState({
            formOption,
            defaultLayout,
        });
        this.closeAdd();
    };

    /**
     * 设置容器宽度
     */
    boxWidthChange = e => {
        this.setState({
            width: e.target.value,
        });
    };

    /**
     * 表单类型切换
     */
    typeChange = e => {
        const type = e.target.value;
        this.setState({
            type,
            width: type === 'filter' ? 1000 : 520,
            name: type === 'filter' ? 'listFilter' : 'modalForm',
        });
    };

    /**
     * span变化
     */
    spanChange = value => {
        const formOption = [...this.state.formOption];
        for (const item of formOption) {
            if (item.formItemLayoutText) {
                item.span = value;
            }
        }
        this.setState({
            formOption,
            span: value,
        });
    };

    labelColChange = value => {
        const formOption = [...this.state.formOption];
        for (const item of formOption) {
            if (item.formItemLayoutText) {
                item.formItemLayout.labelCol.span = value;
            }
        }
        this.setState({
            formOption,
            labelCol: value,
        });
    };

    wrapperColChange = value => {
        const formOption = [...this.state.formOption];
        for (const item of formOption) {
            if (item.formItemLayoutText) {
                item.formItemLayout.wrapperCol.span = value;
            }
        }
        this.setState({
            formOption,
            wrapperCol: value,
        });
    };

    /**
     * 模拟提交
     */
    handleSubmit = e => {
        e.preventDefault();
        this.generateForm.verify();
    };

    /**
     * 删除item
     */
    deleteItem = index => {
        const formOption = [...this.state.formOption];
        formOption.splice(index, 1);
        let defaultLayout = false;
        for (const item of formOption) {
            if (item.formItemLayoutText) {
                defaultLayout = true;
            }
        }
        this.setState({
            formOption,
            defaultLayout,
        });
    }

    /**
     * 生成代码
     */
    create() {
        const { formOption, name, variableType, labelCol, wrapperCol, width } = this.state;
        if (formOption.length === 0) {
            return;
        }
        let isVar = false;
        const options = cloneDeep(formOption);
        const array = options.map(item => {
            if (item.formItemLayoutText) {
                item.formItemLayout = 'formItemLayout';
                isVar = true;
                delete item.formItemLayoutText;
            }
            return item;
        });
        let s = JSON.stringify(array);
        let formItemLayoutCode = '';

        // 用来展示form的对象
        const displayOption = array.map(item => {
            if (item.formItemLayout === 'formItemLayout') {
                item.formItemLayout = {
                    labelCol: { span: labelCol },
                    wrapperCol: { span: wrapperCol },
                };
            }
            return item;
        });
        if (isVar) {
            formItemLayoutCode = `const formItemLayout = {labelCol:{span:${labelCol}}, wrapperCol:{span:${wrapperCol}}};`;
        }
        if (variableType === 'Array') {
            s = `${formItemLayoutCode} export const ${name} = ${s};`;
        }
        if (variableType === 'Function') {
            s = `export function ${name}(_self) {${formItemLayoutCode} return ${s}; }`;
        }
        s = s.replace(/"(formItemLayout)"/g, (a, b) => b);
        const { getCode, getFormObject } = this.props;
        getCode && getCode(s);
        getFormObject && getFormObject({
            code: s,
            options: displayOption,
            name,
            variableType,
            labelCol,
            wrapperCol,
            width,
            title: '标题',
        });
    }

    /**
     * 便捷添加
     */
    fastAdd = index => {
        const { formOption, fastList } = this.state;
        const options = [...formOption];
        const fastLists = [...fastList];
        const { type } = fastLists[index];
        let { label } = fastLists[index];
        label = label || type;
        const option = {
            label,
            name: label,
            type,
        };
        options.push(option);
        fastLists[index].label = '';
        this.setState({
            formOption: options,
            fastList: fastLists,
        });
    }

    /**
     * 修改label
     */
    onChangeFast = (e, index) => {
        const fastList = [...this.state.fastList];
        fastList[index].label = e.target.value;
        this.setState({
            fastList,
        });
    }

    render() {
        const {
            formOption,
            visibleSetForm,
            setFormKey,
            width,
            type,
            name,
            variableType,
            span,
            labelCol,
            wrapperCol,
            defaultLayout,
            fastList,
        } = this.state;
        const { isEditVariable, height } = this.props;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        };

        return (
            <div className="clearfix">
                <div>
                    <Button
                        type="primary"
                        onClick={this.openAdd}
                        style={{ marginRight: '10px' }}>
                        添加
                    </Button>
                </div>
                <div className={styles.formWrap}>
                    {
                        isEditVariable
                        && (
                            <div className={styles.formOption}>
                                <Form {...formItemLayout}>
                                    <Form.Item label="表单类型">
                                        <Radio.Group
                                            options={typeOptions}
                                            onChange={this.typeChange}
                                            value={type}
                                        />
                                    </Form.Item>
                                    <Form.Item label="容器宽度">
                                        <InputNumber
                                            step={100}
                                            max={1000}
                                            min={500}
                                            onChange={value => this.setState({ width: value })}
                                            value={width}
                                        />
                                    </Form.Item>
                                    <Form.Item label="变量名">
                                        <Input
                                            style={{ width: 200 }}
                                            onChange={e => this.setState({ name: e.target.value })}
                                            value={name}
                                        />
                                    </Form.Item>
                                    <Form.Item label="变量类型">
                                        <Radio.Group
                                            options={variableTypeOptions}
                                            onChange={e => this.setState({ variableType: e.target.value })}
                                            value={variableType}
                                        />
                                    </Form.Item>
                                    {defaultLayout && (
                                        <Form.Item label="默认span">
                                            <InputNumber
                                                style={{ width: 200 }}
                                                onChange={this.spanChange}
                                                value={span}
                                            />
                                        </Form.Item>
                                    )}
                                    {defaultLayout && (
                                        <Form.Item label="默认labelCol">
                                            <InputNumber
                                                style={{ width: 200 }}
                                                onChange={this.labelColChange}
                                                value={labelCol}
                                            />
                                        </Form.Item>
                                    )}
                                    {defaultLayout && (
                                        <Form.Item label="默认wrapperCol">
                                            <InputNumber
                                                style={{ width: 200 }}
                                                onChange={this.wrapperColChange}
                                                value={wrapperCol}
                                            />
                                        </Form.Item>
                                    )}
                                </Form>
                            </div>
                        )
                    }

                    <div className={styles.formBox} style={{ width: `${width}px`, minHeight: `${height}px` }}>
                        <GenerateForm
                            formSet={formOption}
                            formType={type}
                            wrappedComponentRef={el => { this.generateForm = el; }}
                            deleteItem={this.deleteItem}
                        />
                        {formOption.length > 0 && isEditVariable && (
                            <Button
                                type="primary"
                                onClick={this.handleSubmit}
                                className={styles.testButton}>
                                测试rules
                            </Button>
                        )}
                    </div>
                </div>
                <div className={styles.fastBox}>
                    {
                        fastList.map((item, index) => (
                            <div className={styles.fastItem} key={item.type}>
                                <Input placeholder={item.type} className={styles.fastInput} value={item.label} onChange={(e) => this.onChangeFast(e, index)} />
                                <Button type="primary" icon="plus" onClick={() => this.fastAdd(index)} />
                            </div>
                        ))
                    }
                </div>
                <SetForm
                    visibleSetForm={visibleSetForm}
                    key={setFormKey}
                    onCancel={this.closeAdd}
                    onOk={this.add}
                    isFilterForm={!isEditVariable}
                    zIndex={1002}
                />
            </div>
        );
    }
}

CreateForm.defaultProps = {
    isEditVariable: true,
    height: 300,
};

const CreateFormForm = Form.create()(CreateForm);
export default CreateFormForm;
