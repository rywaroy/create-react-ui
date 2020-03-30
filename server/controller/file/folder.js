const glob = require('glob');
const path = require('path');
const fs = require('fs-extra');

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
    const cachePath = path.join(process.cwd(), 'node_modules/.cache/crui/cache.json');
    const cacheExists = fs.existsSync(cachePath);
    ctx.success(200, '获取成功', {
        list: data,
        svnBase: cacheExists ? fs.readJsonSync(cachePath).svnBase : null,
    });
};
