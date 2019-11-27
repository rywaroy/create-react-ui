export default {
    namespace: 'global',
    state: {
        files: [],
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