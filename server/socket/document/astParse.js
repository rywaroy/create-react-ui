const fs = require('fs');
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

module.exports = function astParse(base) {
    const ast = babelParser.parse(fs.readFileSync(base, 'utf-8'), {
        sourceType: 'module',
        plugins: [
            'classProperties',
            'jsx',
        ],
    });
    traverse(ast, {
        ExportDefaultDeclaration(path) {
            if (path.node.declaration.type === 'FunctionDeclaration') {
                /**
                * 导出函数式组件
                * @example
                * export default function Component(props) {
                *
                * }
                */
                console.log(path.node.declaration);
            }
        },
    });
};
