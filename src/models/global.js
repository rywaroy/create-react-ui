import { getFiles } from '@/services/file';
import { getLabelConfig } from '@/services/configlist';

export default {
    namespace: 'global',
    state: {
        files: [], // 文件列表
        folders: [], // 文件夹列表
        labelList: [], // label配置列表
        labelDisplay: false, // label是否显示
        labelShow: false, // label是否打开
    },
    effects: {
        * updateFiles(action, { call, put }) {
            const res = yield call(getFiles);
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
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload };
        },
    },
};
