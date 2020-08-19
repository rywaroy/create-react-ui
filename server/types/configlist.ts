export interface ILabelJson {
  display: boolean;
  list: ILabelItem[];
}

interface ILabelItem {
  name: string;
  id: string;
}

export interface IClassItem {
  id: string;
  name: string;
  value: string;
}
