import { IPageOtion } from '../types/making';
import functionComponentImportTemplate from './function-component-import-template';

export default function functionComponentPage(values: IPageOtion) {
    const { codes = [], importDeclaration } = values;

    // import
    const importString = functionComponentImportTemplate(importDeclaration);

    return `
    ${importString}
    ${codes.join('\n\n')}
    `;
}
