const fs = require('fs');
const path = require('path');

const ignoreFile = {
    'node_modules': true,
    '.git': true,
};

module.exports = function displayFiles(filePaths) {
    const filesArray = [];
    let key = 1;
    function fileDisplayDeep(filePath, filesArray) {
        const files = fs.readdirSync(filePath);
        files.forEach(filename => {
            const filedir = path.join(filePath, filename);
            const stats = fs.statSync(filedir);
            if (stats.isFile() && !/^\..*$/.test(filename)) { // 文件
                filesArray.push({
                    title: filename,
                    key: key++,
                });
            }
            if (stats.isDirectory() && !ignoreFile[filename]) { // 文件夹
                const children = [];
                filesArray.push({
                    title: filename,
                    key: ++key,
                    children,
                });
                fileDisplayDeep(filedir, children);
            }
        });
    }
    fileDisplayDeep(filePaths, filesArray);
    return filesArray;
};