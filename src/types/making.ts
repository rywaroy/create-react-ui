export interface IMaterial {
  /**组件名 */
  name: string;

  /**标签 */
  tag: string;

  /**import from */
  from: string;

  /**component function */
  component: any;

  /**简介 */
  intro: string;

  /**props */
  props: any;

  /**默认props 只做展示使用 */
  defaultProps?: any;

  /**额外props 组件单独处理使用 */
  extraProps?: any;

  /**编辑组件map */
  editComponents: IEditComponents[];
  id: number;

  /**父级id */
  pid?: number;

  /**是否激活 */
  active?: boolean;

  /**子组件 */
  children?: IMaterial[];

  /**来源项目 */
  project?: string;

  /**是否能加入子组件 */
  haveChildren: boolean;

  haveWrap?: boolean;

  /**幽灵属性 */
  ghost?: boolean;

  /**额外信息 */
  ext?: {
    /**组件类型 */
    type?: string;

    /**代码逻辑 */
    code?: {
      'model.js'?: IModelOption;
      [file: string]: IPageOtion | IComponentOption | IModelOption;
    }

    /**额外代码逻辑 */
    extraCode?: {
      [file: string]: IPageOtion | IComponentOption | IModelOption;
    }
  };
}

export interface IComponentOption {
  /**
   * 可变说明符
   * @example
   * const formRef = useRef(null);
   * const dispatch = useDispatch();
  */
  variableDeclarator?: string[];

  /**
   * import
   * @example
   * import React, { useEffect, useRef } from 'react';
   */
  importDeclaration?: IImport;

  /**
   * 解构
   * @example
   * const { data } = this.props;
   */
  destructuring?: IDestructuring;

  /**
   * 方法
   */
  methods?: string[];

  /**
   * useState
   * @example
   * const [data, setData] = useState([]);
   */
  useState?: string[];

  /**
   * useEffect
   * @example
   * useEffect(() => {}, []);
   */
  useEffect?: string[];

  
  state?: any;
}

export interface IModelOption {
  importDeclaration?: IImport;
  state?: {
    [prop: string]: any;
  };
  effects?: string[];
  reducers?: string[];
}

export interface IPageOtion {
  importDeclaration?: IImport;
  codes: string[];
}

export interface IImport {
  [module: string]: {
    default?: string;
    export?: string[];
  };
}

export interface IDestructuring {
  [v: string]: string[];
}

export interface IEditComponents {
  name: string;
  props?: any;
  tips?: string;
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
  linkModal?: string;
}

export interface ITableScroll {
  x?: number | true;
  y?: number | true;
}

export interface IPageProps {
  url: string;
  name: string;
  namespace: string;
}