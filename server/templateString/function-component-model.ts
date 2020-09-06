import { IModelOption } from '../types/making';

export default function functionComponentModel(values: IModelOption, namespace: string) {
    const { state = {}, effects = [], reducers = [] } = values;

    return `
    const initState = () => (${JSON.stringify(state)});
    
    export default {
        namespace: '${namespace}',
        state: initState(),
        effects: {
            * changeState({ payload }, { call, put, select }) {
                yield put({
                    type: 'updateState',
                    payload
                });
            },
            ${effects.join(',\n')}
        },
        reducers: {
            updateState(state, { payload }) {
                return { ...state, ...payload };
            },
            resetState(state, { payload }) {
                return { ...initState() };
            },
            ${reducers.join(',\n')}
        }
    };
    `;
}
