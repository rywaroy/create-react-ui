import fs from 'fs';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import commentParse from './commentParse';
import { IPageObject } from '../../types/document';

export default function astParse(base: string, code?: string): IPageObject | boolean {
    const obj: IPageObject = {};
    if (!code) {
        code = fs.readFileSync(base, 'utf-8');
    }
    try {
        const ast = parse(code, {
            sourceType: 'module',
            plugins: [
                'classProperties',
                'jsx',
                'typescript',
            ],
        });
        // @ts-ignore
        traverse(ast, {
            ExportDefaultDeclaration(path: any) {
                if (path.node.declaration.type === 'FunctionDeclaration') {
                    /**
                    * 导出函数式组件
                    * @example
                    * export default function Component(props) {
                    *
                    * }
                    */
                    const identifier = path.node.declaration.id.name;
                    obj.name = identifier;
                }
                if (path.node.declaration.type === 'ClassDeclaration') {
                    /**
                    * 导出类组件
                    * @example
                    * export default class Component extends React.Component {
                    *
                    * }
                    */
                    const identifier = path.node.declaration.id.name;
                    obj.name = identifier;
                }
                if (path.node.declaration.type === 'Identifier') {
                    /**
                     * 导出变量
                     * @example
                     * class Component extends react.Component {}
                     * export default Component;
                     */
                    const identifier = path.node.declaration.name;
                    obj.name = identifier;
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
                        }
                        if (argument.type === 'CallExpression') {
                            identifier = argument.arguments[0].name;
                        }
                        obj.name = identifier;
                    }
                }
            },
            Program(path: any) {
                if (path.node.body.length > 0) {
                    const node = path.node.body[0];
                    if (node.leadingComments) {
                        const { commentArray, example } = commentParse(node.leadingComments);
                        obj.main = commentArray;
                        obj.example = example;
                    }
                }
            },
        });
    } catch {
        return false;
    }

    return obj;
}
