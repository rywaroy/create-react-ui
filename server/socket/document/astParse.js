const fs = require('fs');
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const commentParse = require('./commentParse');

module.exports = function astParse(base) {
    const obj = {};
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
                obj.name = path.node.declaration.id.name;
                if (path.node.leadingComments) {
                    obj.main = commentParse(path.node.leadingComments);
                }
                console.log(obj);
            }
        },
    });
};
