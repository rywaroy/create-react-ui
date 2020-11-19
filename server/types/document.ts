export interface IPageObject {
  /** 组件名 */
  name?: string;
  defaultProps?: IPageDefaultProps;
  props?: IPageProps[];
  main?: ICommentLine[];
  path?: string;
  projectPath?: string;
  fileName?: string;
  ext?: string;
}

export interface ICommentLine {
  name: string;
  value: string;
  cn: string;
}

export interface INote {
  [props: string]: ICommentLine
}

export interface IPageProps {
  name: string;
  value?: ICommentLine[];
  type: string;
  isRequired?: boolean;
  defaultProps?: string | number;
}

export interface IPageDefaultProps {
  [props: string]: string | number;
}
