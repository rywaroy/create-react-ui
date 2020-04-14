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
                if (path.node.declaration.body.body.length > 0) {
                    path.node.declaration.body.body.forEach(item => {
                        if (item.type === 'ClassProperty' && item.static) {
                            if (item.key.name === 'defaultProps') {
                                obj.defaultProps = parseDefaultProps(item.value.properties);
                            }
                        }
                    });
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
function parseDefaultProps(props) {
    const df = {};
    props.forEach(prop => {
        if (prop.value.type === 'StringLiteral' || prop.value.type === 'NumericLiteral' || prop.value.type === 'BooleanLiteral') { // 存储字符串、数字、布尔类型的默认值
            df[prop.key.name] = prop.value.value;
        }
    });
    return df;
}

/**
 * 解析propTypes中的属性
 */
function parsePropTypes(props) {
    const types = [];
    for (let i = 0; i < props.length; i++) {
        const obj = {
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
