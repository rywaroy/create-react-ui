export interface IMaterial {
    name: string;
    tag: string;
    from: string;
    component: any;
    intro: string;
    props: any;
    copyProps?: any;
    defaultProps?: any;
    extraProps?: any;
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
            'model.js'?: IModelOption;
            [file: string]: IPageOtion | IComponentOption | IModelOption;
        };
        extraCode?: {
            [file: string]: IPageOtion | IComponentOption | IModelOption;
        }
        componentPath?: string;
        [prop: string]: any;
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

    jsx?: string;

    name: string;
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
}

export interface IOpt {
    text: string;
    link: boolean;
    linkModal?: string;
  }
