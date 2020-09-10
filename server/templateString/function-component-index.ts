import { IComponentOption } from '../types/making';
import functionComponentImportTemplate from './function-component-import-template';

export default function functionComponentIndex(values: IComponentOption, name: string, jsx: string) {
    const { variableDeclarator, importDeclaration, destructuring, methods, useState, useEffect } = values;

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
        methodsString = methods.join('\n');
    }

    // methods
    let useEffectString = '';
    if (useEffect) {
        useEffectString = useEffect.join('\n');
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

        export default ${functionName};
    `;
}
