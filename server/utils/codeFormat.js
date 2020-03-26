const prettier = require('prettier');

module.exports = function codeFormat(str) {
    return prettier.format(str, { parser: 'babel', tabWidth: 4 });
};
