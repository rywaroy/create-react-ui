import path from 'path';
import fs from 'fs-extra';
import IContext from '../../../types/context';

export default async function classList(ctx: IContext) {
    const classPath = path.join(process.cwd(), 'node_modules/.cache/crui/classList.json');
    const classExists = fs.existsSync(classPath);
    if (classExists) {
        const classList = fs.readJsonSync(classPath);
        ctx.success(200, '获取成功', classList);
    } else {
        fs.ensureFileSync(classPath);
        fs.writeJsonSync(classPath, []);
        ctx.success(200, '获取成功', []);
    }
}
