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
  ext?: {
    type?: string;
    code?: {
      index?: IComponentOption;
      model?: IModelOption;
      [file: string]: string[] | IComponentOption | IModelOption;
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
  import?: IImport;

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
}

export interface IModelOption {

}

export interface IImport {
  [module: string]: {
    default?: string;
    export?: string | string[];
  };
}

export interface IDestructuring {
  [v: string]: string[];
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

export interface ITableScroll {
  x?: number | true;
  y?: number | true;
}

export interface IPageProps {
  url: string;
  name: string;
  namespace: string;
}