export default {
    namespace: 'global',
    state: {
        files: [], // 文件列表
        folders: [], // 文件夹列表
    },
    effects: {
        updateFiles() {
            window.socket.emit('get-files');
        },
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload };
        },
    }
};