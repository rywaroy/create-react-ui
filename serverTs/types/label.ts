export interface ILabelJson {
  display: boolean;
  list: ILabelItem[];
}

interface ILabelItem {
  name: string;
  id: string;
}
