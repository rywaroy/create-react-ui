import { Context, Next } from 'koa';

function getData(ctx: Context) {
    return async (status: number, msg: string, obj: object) => {
        const data = {
            status: 200,
            msg: '',
            data: {},
        };
        data.status = status;
        data.msg = msg;
        data.data = obj || {};
        ctx.body = data;
    };
}

export default async function returnData(ctx: Context, next: Next) {
    if (!ctx.success) {
        // 成功
        ctx.success = getData(ctx);
    }
    if (!ctx.error) {
        // 失败
        ctx.error = getData(ctx);
    }
    await next();
}
