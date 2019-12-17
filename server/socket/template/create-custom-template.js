const path = require('path');
const fs = require('fs');
const execa = require('execa');
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('babel-types');


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
            fs.writeFileSync(path.join(targetPath, file), fs.readFileSync(path.join(modelPath, file), 'utf-8'));
        });
        if (fileName && variable) {
            const url = path.join(targetPath, fileName);
            const ast = babelParser.parse(fs.readFileSync(url, 'utf-8'), {
                sourceType: 'module',
            });
            traverse(ast, createExportVisitor(ast, variable));
            const output = generate(ast);
            fs.writeFileSync(url, output.code);
        }
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