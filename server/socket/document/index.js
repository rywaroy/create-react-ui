const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const getTargetFile = require('./getTargetFile');
const astParse = require('./astParse');
const createMd = require('./createMd');
const creatProgress = require('./createProgress');
const getComponentName = require('./getComponentName');

module.exports = function document(socket) {
    socket.on('create-document', ({ entry, output }) => {
        const entryBase = path.join(process.cwd(), entry);
        const stat = fs.statSync(entryBase);
        let files = [];
        if (stat.isDirectory()) {
            files = getTargetFile(entryBase);
            files = files.map(item => path.join(entryBase, item));
        }
        if (stat.isFile()) {
            files = [entryBase];
        }
        socket.emit('createing', true);
        const total = files.length;
        const warningTip = [];
        let num = 0;
        const nameMap = {};

        files.forEach(item => {
            socket.emit('term-document', creatProgress(num, total, `正在解析${item}`));
            const fileObj = astParse(item);
            const { isFunction, isClass, props, main } = fileObj;
            if (isFunction && !props) {
                // 如果是函数，如果没有props，代表不是函数组件，不生成md
                warningTip.push(chalk.yellowBright(`${item} 该文件不是组件`));
            } else if (isClass && !main && !props) {
                // 如果是类，如果没有props且也没有注释，不生成md
                warningTip.push(chalk.yellowBright(`${item} 暂无解析数据`));
            } else if (!main && !props) {
                // 不是函数也不是类，可能是工具库文件
                warningTip.push(chalk.yellowBright(`${item} 该文件不是组件`));
            } else {
                const { name, newName, reset } = resetName(nameMap, getComponentName(fileObj));

                // 判断是否修改过文件名，有则发起提示
                if (reset) {
                    warningTip.push(chalk.yellowBright(`${item} 文件重名，由 ${name}.md 修改为 ${newName}.d`));
                }
                createMd(fileObj, newName, output);
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
};

/**
 * 重置文件名
 */
function resetName(nameMap, name) {
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
