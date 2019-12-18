module.exports = function umiModel(namespace, isOilConfig) {

    if (isOilConfig) {
        return `const initState = () => ({});

export default {
    namespace: '${namespace}',
    state: initState(),
    subscriptions: {},
    effects: {
        *updateStateCall(action, { call, put }) {
            yield put({
                type: 'updateState',
                payload: action.payload
            });
        },
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload };
        },
        resetState(state, { payload }) {
            return { ...initState() };
        }
    },
};`;
    }

    return `export default {
    namespace: '${namespace}',
    state: {},
    subscriptions: {},
    effects: {},
    reducers: {},
};`;
};