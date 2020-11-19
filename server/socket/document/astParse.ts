import fs from 'fs';
import { parse } from '@babel/parser';
import traverse, { Visitor } from '@babel/traverse';
import commentParse from './commentParse';
import { IPageObject, IPageDefaultProps, IPageProps } from '../../types/document';

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
                    // @ts-ignore
                    traverse(ast, createPropsVisitor(obj, identifier));
                }
                if (path.node.declaration.type === 'ClassDeclaration') {
                    /**
                    * 导出类组件
                    * @example
                    * export default class Component extends React.Component {
                    *
                    * }
                    */
                    if (path.node.declaration.body.body.length > 0) {
                        path.node.declaration.body.body.forEach(item => {
                            if (item.type === 'ClassProperty' && item.static) {
                                if (item.key.name === 'defaultProps') {
                                    obj.defaultProps = parseDefaultProps(item.value.properties);
                                }
                                if (item.key.name === 'propTypes') {
                                    obj.props = parsePropTypes(item.value.properties);
                                }
                            }
                        });
                    }
                    const identifier = path.node.declaration.id.name;
                    obj.name = identifier;
                    // @ts-ignore
                    traverse(ast, createPropsVisitor(obj, identifier));
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
                    // @ts-ignore
                    traverse(ast, createVisitor(obj, identifier, ast));
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
                        // @ts-ignore
                        traverse(ast, createVisitor(obj, identifier, ast));
                    }
                }
            },
            Program(path: any) {
                if (path.node.body.length > 0) {
                    const node = path.node.body[0];
                    if (node.leadingComments) {
                        obj.main = commentParse(node.leadingComments);
                    }
                }
            },
        });

        // 合并defaultProps
        if (obj.defaultProps && obj.props) {
            obj.props.forEach(item => {
                if (obj.defaultProps[item.name]) {
                    item.defaultProps = obj.defaultProps[item.name];
                }
            });
            delete obj.defaultProps;
        }
    } catch {
        return false;
    }

    return obj;
}

/**
 * 创建遍历器
 * @param {Object} object - 页面object对象
 * @param {String} identifier - 遍历名称
 * @param {Object} ast - ast对象
 * @returns {Object} - visitor对象
 */
function createVisitor(object: IPageObject, identifier: string, ast): Visitor {
    return {
        FunctionDeclaration(path: any) {
            if (path.node.id.name === identifier) {
                traverse(ast, createPropsVisitor(object, identifier));
            }
        },
        ClassDeclaration(path: any) {
            if (path.node.id.name === identifier) {
                if (path.node.body.body.length > 0) {
                    path.node.body.body.forEach(item => {
                        if (item.type === 'ClassProperty' && item.static) {
                            if (item.key.name === 'defaultProps') {
                                object.defaultProps = parseDefaultProps(item.value.properties);
                            }
                            if (item.key.name === 'propTypes') {
                                object.props = parsePropTypes(item.value.properties);
                            }
                        }
                    });
                }
                traverse(ast, createPropsVisitor(object, identifier));
            }
        },
        VariableDeclaration(path) {
            /**
             * 使用Form组件的情况
             * @example
             * const ComponentForm = Form.create()(Component);
             * export default ComponentForm
             */
            path.node.declarations.forEach((item: any) => {
                if (item.id.name === identifier && item.init.type === 'CallExpression') {
                    if (item.init.arguments.length > 0) {
                        const id = item.init.arguments[0].name;
                        traverse(ast, createVisitor(object, id, ast));
                    }
                }
            });
        },
    };
}

/**
 * 创建props遍历器
 * @param {Object} object - 页面obj对象
 * @param {String} identifier - 遍历名称
 * @returns {Object} - visitor对象
 */
function createPropsVisitor(object, identifier: string): Visitor {
    return {
        ExpressionStatement(path: any) {
            /**
             * 解析props，遍历陈述语句
             * @example
             * Component.defaultProps = {}
             * Component.propTypes = {};
             */
            const { left } = path.node.expression;
            const { right } = path.node.expression;
            if (left && left.type === 'MemberExpression' && left.object.name === identifier) {
                if (left.property.name === 'defaultProps') {
                    object.defaultProps = parseDefaultProps(right.properties);
                }

                if (left.property.name === 'propTypes') {
                    object.props = parsePropTypes(right.properties);
                }
            }
        },
    };
}

/**
 * 解析DefaultProps中的属性
 */
function parseDefaultProps(props): IPageDefaultProps {
    const df = {};
    props.forEach(prop => {
        if (prop.value.type === 'StringLiteral' || prop.value.type === 'NumericLiteral' || prop.value.type === 'BooleanLiteral') { // 存储字符串、数字、布尔类型的默认值
            df[prop.key.name] = prop.value.value;
        }
    });
    return df;
}

interface IPropsObject {
    type?: string;
    isRequired?: boolean;
    value?: any;
    name: string;
}

/**
 * 解析propTypes中的属性
 */
function parsePropTypes(props): IPageProps[] {
    const types = [];
    for (let i = 0; i < props.length; i++) {
        const obj: IPropsObject = {
            name: props[i].key.name,
        };
        if (props[i].value.object.type === 'Identifier') {
            obj.type = props[i].value.property.name;
            obj.isRequired = false;
        }
        if (props[i].value.object.type === 'MemberExpression') {
            obj.type = props[i].value.object.property.name;
            obj.isRequired = props[i].value.property.name === 'isRequired';
        }
        // 最后一项取trailingComments内容
        if (i === props.length - 1) {
            if (props[i].trailingComments) {
                obj.value = commentParse(props[i].trailingComments);
            }
        } else if (props[i + 1].leadingComments) { // 不是最后一项取下一项的leadingComments内容
            obj.value = commentParse(props[i + 1].leadingComments);
        }
        types.push(obj);
    }
    return types;
}
