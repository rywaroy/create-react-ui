import { IModelOption } from '../types/making';
import functionComponentImportTemplate from './function-component-import-template';

export default function functionComponentModel(values: IModelOption, namespace: string) {
    const { state = {}, effects = [], reducers = [], importDeclaration } = values;

    // import
    const importString = functionComponentImportTemplate(importDeclaration);

    return `
    ${importString}

    const initState = () => ({
        ${renderState(state)}
    });
    
    export default {
        namespace: '${namespace}',
        state: initState(),
        effects: {
            * changeState({ payload }, { put }) {
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
            resetState() {
                return { ...initState() };
            },
            ${reducers.join(',\n')}
        }
    };
    `;
}

function renderState(state) {
    let str = '';
    Object.keys(state).forEach(key => {
        str += `${key}: ${state[key]},\n`;
    });
    return str;
}
