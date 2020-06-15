const path = require('path');
const fs = require('fs-extra');
const defaultTemplate = require('../../templateString/default-template');

module.exports = async function defaultController(ctx) {
    let { variable } = ctx.query;
    const { url, folderName, fileName } = ctx.query;
    let base = path.join(process.cwd(), url || '');
    variable = variable || 'Template';

    // 创建文件夹
    if (folderName) {
        base = path.join(base, folderName);
        if (fs.existsSync(base)) {
            ctx.error(0, '该文件夹已存在', null);
            return;
        }
    }
    const script = defaultTemplate(variable);
    fs.outputFileSync(path.join(base, fileName), script);
    ctx.success(200, '创建成功', null);
};
