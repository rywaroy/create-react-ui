const fs = require('fs');
const path = require('path');

const ignoreFile = {
    'node_modules': true,
    '.git': true,
};

module.exports = function displayFiles(filePaths) {
    const filesArray = [
        {
            title: '/',
            key: 1,
        }
    ];
    const foldersArray = [
        {
            title: '/',
            key: 1,
        }
    ];
    let key = 2;
    function fileDisplayDeep(filePath, filesArray, foldersArray) {
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
                const childrenFiles = [];
                const childrenFolders = [];
                filesArray.push({
                    title: filename,
                    key: key++,
                    children: childrenFiles,
                });
                foldersArray.push({
                    title: filename,
                    key: key++,
                    children: childrenFolders,
                });
                fileDisplayDeep(filedir, childrenFiles, childrenFolders);
            }
        });
    }
    fileDisplayDeep(filePaths, filesArray, foldersArray);
    return {
        filesArray,
        foldersArray,
    };
};