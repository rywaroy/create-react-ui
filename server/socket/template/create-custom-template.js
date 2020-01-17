const path = require('path');
const fs = require('fs');
const execa = require('execa');
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;


module.exports = function createCustomTemplate({ url, folderName, fileName, variable }) {
    return new Promise(function (resolve, reject) {
        let targetPath = path.join(process.cwd(), url ? url : '');
        // 创建文件夹
        if (folderName) {
            targetPath = path.join(targetPath, folderName);
            if (fs.existsSync(targetPath)) {
                reject('该文件夹已存在');
            }
            execa.commandSync(`mkdir ${targetPath}`);
        }
        const modelPath = path.join(process.cwd(), '.crui', 'template');
        // 复制文件到目标文件夹
        const files = fs.readdirSync(modelPath);
        files.forEach(file => {
            if (file.indexOf('.') === -1) { // 简单判断是否是文件夹
                const folderPath = path.join(targetPath, file);
                execa.commandSync(`mkdir ${folderPath}`);
                const folderFiles = fs.readdirSync(path.join(modelPath, file));
                folderFiles.forEach(ffiler => { // 二级文件夹复制
                    console.log(path.join(modelPath, file, ffiler));
                    const data = fs.readFileSync(path.join(modelPath, file, ffiler));
                    fs.writeFileSync(path.join(folderPath, ffiler), data, 'utf-8');
                });
            } else {
                const data = fs.readFileSync(path.join(modelPath, file));
                fs.writeFileSync(path.join(targetPath, file), data, 'utf-8');
            }

        });
        if (fileName && variable) {
            const url = path.join(targetPath, fileName);
            const ast = babelParser.parse(fs.readFileSync(url, 'utf-8'), {
                sourceType: 'module',
                plugins: [
                    'classProperties',
                    'jsx',
                ],
            });
            traverse(ast, createExportVisitor(ast, variable));
            const output = generate(ast);
            fs.writeFileSync(url, output.code);
        }
        resolve();
    });
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