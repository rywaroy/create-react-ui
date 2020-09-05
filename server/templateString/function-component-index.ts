import { IComponentOption } from '../types/making';

export default function functionComponentIndex(values: IComponentOption, name: string, jsx: string) {
    const { variableDeclarator, importDeclaration, destructuring, methods, useState, useEffect } = values;

    // 组件名
    const functionName = name.charAt(0).toUpperCase() + name.slice(1);

    // import
    let importString = '';
    if (importDeclaration) {
        Object.keys(importDeclaration).forEach(key => {
            const { export: exportVar, default: defaultVar } = importDeclaration[key];
            importString += 'import ';
            if (defaultVar) {
                importString += `${defaultVar} `;
            }
            if (exportVar) {
                importString += `{ ${typeof exportVar === 'string' ? `${exportVar}` : `${exportVar.join(',')}`} } `;
            }
            importString += `from '${key}';\n`;
        });
    }

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
        ${importString};

        const ${functionName} = (props) => {
            ${useStateString}

            ${destructuringString}

            ${variableString}

            ${methodsString}

            ${useEffectString}

            return (
                ${jsx}
            )
        }

        export default ${functionName};
    `;
}
