import path from 'path';
import fs from 'fs-extra';
import IContext from '../../../types/context';

export default async function pageList(ctx: IContext) {
    const pagePath = path.join(process.cwd(), 'node_modules/.cache/crui/pageList.json');
    const pageExists = fs.existsSync(pagePath);
    if (pageExists) {
        const pageList = fs.readJsonSync(pagePath);
        ctx.success(200, '获取成功', pageList);
    } else {
        fs.ensureFileSync(pagePath);
        fs.writeJsonSync(pagePath, []);
        ctx.success(200, '获取成功', []);
    }
}
