const Router = require('koa-router');
const fs = require('fs');
const path = require('path');

const router = new Router();

/**
 * 获取.crui/template下模板文件的目录
 */
router.get('/template', async ctx => {
    const base = path.join(process.cwd(), '.crui', 'template');
    if (fs.existsSync(base)) {
        const file = fs.readdirSync(base);
        if (file.length === 0) {
            ctx.error(0, '该目录下没有文件', null);
        } else {
            const data = [];
            file.forEach((item, index) => {
                if (/^.+\..+$/.test(item)) { // 判断是文件
                    data.push({
                        title: item,
                        key: index + 1,
                        value: item,
                    });
                }
            });
            ctx.success(200, '', data);
        }
    } else {
        ctx.error(0, '找不到/.crui/template文件目录', null);
    }
});

/**
 * 判断是否是js文件
 */
router.get('/isjs', async ctx => {
    const base = path.join(process.cwd(), ctx.query.url ? ctx.query.url : '');
    if (fs.existsSync(base)) {
        const stat = fs.statSync(base);
        if (stat.isFile()) {
            if (path.extname(base) === '.js') {
                ctx.success(200, '验证成功', null);
            } else {
                ctx.error(-1, '不是js文件', null);
            }
        } else {
            ctx.error(-1, '不是文件', null);
        }
    } else {
        ctx.error(-1, '找不到该文件', null);
    }
});

/**
 * 获取文件目录
 */
router.get('/display', async ctx => {
    const files = displayFiles(process.cwd());
    try {
        ctx.success(200, '获取成功', files);
    } catch (err) {
        ctx.error(0, err.message, null);
    }
});

const ignoreFile = {
    'node_modules': true,
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
                    value: url,
                    key: ++key,
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
}

module.exports = router;