function getData(ctx) {
    return async (status, msg, obj) => {
        const data = {
            status: 200,
            msg: '',
            data: {},
        };
        data.status = status;
        data.msg = msg;
        data.data = obj || {};
        ctx.body = data;
        // return ctx.body;
    };
}

module.exports = async function returnData(ctx, next) {
    if (!ctx.success) {
        // 成功
        ctx.success = getData(ctx);
    }
    if (!ctx.error) {
        // 失败
        ctx.error = getData(ctx);
    }
    await next();
};
