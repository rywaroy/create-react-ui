import path from 'path';
import fs from 'fs';
import IContext from '../../types/context';

export default async function display(ctx: IContext) {
    const files = displayFiles(process.cwd());
    try {
        ctx.success(200, '获取成功', files);
    } catch (err) {
        ctx.error(0, err.message, null);
    }
}

const ignoreFile = {
    node_modules: true,
    '.git': true,
    '.crui': false,
};

interface IFolder {
    title: string;
    key: number;
    value: string;
    children?: IFolder[];
}

interface displayFilesReturn {
    filesArray: IFolder[];
    foldersArray: IFolder[];
}

function displayFiles(filePaths: string): displayFilesReturn {
    const filesArray: IFolder[] = [];
    const foldersArray = [
        {
            title: '/',
            key: 1,
            value: '',
        },
    ];
    const stack = [''];
    let key = 2;
    function fileDisplayDeep(filePath: string, filesList: IFolder[], foldersList: IFolder[], isFirst: boolean) {
        const files = fs.readdirSync(filePath);
        if (!isFirst) {
            stack.push(path.basename(filePath)); // 添加路由栈
        }
        files.forEach(filename => {
            const urlStack: string[] = JSON.parse(JSON.stringify(stack)); // 深拷贝路由栈
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
                const childrenFiles: IFolder[] = [];
                const childrenFolders: IFolder[] = [];
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
                fileDisplayDeep(filedir, childrenFiles, childrenFolders, false);
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
