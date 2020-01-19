const path = require('path');
const fs = require('fs-extra');
const defaultTemplate = require('../../templateString/default-template');

module.exports = function createDefaultTemplate({ url, folderName, fileName, variable }) {
    return new Promise(function (resolve, reject) {
        let base = path.join(process.cwd(), url ? url : '');
        variable = variable ? variable : 'Template';

        // 创建文件夹
        if (folderName) {
            base = path.join(base, folderName);
            if (fs.existsSync(base)) {
                reject('该文件夹已存在');
            }
        }
        const script = defaultTemplate(variable);
        fs.outputFileSync(path.join(base, fileName), script);
        resolve();
    });
};
