export default {
    namespace: 'global',
    state: {
        files: [],
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload };
        },
    }
};