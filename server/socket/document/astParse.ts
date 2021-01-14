import fs from 'fs';
import { parse } from '@babel/parser';
import traverse, { Visitor } from '@babel/traverse';
import generate from '@babel/generator';
import commentParse from './commentParse';
import { IPageObject, IPageDefaultProps, IPageProps } from '../../types/document';

export default function astParse(base: string, code?: string): IPageObject | string {
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
                    traverse(ast, createPropsVisitor(obj, identifier));
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
                        traverse(ast, createPropsVisitor(obj, identifier));
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

        // 合并defaultProps
        if (obj.defaultProps && obj.props) {
            obj.props.forEach(item => {
                if (obj.defaultProps[item.name]) {
                    item.defaultProps = obj.defaultProps[item.name];
                }
            });
            delete obj.defaultProps;
        }
    } catch (err) {
        return err.message;
    }

    return obj;
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
        const { code } = generate(prop.value);
        df[prop.key.name] = code.replace(/[\n]/g, ' ');
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
            isRequired: false,
        };

        /**
         * @example
         * optionalArray: PropTypes.array,
         * optionalBool: PropTypes.bool,
         * optionalFunc: PropTypes.func,
         * optionalNumber: PropTypes.number,
         * optionalObject: PropTypes.object,
         * optionalString: PropTypes.string,
         * optionalSymbol: PropTypes.symbol,
         * optionalNode: PropTypes.node,
         * optionalElement: PropTypes.element,
         * optionalElementType: PropTypes.elementType,
         */
        if (props[i].value.object && props[i].value.type === 'MemberExpression') {
            if (props[i].value.object.type === 'Identifier') {
                obj.type = props[i].value.property.name;
            }
            if (props[i].value.object.type === 'MemberExpression') {
                obj.type = props[i].value.object.property.name;
                obj.isRequired = props[i].value.property.name === 'isRequired';
            }
            if (props[i].value.object.type === 'CallExpression') {
                propsCallee(obj, props[i].value.object);
                obj.isRequired = props[i].value.property.name === 'isRequired';
            }
        }

        if (props[i].value.callee) {
            propsCallee(obj, props[i].value);
        }

        // 最后一项取trailingComments内容
        // if (i === props.length - 1) {
        //     if (props[i].trailingComments) {
        //         const { commentArray } = commentParse(props[i].trailingComments);
        //         obj.value = commentArray;
        //     }
        // } else if (props[i + 1].leadingComments) { // 不是最后一项取下一项的leadingComments内容
        //     const { commentArray } = commentParse(props[i + 1].leadingComments);
        //     obj.value = commentArray;
        // }
        if (props[i].leadingComments) {
            const { commentArray } = commentParse(props[i].leadingComments);
            obj.value = commentArray;
        }

        types.push(obj);
    }
    return types;
}

function propsCallee(obj: IPropsObject, value: any) {
    /**
     * @example
     * optionalMessage: PropTypes.instanceOf(Message),
     */
    if (value.callee.property.name === 'instanceOf') {
        obj.type = `instanceOf ${value.arguments[0].name}`;
    }

    /**
     * @example
     * optionalEnum: PropTypes.oneOf(['News', 'Photos']),
     */
    if (value.callee.property.name === 'oneOf') {
        obj.type = value.arguments[0].elements.map(item => {
            if (typeof item.value === 'object' && !item) {
                return 'null';
            }
            if (typeof item.value === 'undefined') {
                return 'undefined';
            }
            return `'${item.value}'`;
        }).join(' / ');
    }

    /**
     * @example
     * optionalArrayOf: PropTypes.arrayOf(PropTypes.number),
     */
    if (value.callee.property.name === 'arrayOf') {
        obj.type = `array of ${value.arguments[0].property.name}`;
    }

    /**
     * @example
     * optionalObjectOf: PropTypes.objectOf(PropTypes.number),
     */
    if (value.callee.property.name === 'objectOf') {
        obj.type = `object of ${value.arguments[0].property.name}`;
    }

    /**
     * @example
     * optionalUnion: PropTypes.oneOfType([
     *      PropTypes.string,
     *      PropTypes.number,
     *      PropTypes.instanceOf(Message)
     *   ]),
     */
    if (value.callee.property.name === 'oneOfType') {
        const arr = [];
        value.arguments[0].elements.forEach(item => {
            if (item.type === 'MemberExpression') {
                arr.push(item.property.name);
            }
            if (item.type === 'CallExpression') {
                if (item.callee.property.name === 'instanceOf') {
                    arr.push(`instanceOf ${item.arguments[0].name}`);
                }
                if (item.callee.property.name === 'arrayOf') {
                    arr.push(`array of ${item.arguments[0].property.name}`);
                }
                if (item.callee.property.name === 'objectOf') {
                    arr.push(`object of ${item.arguments[0].property.name}`);
                }
            }
        });
        obj.type = arr.join(' / ');
    }
}
