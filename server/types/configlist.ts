export interface ILabelJson {
  display: boolean;
  list: ILabelItem[];
}

export interface ILabelItem {
  name: string;
  id: string;
}

export interface IClassItem {
  id: string;
  name: string;
  value: string;
  display: boolean;
}
