import { AxiosResponseReturn } from '@/types/global';
import { TreeNode } from 'antd/es/tree-select';

export interface ILabelItem {
  name: string;
  id: string;
}

export interface IIsJsParams {
  url: string;
}

export type IGetFilesReturn = AxiosResponseReturn<IGetFilesReturnData>;

interface IGetFilesReturnData {
  filesArray: TreeNode[];
  foldersArray: TreeNode[];
}

export interface IIsFolderParams {
  url: string;
}

export interface IIsJsOrFolderParams {
  url: string;
}

export interface IGetFolderParams {
  base: string;
}

export type IIsJsRetrun = AxiosResponseReturn<null>;

export type IGetTemplateReturn = AxiosResponseReturn<IGetTemplateReturnData[]>;

interface IGetTemplateReturnData {
  title: string;
  value: string;
  key: number;
}

export type IGetFolderReturn = AxiosResponseReturn<IGetFolderReturnData>;

interface IGetFolderReturnData {
  svnBase: string;
  list: TreeNode[];
}

export type IIsFolderRetrun = AxiosResponseReturn<null>;

export type IIsJsOrFolderRetrun = AxiosResponseReturn<IIsJsOrFolderReturnData>;

interface IIsJsOrFolderReturnData {
  type: string;
}