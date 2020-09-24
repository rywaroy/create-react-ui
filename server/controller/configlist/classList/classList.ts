import path from 'path';
import fs from 'fs-extra';
import IContext from '../../../types/context';
import { IClassItem } from '../../../types/configlist';

export default async function classList(ctx: IContext) {
    const { display } = ctx.query;
    const classPath = path.join(process.cwd(), 'node_modules/.cache/crui/classList.json');
    const classExists = fs.existsSync(classPath);
    if (classExists) {
        let classList = fs.readJsonSync(classPath);
        if (display) {
            classList = classList.filter((item: IClassItem) => item.display === Boolean(display));
        }
        ctx.success(200, '获取成功', classList);
    } else {
        fs.ensureFileSync(classPath);
        fs.writeJsonSync(classPath, []);
        ctx.success(200, '获取成功', []);
    }
}
