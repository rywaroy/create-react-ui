module.exports = function oilListpageModel(namespace) {
    return `
const initState = () => ({
    listData: [],
    total: 0,
    pageNum: 1,
    pageSize: 10,
    searchFormData: {},
});

export default {
    namespace: '${namespace}',
    state: initState(),
    effects: {
        *updateStateCall(action, { call, put }) {
            yield put({
                type: 'updateState',
                payload: action.payload
            });
        },
        *queryList({ payload }, { call, put, select }) {// 列表查询
            const ${namespace} = yield select(state => state.${namespace});
            let { pageNum, pageSize, searchFormData } = ${namespace};
            let params = {
                pageNum,
                pageSize,
                ...searchFormData,
                ...payload,
            };
            const data = yield call(queryListData, params);
            if (data && data.code === 0) {
                yield put({
                    type: 'updateState',
                    payload: {
                        listData: data.data || [],
                        total: data.count
                    }
                });
            }
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
};
`;
};
