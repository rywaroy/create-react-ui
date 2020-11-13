import React, { Component } from 'react';
import {
    Form,
    Select,
    DatePicker,
    Row,
    Col,
    Input,
    Checkbox,
    Radio,
    Button,
    Icon,
} from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { LYTTYPES } from '@/utils/enum';
import { ISetFormValues } from '@/types/code';
import materialWrap from '../MaterialWrap';
import styles from './index.less';

const { Option } = Select;
const { RangePicker } = DatePicker;
const formItemLayout = {
    style: {
        width: '100%',
        marginBottom: 0,
        display: 'flex',
    },
    labelCol: {
        style: { width: '115px' },
    },
    wrapperCol: {
        style: { flexGrow: 1 },
    },
};

const mapTypeToComponent = {
    input: {
        WrappedComponent: Input,
    },
    select: {
        WrappedComponent: Select,
        SubComponent: Option,
    },
    rangepicker: {
        WrappedComponent: RangePicker,
    },
    checkbox: {
        WrappedComponent: Checkbox.Group,
    },
    radio: {
        WrappedComponent: Radio.Group,
    },
};

interface IState {
    needOpen: boolean;
    isOpen: boolean;
    openCol: boolean;
}

interface IProps extends FormComponentProps {
    isOpen: boolean;
    formSet: ISetFormValues[];
    outherSet: ISetFormValues[];
    resetBtn: boolean;
    formData: any;
    setOpen: (isOpen: boolean) => void;
    onSearch: (values: any) => void;
}

class ListFilter extends Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            needOpen: false,
            isOpen: false,
            openCol: this.props.isOpen !== undefined, // 是否外部受控
        };
    }

  /**
   * 展开收起
   */
  openOptions = () => {
      const { openCol, isOpen } = this.state;
      if (openCol) {
          this.props.setOpen(!this.props.isOpen);
      } else {
          this.setState({
              isOpen: !isOpen,
          });
      }
  };

  /**
   * 提交
   */
  handleSubmit = (e?) => {
      if (e) {
          e.preventDefault();
      }
      this.props.form.validateFields((err, values) => {
          if (!err) {
              const { onSearch } = this.props;
              if (onSearch) {
                  onSearch(values);
              }
          }
      });
  }

  /**
   * 重置
   */
  handelSearchClear() {
      this.props.form.resetFields();
      this.handleSubmit();
  }

  /**
   * 切换
   */
  outherSetChange = () => {
      setTimeout(() => {
          this.handleSubmit();
      });
  };

  getLength(array) {
      let total = 0;
      array.forEach(item => {
          total += item.span ? item.span : 6;
      });
      return total / 6;
  }

  componentDidMount() {
      const len = this.getLength(this.props.formSet);
      this.setState({
          needOpen: len > 8,
      });
      if (this.props.formData) {
          const fields = {};
          Object.keys(this.props.formData).forEach(key => {
              if (this.props.formData[key] !== undefined) {
                  fields[key] = {
                      value: this.props.formData[key],
                  };
              }
          });
          this.props.form.setFields(fields);
      }
  }

  render() {
      const { needOpen, openCol } = this.state;
      const { formSet, form, outherSet, resetBtn = true } = this.props;
      const isOpen = openCol ? this.props.isOpen : this.state.isOpen;
      const { getFieldDecorator } = form;
      const Buttons = (
          <Form.Item {...formItemLayout}>
              <div>
                  <Button
                      type="primary"
                      htmlType="submit"
                  >
            查询
                  </Button>
                  {
                      resetBtn
            && (
                <Button
                    style={{ marginLeft: '12px' }}
                    onClick={() => this.handelSearchClear()}
                >
              重置
                </Button>
            )
                  }
                  {needOpen && (
                      <>
                          <a style={{ fontSize: '14px', color: '#2B82D8', marginLeft: '8px' }} onClick={this.openOptions}>
                              {isOpen ? '收起' : '展开'}
                          </a>
                          <Icon
                              type={isOpen ? 'up' : 'down'}
                              style={{ fontSize: '14px', color: '#2B82D8' }}
                              onClick={this.openOptions}
                          />
                      </>
                  )}
              </div>
          </Form.Item>
      );
      // const list = formSet.length === 8 ? formSet : isOpen ? formSet : formSet.slice(0, 7);

      let list: ISetFormValues[] = [];
      if (this.getLength(formSet) === 8) {
          list = formSet;
      } else if (isOpen) {
          list = formSet;
      } else {
          list = formSet.slice(0, 7);
      }

      const len = this.getLength(list);

      return (
          <Form
              onSubmit={this.handleSubmit}
              className={styles.listFilter}
          >
              <Row gutter={20} className={styles.form}>
                  {list.map(item => {
                      const {
                          label, // ant design Form原生表单项label
                          type, // 组件类型
                          options = {}, // ant design Form原生表单项options
                          name, // ant design Form原生name属性
                          props, // 外部传入给组件的属性
                          span = 6,
                      } = item;
                      const { WrappedComponent } = mapTypeToComponent[type.toLowerCase()];

                      if (type === 'select') {
                          const { SubComponent } = mapTypeToComponent[type.toLowerCase()];
                          const subOptionsData = item.dataOptions || [];
                          const { models } = item;
                          const [valueKey = 'value', labelKey = 'label'] = models || [];

                          return (
                              <Col md={span} sm={24} key={name}>
                                  <Form.Item {...formItemLayout} label={label}>
                                      {getFieldDecorator(
                                          name,
                                          options,
                                      )(
                                          <WrappedComponent
                                              {...props}
                                          >
                                              {subOptionsData.length > 0
                          && subOptionsData.map((v, i) => (
                              <SubComponent key={i} value={v[valueKey]}>
                                  {v[labelKey]}
                              </SubComponent>
                          ))}
                                          </WrappedComponent>,
                                      )}
                                  </Form.Item>
                              </Col>
                          );
                      }

                      return (
                          <Col md={span} sm={24} key={name}>
                              <Form.Item {...formItemLayout} label={label}>
                                  {getFieldDecorator(
                                      name,
                                      options,
                                  )(
                                      <WrappedComponent
                                          {...props}
                                      />,
                                  )}
                              </Form.Item>
                          </Col>
                      );
                  })}
                  {len % 4 !== 0 && (
                      <Col md={6} sm={24}>
                          {Buttons}
                      </Col>
                  )}
              </Row>

              {/* 表单个数是4的倍数时，单独一行 */}
              {len % 4 === 0 && (
                  <Row gutter={20}>
                      <Col md={24} sm={24} style={{ textAlign: 'right' }}>
                          {Buttons}
                      </Col>
                  </Row>
              )}
              {outherSet.length > 0 && (
                  <div className={styles.otherForm}>
                      <div>
                          {outherSet.map(item => {
                              const {
                                  label, // ant design Form原生表单项label
                                  type, // 组件类型
                                  options = {}, // ant design Form原生表单项options
                                  name, // ant design Form原生name属性
                                  props, // 外部传入给组件的属性
                                  dataOptions,
                                  isShow = true, // 是否显示
                              } = item;
                              const { WrappedComponent } = mapTypeToComponent[
                                  type.toLowerCase()
                              ];
                              const { models } = item;
                              let listOptions;
                              if (models) {
                                  const [valueKey = 'value', labelKey = 'label'] = models || [];
                                  listOptions = dataOptions.map(opt => ({
                                      value: opt[valueKey],
                                      label: opt[labelKey],
                                  }));
                              } else {
                                  listOptions = dataOptions;
                              }
                              return isShow ? (
                                  <Form.Item label={label} key={name}>
                                      {getFieldDecorator(
                                          name,
                                          options,
                                      )(
                                          <WrappedComponent
                                              onChange={this.outherSetChange}
                                              {...props}
                                              options={listOptions}
                                          />,
                                      )}
                                  </Form.Item>
                              ) : null;
                          })}
                      </div>
                  </div>
              )}
          </Form>
      );
  }
}

export const LytListFilter = {
    name: '列表筛选表单',
    tag: 'ListFilter',
    from: '@/components/ListFilter',
    id: Math.random(),
    component: materialWrap(Form.create()(ListFilter)),
    intro: '列表筛选表单组件',
    props: {
        formSet: [],
        outherSet: [],
        refFS: 'formRef',
        onSearchFS: 'submit',
        onResetFS: 'reset',
    },
    haveChildren: false,
    editComponents: [
        { name: 'className' },
        { name: 'style' },
        { name: 'form', props: { propName: 'formSet', types: LYTTYPES } },
        { name: 'form', props: { propName: 'outherSet', types: LYTTYPES } },
    ],
    project: '陆运通后台',
    ext: {
        code: {
            'index.js': {
                importDeclaration: {
                    react: {
                        export: ['useRef'],
                    },
                    './map': {
                        export: ['listFilters', 'outherSet'],
                    },
                    '@/components/ListFilter': {
                        default: 'ListFilter',
                    },
                },
                variableDeclarator: [
                    'const formRef = useRef(null);',
                ],
            },
            'map.js': {
                codes: [
                    `export function listFilters() {
                        return {{JSON.stringify(formSet)}};
                    }`,
                    `export function outherSet() {
                        return {{JSON.stringify(outherSet)}};
                    }`,
                ],
            },
        },
    },
};

export default Form.create()(ListFilter);
