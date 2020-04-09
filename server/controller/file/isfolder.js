const path = require('path');
const fs = require('fs');

module.exports = async function isfolder(ctx) {
    const base = path.join(process.cwd(), ctx.query.url ? ctx.query.url : '');
    if (fs.existsSync(base)) {
        const stat = fs.statSync(base);
        if (stat.isDirectory()) {
            ctx.success(200, '验证成功', null);
        } else {
            ctx.error(-1, '不是文件夹', null);
        }
    } else {
        ctx.error(-1, '找不到该文件夹', null);
    }
};
