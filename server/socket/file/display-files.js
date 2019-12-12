const fs = require('fs');
const path = require('path');

const ignoreFile = {
    'node_modules': true,
    '.git': true,
    'crui': true,
};

module.exports = function displayFiles(filePaths) {
    const filesArray = [
        {
            title: '/',
            key: 1,
            value: '',
        }
    ];
    const foldersArray = [
        {
            title: '/',
            key: 1,
            value: '',
        }
    ];
    const stack = [''];
    let key = 2;
    function fileDisplayDeep(filePath, filesArray, foldersArray, isFirst) {
        const files = fs.readdirSync(filePath);
        if (!isFirst) {
            stack.push(path.basename(filePath)); // 添加路由栈
        }
        files.forEach(filename => {
            const urlStack = JSON.parse(JSON.stringify(stack)); // 深拷贝路由栈
            urlStack.push(filename);
            const url = path.join(...urlStack);
            const filedir = path.join(filePath, filename);
            const stats = fs.statSync(filedir);
            if (stats.isFile() && !/^\..*$/.test(filename)) { // 文件
                filesArray.push({
                    title: filename,
                    vaule: url,
                    key: key++,
                });
            }
            if (stats.isDirectory() && !ignoreFile[filename]) { // 文件夹
                const childrenFiles = [];
                const childrenFolders = [];
                key = key + 1;
                filesArray.push({
                    title: filename,
                    key,
                    value: url,
                    children: childrenFiles,
                });
                foldersArray.push({
                    title: filename,
                    key,
                    value: url,
                    children: childrenFolders,
                });
                fileDisplayDeep(filedir, childrenFiles, childrenFolders);
            }
        });
        stack.pop();
    }
    fileDisplayDeep(filePaths, filesArray, foldersArray, true);
    return {
        filesArray,
        foldersArray,
    };
};