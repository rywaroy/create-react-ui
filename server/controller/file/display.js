const path = require('path');
const fs = require('fs');

module.exports = async function display(ctx) {
    const files = displayFiles(process.cwd());
    try {
        ctx.success(200, '获取成功', files);
    } catch (err) {
        ctx.error(0, err.message, null);
    }
};


const ignoreFile = {
    node_modules: true,
    '.git': true,
    '.crui': false,
};

function displayFiles(filePaths) {
    const filesArray = [];
    const foldersArray = [
        {
            title: '/',
            key: 1,
            value: '',
        },
    ];
    const stack = [''];
    let key = 2;
    function fileDisplayDeep(filePath, filesList, foldersList, isFirst) {
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
                filesList.push({
                    title: filename,
                    value: url,
                    key: ++key,
                });
            }
            if (stats.isDirectory() && !ignoreFile[filename]) { // 文件夹
                const childrenFiles = [];
                const childrenFolders = [];
                key += 1;
                filesList.push({
                    title: filename,
                    key,
                    value: url,
                    children: childrenFiles,
                });
                foldersList.push({
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
}
