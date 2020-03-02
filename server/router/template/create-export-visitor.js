const traverse = require('@babel/traverse').default;

/**
 *
 * @param {String} variable - 变量名
 * @returns {Object} visitor
 */
module.exports = function createExportVisitor(ast, variable) {
    const visitor = {
        ExportDefaultDeclaration(path) {
            if (path.node.declaration.type === 'FunctionDeclaration') {
                /**
                * 导出函数式组件
                * @example
                * export default function Component(props) {
                *
                * }
                */
                path.node.declaration.id.name = variable;
            }

            if (path.node.declaration.type === 'ClassDeclaration') {
                /**
                * 导出类组件
                * @example
                * export default class Component extends react.Component {
                *
                * }
                */
                path.node.declaration.id.name = variable;
            }

            if (path.node.declaration.type === 'Identifier') {
                /**
                 * 导出变量
                 * @example
                 * class Component extends react.Component {}
                 * export default Component;
                 */
                const identifier = path.node.declaration.name;
                path.node.declaration.name = variable;
                traverse(ast, createVisitor(ast, variable, identifier));
            }

            if (path.node.declaration.type === 'CallExpression') {
                /**
                 * 导出表达式
                 * @example
                 * class Component extends react.Component {}
                 * export default connect(({ global }) => ({ global }))(Component);
                 * // or
                 * export default Form.create()(Component);
                 * // or
                 * export default connect(({ global }) => ({ global }))(Form.create()(Component));
                 */

                if (path.node.declaration.arguments.length > 0) {
                    const argument = path.node.declaration.arguments[0];
                    let identifier;
                    if (argument.type === 'Identifier') {
                        identifier = argument.name;
                        argument.name = variable;
                    }
                    if (argument.type === 'CallExpression') {
                        identifier = argument.arguments[0].name;
                        argument.arguments[0].name = variable;
                    }
                    traverse(ast, createVisitor(ast, variable, identifier));
                }
            }
        },

    };
    return visitor;
};

function createVisitor(ast, variable, identifier) {
    const visitor = {
        FunctionDeclaration(path) {
            if (path.node.id.name === identifier) {
                path.node.id.name = variable;
            }
        },
        ClassDeclaration(path) {
            if (path.node.id.name === identifier) {
                path.node.id.name = variable;
            }
        },
    };
    return visitor;
}
