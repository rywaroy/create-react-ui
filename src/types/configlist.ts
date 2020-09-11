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

export interface IClassItem {
  id: string;
  name: string;
  value: string;
  display: boolean;
}

export interface IPatchClassParams extends IClassItem {}

export interface IDeleteClassParams {
  id: string;
}

export interface IAddClassParams {
  name: string;
  value: string;
}

export interface IPageItem {
  id: string;
  title: string;
  value: string;
}