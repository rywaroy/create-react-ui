const path = require('path');
const fs = require('fs');
const umiModel = require('../../templateString/umi-model');
const umiTemplate = require('../../templateString/umi-template');

module.exports = function createUmiTemplate({ url, folderName, fileName, variable, namespace, oilConfig }) {
    return new Promise(function (resolve, reject) {
        let base = path.join(process.cwd(), url ? url : '');
        variable = variable ? variable : 'Template';
        namespace = namespace ? namespace : 'global';

        // 创建文件夹
        if (folderName) {
            base = path.join(base, folderName);
            if (fs.existsSync(base)) {
                reject('该文件夹已存在');
            }
            fs.mkdirSync(base);
        }
        const script = umiTemplate(variable, namespace);
        const modelscript = umiModel(namespace, oilConfig);

        fs.writeFileSync(path.join(base, fileName), script);
        fs.writeFileSync(path.join(base, 'model.js'), modelscript);
        resolve();
    });
};