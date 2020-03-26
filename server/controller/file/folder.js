const glob = require('glob');

module.exports = async function folder(ctx) {
    const data = glob.sync(ctx.query.url ? ctx.query.url : '/');
    console.log(data);
    ctx.success(200, '获取成功', data);
};
