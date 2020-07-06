import { IFormObject, ITableObject } from '../types/code';
import formCodeTemplate from './form-code-template';
import tableCodeTemplate from './table-code-template';

export default function oilListpageMap(formObject: IFormObject, tableObject: ITableObject, popupForms: IFormObject[]) {
    // 表单代码
    const { options, name, labelCol, wrapperCol } = formObject;
    const formCode = formCodeTemplate(options, name, labelCol, wrapperCol);

    // 表格代码
    const { columns, variable } = tableObject;
    const tableCode = tableCodeTemplate(columns, variable);

    // 弹窗代码
    const popupFormsCode = popupForms.map(item => {
        const { options, name, labelCol, wrapperCol } = item;
        return formCodeTemplate(options, name, labelCol, wrapperCol);
    }).join('\n\n');

    return `
${formCode}

${tableCode}

${popupFormsCode}
`;
}
