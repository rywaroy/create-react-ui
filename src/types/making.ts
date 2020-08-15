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
  haveChildren: boolean;
}

export interface IEditComponents {
  name: string;
  props?: any;
}