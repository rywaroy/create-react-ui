const glob = require('glob');
const path = require('path');
const fs = require('fs');

module.exports = async function folder(ctx) {
    const base = ctx.query.base ? ctx.query.base : '/';
    const list = glob.sync('*', {
        cwd: base,
    });
    const data = list.map(item => {
        const url = path.join(base, item);
        const stats = fs.statSync(url);
        return {
            id: url,
            value: url,
            title: item,
            pId: base,
            isLeaf: stats.isFile(),
        };
    });
    ctx.success(200, '获取成功', data);
};
