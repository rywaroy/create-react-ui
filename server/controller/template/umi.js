const path = require('path');
const fs = require('fs-extra');
const umiModel = require('../../templateString/umi-model');
const umiTemplate = require('../../templateString/umi-template');

module.exports = async function defaultController(ctx) {
    let { variable, namespace } = ctx.query;
    const { url, folderName, fileName, oilConfig } = ctx.query;
    let base = path.join(process.cwd(), url || '');
    variable = variable || 'Template';
    namespace = namespace || 'global';

    // 创建文件夹
    if (folderName) {
        base = path.join(base, folderName);
        if (fs.existsSync(base)) {
            ctx.error(0, '该文件夹已存在', null);
            return;
        }
    }
    const script = umiTemplate(variable, namespace);
    const modelscript = umiModel(namespace, oilConfig);

    fs.outputFileSync(path.join(base, fileName), script);
    fs.outputFileSync(path.join(base, 'model.js'), modelscript);
    ctx.success(200, '创建成功', null);
};
