import { IImport } from '../types/making';

export default function functionComponentImportTemplate(importDeclaration: IImport) {
    let importString = '';
    if (importDeclaration) {
        Object.keys(importDeclaration).forEach(key => {
            const { export: exportVar, default: defaultVar } = importDeclaration[key];
            importString += 'import ';
            if (defaultVar) {
                importString += `${defaultVar} `;
            }
            if (exportVar) {
                if (defaultVar) {
                    importString += ',';
                }
                importString += `{ ${exportVar.join(',')} } `;
            }
            importString += `from '${key}';\n`;
        });
    }
    return importString;
}
