const fs = require('fs');
const babelParser = require('@babel/parser');

module.exports = function astParse(base) {
    const ast = babelParser.parse(fs.readFileSync(base, 'utf-8'), {
        sourceType: 'module',
        plugins: [
            'classProperties',
            'jsx',
        ],
    });
    console.log(ast);
};
