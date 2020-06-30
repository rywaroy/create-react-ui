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
