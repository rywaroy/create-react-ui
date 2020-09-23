import { IComponentOption } from '../types/making';
import functionComponentImportTemplate from './function-component-import-template';

export default function functionComponentIndex(values: IComponentOption) {
    const { variableDeclarator, importDeclaration, destructuring, methods, useState, useEffect, jsx, name } = values;

    // 组件名
    const functionName = name.charAt(0).toUpperCase() + name.slice(1);

    // import
    const importString = functionComponentImportTemplate(importDeclaration);

    // useState
    let useStateString = '';
    if (useStateString) {
        useStateString = useState.join('\n');
    }

    // destructuring
    let destructuringString = '';
    if (destructuring) {
        Object.keys(destructuring).forEach(key => {
            destructuringString += `const { ${destructuring[key].join(', ')} } = ${key};`;
        });
    }

    // importDeclaration
    let variableString = '';
    if (variableDeclarator) {
        variableString = variableDeclarator.join('\n');
    }

    // methods
    let methodsString = '';
    if (methods) {
        methodsString = methods.join('\n\n');
    }

    // useEffect
    let useEffectString = '';
    if (useEffect) {
        useEffectString = useEffect.join('\n\n');
    }

    // export
    let exportDefaultName = functionName;
    if (importDeclaration && importDeclaration.antd) {
        if (importDeclaration.antd.export.indexOf('Form') > -1) {
            exportDefaultName = `Form.create()(${exportDefaultName})`;
        }
    }

    return `
        ${importString}

        const ${functionName} = (props) => {
            ${useStateString}

            ${variableString}

            ${destructuringString}

            ${methodsString}

            ${useEffectString}

            return (
                ${jsx}
            )
        }

        export default ${exportDefaultName};
    `;
}
