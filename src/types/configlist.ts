export interface ILabelItem {
  id: string;
  name: string;
}

export interface IPatchLabelParams extends ILabelItem {}

export interface IDeleteLabelParams {
  id: string;
}

export interface IAddLabelParams {
  name: string;
}

export interface IChangeLabelDisplayParams {
  display: boolean;
}
