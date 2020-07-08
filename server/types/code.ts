import { ColumnProps } from 'antd/es/table';

export interface ITableCode {
  url: string;
}

export interface ITableValues {
  columns: IColumn[];
  dataSource: IDataSource[];
  variable: string;
}

export type ITableCodeParams = ITableCode & ITableValues;

export interface IColumn extends ColumnProps<IDataSource> {
  titleText?: string;
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

export interface IFormItemLayout {
  labelCol: {
    span: number;
  };
  wrapperCol: {
    span: number;
  }
}

export interface IMockData {
  value: string;
  label: string;
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

export interface ITableObject {
  columns: IColumn[];
  dataSource: IDataSource[];
  variable: string;
}