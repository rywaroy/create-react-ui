const path = require('path');
const fs = require('fs');
const codeFormat = require('../../utils/codeFormat');

module.exports = async function table(ctx) {
    const { url, code } = ctx.request.body;
    const base = path.join(process.cwd(), url || '');
    if (fs.existsSync(base)) {
        fs.appendFileSync(base, `\n\n${codeFormat(code)}`, 'utf8');
        ctx.success(200, '创建成功', null);
    } else {
        ctx.error(0, '找不到该文件', null);
    }
};
