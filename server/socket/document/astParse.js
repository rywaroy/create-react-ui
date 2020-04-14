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
                const identifier = path.node.declaration.id.name;
                obj.name = identifier;
                if (path.node.leadingComments) {
                    obj.main = commentParse(path.node.leadingComments);
                }
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
                if (path.node.leadingComments) {
                    obj.main = commentParse(path.node.leadingComments);
                }
                const identifier = path.node.declaration.id.name;
                traverse(ast, createPropsVisitor(obj, identifier));
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

    console.log(obj);
};

/**
 * 创建props遍历器
 * @param {Object} object - 页面obj对象
 * @param {String} identifier - 遍历名称
 * @returns {Object} - visitor对象
 */
function createPropsVisitor(object, identifier) {
    return {
        ExpressionStatement(path) {
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
                    const df = {};
                    right.properties.forEach(item => {
                        if (item.value.type === 'StringLiteral' || item.value.type === 'NumericLiteral' || item.value.type === 'BooleanLiteral') { // 存储字符串、数字、布尔类型的默认值
                            df[item.key.name] = item.value.value;
                        }
                    });
                    object.defaultProps = df;
                }

                if (left.property.name === 'propTypes') {
                    const types = [];
                    for (let i = 0; i < right.properties.length; i++) {
                        const obj = {
                            name: right.properties[i].key.name,
                        };
                        if (right.properties[i].value.object.type === 'Identifier') {
                            obj.type = right.properties[i].value.property.name;
                            obj.isRequired = false;
                        }
                        if (right.properties[i].value.object.type === 'MemberExpression') {
                            obj.type = right.properties[i].value.object.property.name;
                            obj.isRequired = right.properties[i].value.property.name === 'isRequired';
                        }
                        // 最后一项取trailingComments内容
                        if (i === right.properties.length - 1) {
                            if (right.properties[i].trailingComments) {
                                obj.value = commentParse(right.properties[i].trailingComments);
                            }
                        } else if (right.properties[i + 1].leadingComments) { // 不是最后一项取下一项的leadingComments内容
                            obj.value = commentParse(right.properties[i + 1].leadingComments);
                        }
                        types.push(obj);
                    }
                    object.props = types;
                }
            }
        },
    };
}
