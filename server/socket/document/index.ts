import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import { Socket } from 'socket.io';
import getTargetFile from './getTargetFile';
import astParse from './astParse';
import createMd from './createMd';
import creatProgress from './createProgress';
import getComponentName from './getComponentName';

interface INameMap {
    [prop: string]: boolean
}

export default function document(socket: Socket) {
    socket.on('create-document', ({ entry, output }: { entry: string, output: string}) => {
        const entryBase = path.join(process.cwd(), entry);
        const stat = fs.statSync(entryBase);
        let files: string[] = [];
        if (stat.isDirectory()) {
            files = getTargetFile(entryBase);
            files = files.map(item => path.join(entryBase, item));
        }
        if (stat.isFile()) {
            files = [entryBase];
        }
        socket.emit('createing', true);
        const total = files.length;
        const warningTip: string[] = [];
        let num = 0;
        const nameMap: INameMap = {};

        files.forEach(item => {
            socket.emit('term-document', creatProgress(num, total, `正在解析${item}`));
            const fileObj = astParse(item);
            if (typeof fileObj === 'boolean') {
                warningTip.push(chalk.yellowBright(`${item} 文件解析出错`));
            } else {
                const { main } = fileObj;
                if (!main) {
                    warningTip.push(chalk.yellowBright(`${item} 该文件没有注释`));
                } else {
                    const { name, newName, reset } = resetName(nameMap, getComponentName(fileObj));

                    // 判断是否修改过文件名，有则发起提示
                    if (reset) {
                        warningTip.push(chalk.yellowBright(`${item} 文件重名，由 ${name}.mdx 修改为 ${newName}.mdx`));
                    }
                    fileObj.path = item;
                    fileObj.projectPath = item.replace(process.cwd(), '');
                    fileObj.fileName = newName;
                    fileObj.ext = path.extname(item);
                    createMd(fileObj, output);
                }
            }
            num++;
        });
        socket.emit('term-document', creatProgress(num, total, '解析完成!'));
        if (warningTip.length > 0) {
            socket.emit('term-document', chalk.yellowBright('提示: \n'));
            warningTip.forEach(item => {
                socket.emit('term-document', item);
            });
        }
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
