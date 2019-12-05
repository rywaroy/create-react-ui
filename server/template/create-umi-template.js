const path = require('path');
const fs = require('fs');
const execa = require('execa');

module.exports = function createUmiTemplate({ url, folderName, fileName, variable, namespace, oilConfig }) {
    return new Promise(function (resolve, reject) {
        let base = path.join(process.cwd(), url ? url : '');
        variable = variable ? variable : 'Template';

        // 创建文件夹
        if (folderName) {
            base = path.join(base, folderName);
            if (fs.existsSync(base)) {
                reject('该文件夹已存在');
            }
            execa.commandSync(`mkdir ${base}`);
        }
        resolve();
    });
};