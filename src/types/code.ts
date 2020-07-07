import { ColumnProps } from 'antd/es/table';

export interface IFormCode {
  url: string;
}

export interface IFormObject {
  options: ISetFormValues[];
  name: string;
  labelCol: number;
  wrapperCol: number,
  width: number;
  title: string;
  span: number;
}

export type IFormCodeParams = IFormCode & IFormObject;

export interface ITableObject {
  columns: IColumn[];
  dataSource: IDataSource[];
  variable: string;
}

export interface ITableCode {
  url: string;
}

export type ITableCodeParams = ITableCode & ITableObject;

export interface IFormItem {
  type: string;
  label: string;
  name: string;
  initialValue?: string;
  span?: number;
  formItemLayout?: IFormItemLayout;
  formItemLayoutText?: string;
  rules?: IFormRule[];
  selectOptions?: IMockData[];
  checkboxOptions?: IMockData[];
  radioOptions?: IMockData[];
}

export interface IFormItemLayout {
  labelCol: {
    span: number;
  };
  wrapperCol: {
    span: number;
  }
}

export interface IFormRule {
  rule?: string;
  content?: string | boolean;
  message?: string;
}

export interface IMockData {
  value: string;
  label: string;
}

export interface ISetFormValues {
  type: string;
  label: string;
  name: string;
  initialValue?: string;
  span?: number;
  formItemLayout?: 'formItemLayout' | '数值' | '变量' | boolean | IFormItemLayout;
  labelCol?: number;
  wrapperCol?: number;
  formItemLayoutText?: string;
  selectOptions?: IMockData[];
  checkboxOptions?: IMockData[];
  radioOptions?: IMockData[];
  isShow?: boolean;
  rules?: any[];
  validate?: any[];
  colon?: boolean;
  props?: any;
  colClass?: string;
  options?: any;
  models?: [string, string];
  subComponent?: any;
  addonAfter?: any;
}

export interface IFastItem {
  label: string;
  type: string;
}

export interface IColumn extends ColumnProps<IDataSource> {
  titleText?: any;
  opts?: ITableOpt[];
  width?: number;
}

export interface IDataSource {
  id: number;
  [props: string]: any;
}

export interface ITableOpt {
  link?: boolean;
  text?: string;
  linkName?: string;
}

export interface ISetColumnValue {
  width: number;
}

export interface ITableOperation {
  opts: ITableOpt[];
  width: number;
  fixed: boolean | 'left' | 'right';
}

export interface IListPage {
  url: string;
  name: string;
  namespace: string;
  pageOption?: IListPageOption;
}

export interface IListPageOption {
  title: string;
  buttons: IListPageButton[];
  formObject: IFormObject,
  tableObject: ITableObject,
  popupForms: IFormObject[];
}

export interface IListPageButton {
  title: string;
  linkName?: string;
}
