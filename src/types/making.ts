export interface IMaterial {
  name: string;
  tag: string;
  from: string;
  component: any;
  intro: string;
  props: any;
  defaultProps?: any;
  editComponents: IEditComponents[];
  id: number;
  pid?: number;
  active?: boolean;
  children?: IMaterial[];
  project?: string;
  haveChildren: boolean;
  haveWrap?: boolean;
  ghost?: boolean;
}

export interface IEditComponents {
  name: string;
  props?: any;
}

export interface IPageItem {
  title: string;
  value: IMaterial[];
  id: string;
}

export interface IColumn {
  title: string;
  dataIndex?: string;
  key?: string;
  width?: number;
  fixed?: string | boolean;
  render?: () => React.ReactNode;
  opts?: IOpt[];
}

export interface IOpt {
  text: string;
  link: boolean;
}