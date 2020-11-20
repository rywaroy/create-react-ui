export interface IPageObject {
  /** 组件名 */
  name?: string;
  main?: ICommentLine[];
  path?: string;
  projectPath?: string;
  fileName?: string;
  ext?: string;
  example?: string;
}

export interface ICommentLine {
  name: string;
  value: string;
  cn: string;
}

export interface INote {
  [props: string]: ICommentLine
}
