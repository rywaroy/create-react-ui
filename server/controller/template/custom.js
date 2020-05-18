const path = require('path');
const fs = require('fs-extra');
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

module.exports = async function customController(ctx) {
    const { url, folderName, fileName, variable } = ctx.query;
    let targetPath = path.join(process.cwd(), url || '');
    // 创建文件夹
    if (folderName) {
        targetPath = path.join(targetPath, folderName);
        if (fs.existsSync(targetPath)) {
            ctx.error(0, '该文件夹已存在', null);
        }
        fs.mkdirSync(targetPath);
    }
    const modelPath = path.join(process.cwd(), '.crui', 'template');

    // 复制文件到目标文件夹
    fs.copySync(modelPath, targetPath);

    if (fileName && variable) {
        const targetUrl = path.join(targetPath, fileName);
        const ast = babelParser.parse(fs.readFileSync(targetUrl, 'utf-8'), {
            sourceType: 'module',
            plugins: [
                'classProperties',
                'jsx',
            ],
        });
        traverse(ast, createExportVisitor(ast, variable));
        const output = generate(ast);
        fs.writeFileSync(targetUrl, output.code);
    }
    ctx.success(200, '创建成功', null);
};

/**
 *
 * @param {String} variable - 变量名
 * @returns {Object} visitor
 */
function createExportVisitor(ast, variable) {
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
}

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
