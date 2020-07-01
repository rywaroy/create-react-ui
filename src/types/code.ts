import React from 'react';
import { ColumnProps } from 'antd/es/table';

export interface IFormCode {
  url: string;
  code: string;
}

export interface ITableCode {
  url: string;
  code: string;
}

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
}

export interface IFastItem {
  label: string;
  type: string;
}

export interface IFormObject {
  code: string;
  options: ISetFormValues[];
  name: string;
  labelCol: number;
  wrapperCol: number,
  width: number;
  title: string;
}

export interface IColumn extends ColumnProps<IDataSource> {
  titleText: string;
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

export interface IPopupForm {
  title: string;
  name: string;
}

export interface ISetColumnValue {
  width: number;
}

export interface ITableOperation {
  opts: ITableOpt[];
  width: number;
  fixed: boolean | 'left' | 'right';
}
