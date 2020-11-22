import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import { Socket } from 'socket.io';
import getTargetFile from './getTargetFile';
import astParse from './astParse';
import createMd from './createMd';
import getComponentName from './getComponentName';

interface INameMap {
    [prop: string]: boolean
}

export default function document(socket: Socket) {
    socket.on('create-document', ({ entry, output }: { entry: string, output: string}) => {
        const entryBase = path.join(process.cwd(), entry);
        const stat = fs.statSync(entryBase);
        let isSingle = false;
        let files: string[] = [];
        if (stat.isDirectory()) {
            files = getTargetFile(entryBase);
            files = files.map(item => path.join(entryBase, item));
        }
        if (stat.isFile()) {
            files = [entryBase];
            isSingle = true;
        }
        socket.emit('createing', true);
        const total = files.length;
        let num = 0;
        const nameMap: INameMap = {};

        files.forEach(item => {
            const projectPath = item.replace(process.cwd(), '');
            num++;
            socket.emit('term-document', `正在解析${projectPath}  ${chalk.greenBright(`${num}/${total}`)}`);
            const fileObj = astParse(item);
            if (typeof fileObj === 'boolean') {
                socket.emit('term-document', chalk.yellowBright(`${projectPath} 文件解析出错\n`));
            } else {
                const { main } = fileObj;
                if (!main) {
                    socket.emit('term-document', chalk.yellowBright(`${projectPath} 该文件没有注释\n`));
                } else {
                    const { name, newName, reset } = resetName(nameMap, getComponentName(fileObj));

                    // 判断是否修改过文件名，有则发起提示
                    if (reset) {
                        socket.emit('term-document', chalk.yellowBright(`${projectPath} 文件重名，由 ${name}.md 修改为 ${newName}.md\n`));
                    }
                    fileObj.path = item;
                    fileObj.projectPath = projectPath;
                    fileObj.fileName = newName;
                    fileObj.ext = path.extname(item);
                    const md = createMd(fileObj, output);
                    const mdPath = `${path.join(process.cwd(), output, `${newName}.md`)}`;
                    if (fs.existsSync(mdPath) && !isSingle) {
                        socket.emit('term-document', chalk.redBright(`${projectPath} 该文件已有文档，请单独生成文档并替换\n`));
                    } else {
                        fs.writeFileSync(`${path.join(process.cwd(), output, `${newName}.md`)}`, md);
                    }
                }
            }
        });
        socket.emit('term-document', chalk.greenBright('\n解析完成!'));
        socket.emit('createing', false);
    });
}

/**
 * 重置文件名
 */
function resetName(nameMap: INameMap, name: string) {
    let num = 1;
    let newName = name;
    let reset = false; // 是否修改过
    while (nameMap[newName]) {
        newName = `${newName.replace(/\(\d+\)/g, '')}(${num})`;
        num++;
        reset = true;
    }
    nameMap[newName] = true;
    return {
        name,
        newName,
        reset,
    };
}
