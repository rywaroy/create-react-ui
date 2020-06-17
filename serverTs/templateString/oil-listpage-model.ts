export default function oilListpageModel(namespace: string, popupFormsName, tableData) {
    const popupFormsNames = popupFormsName.map(item => `    ${item}Visible: false,
    ${item}ModalKey: Math.random(),`).join('\n');

    return `
const initState = () => ({
    listData: ${JSON.stringify(tableData)},
    total: 0,
    pageNum: 1,
    pageSize: 10,
    searchFormData: {},
${popupFormsNames}
});

export default {
    namespace: '${namespace}',
    state: initState(),
    effects: {
        *updateStateCall({ payload }, { call, put }) {
            yield put({
                type: 'updateState',
                payload,
            });
        },
        *queryList({ payload }, { call, put, select }) { // 列表查询
            const ${namespace} = yield select(state => state.${namespace});
            const { pageNum, pageSize, searchFormData } = ${namespace};
            const params = {
                pageNum,
                pageSize,
                ...searchFormData,
                ...payload,
            };
            // const data = yield call(queryListData, params);
            // if (data && data.code === 0) {
            //    yield put({
            //        type: 'updateState',
            //        payload: {
            //            listData: data.data || [],
            //            total: data.count
            //        }
            //    });
            // }
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
}
