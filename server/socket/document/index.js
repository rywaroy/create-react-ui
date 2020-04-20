const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const getTargetFile = require('./getTargetFile');
const astParse = require('./astParse');
const createMd = require('./createMd');
const creatProgress = require('./createProgress');

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
        const failTip = [];
        let num = 0;
        files.forEach(item => {
            socket.emit('term-document', creatProgress(num, total, `正在解析${item}`));
            const fileObj = astParse(item);
            const res = createMd(fileObj, output);
            if (!res) {
                failTip.push(chalk.yellowBright(`${item} 暂无解析数据`));
            }
            num++;
        });
        socket.emit('term-document', creatProgress(num, total, '解析完成!'));
        if (failTip.length > 0) {
            socket.emit('term-document', chalk.yellowBright('提示: \n'));
            failTip.forEach(item => {
                socket.emit('term-document', item);
            });
        }
        socket.emit('createing', false);
    });
};
