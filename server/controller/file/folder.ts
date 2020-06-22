import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';
import IContext from '../../types/context';

export default async function folder(ctx: IContext) {
    const base: string = ctx.query.base ? ctx.query.base : '/';
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
}
