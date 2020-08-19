import { Effect } from 'dva';
import { Reducer } from 'redux';
import { TreeNode } from 'antd/es/tree-select';
import { ILabelItem, IGetFilesReturn } from '@/types/file';
import { IClassItem } from '@/types/configlist';
import { getFiles } from '@/services/file';
import { getLabelConfig, getClassList } from '@/services/configlist';

export interface GlobalModelState {
    files: TreeNode[];
    folders: TreeNode[];
    labelList: ILabelItem[];
    classList: IClassItem[];
    labelDisplay: boolean;
    labelShow: boolean;
    collapsed: boolean;
}

export interface GlobalModelType {
    namespace: 'global',
    state: GlobalModelState,
    effects: {
        updateFiles: Effect,
        getLabelConfig: Effect,
        getClassList: Effect,
    },
    reducers: {
        updateState: Reducer<GlobalModelState>
    };
}

const GlobalModel: GlobalModelType = {
    namespace: 'global',
    state: {
        files: [], // 文件列表
        folders: [], // 文件夹列表
        labelList: [], // label配置列表
        labelDisplay: false, // label是否显示
        labelShow: false, // label是否打开
        collapsed: false, // 菜单是否收缩
        classList: [], // 缓存class
    },
    effects: {
        * updateFiles(action, { call, put }) {
            const res: IGetFilesReturn = yield call(getFiles);
            const { filesArray, foldersArray } = res.data.data;
            yield put({
                type: 'updateState',
                payload: {
                    files: filesArray,
                    folders: foldersArray,
                },
            });
        },
        * getLabelConfig(action, { call, put }) {
            const res = yield call(getLabelConfig);
            const { display, list } = res.data.data;
            yield put({
                type: 'updateState',
                payload: {
                    labelList: list,
                    labelDisplay: display,
                },
            });
        },
        * getClassList(action, { call, put }) {
            const res = yield call(getClassList);
            const { data } = res.data;
            yield put({
                type: 'updateState',
                payload: {
                    classList: data,
                },
            });
            const cache = document.getElementById('class-cache');
            if (cache) {
                cache.remove();
            }
            const style = document.createElement('style');
            style.type = 'text/css';
            style.id = 'class-cache';
            let text = '';
            data.forEach((item: IClassItem) => {
                text += `.${item.name}{${item.value}} `;
            });
            style.innerHTML = text;
            document.getElementsByTagName('head').item(0).appendChild(style);
        },
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload };
        },
    },
};

export default GlobalModel;
