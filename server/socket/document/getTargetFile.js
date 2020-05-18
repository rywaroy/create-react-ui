const glob = require('glob');

module.exports = function getTargetFile(path) {
    const files = glob.sync('**/*.js*(x)', {
        cwd: path,
    });
    return files;
};
