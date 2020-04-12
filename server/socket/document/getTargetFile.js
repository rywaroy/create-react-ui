const glob = require('glob');

module.exports = function getTargetFile(path) {
    const files = glob.sync('**/*.js', {
        cwd: path,
    });
    return files;
};
