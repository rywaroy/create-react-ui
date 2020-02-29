import { getFiles } from '@/services/file';

export default {
    namespace: 'global',
    state: {
        files: [], // 文件列表
        folders: [], // 文件夹列表
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
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload };
        },
    },
};
