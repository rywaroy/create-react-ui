import defaultPlugin from './defaultPlugin';
import children from './children';
import table from './table';
import fileData from './fileData';
import template from './template';
import formitem from './formitem';
import listFilter from './listFilter';
import generateModal from './generateModal';
import extraComponent from './extraComponent';
import createJsx from './createJsx';
import baseComponent from './baseComponent';

export default [
    defaultPlugin,

    /** 自定义插件 */
    children,
    table,
    formitem,
    listFilter,
    generateModal,
    extraComponent,
    baseComponent,
    /** 自定义插件 */

    template,
    fileData,
    createJsx,
];
