const glob = require('glob');
const path = require('path');

module.exports = async function folder(ctx) {
    const base = ctx.query.base ? ctx.query.base : '/';
    const list = glob.sync('*', {
        cwd: base,
    });
    const data = list.map(item => {
        const url = path.join(base, item);
        return {
            id: url,
            value: url,
            title: url,
            pId: base,
        };
    });
    ctx.success(200, '获取成功', data);
};
