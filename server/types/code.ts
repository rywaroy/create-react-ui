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
