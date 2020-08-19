import path from 'path';
import fs from 'fs-extra';
import IContext from '../../../types/context';

export default async function label(ctx: IContext) {
    const labelPath = path.join(process.cwd(), 'node_modules/.cache/crui/label.json');
    const labelExists = fs.existsSync(labelPath);
    if (labelExists) {
        const label = fs.readJsonSync(labelPath);
        ctx.success(200, '获取成功', label);
    } else {
        fs.ensureFileSync(labelPath);
        fs.writeJsonSync(labelPath, {
            display: false,
            list: [],
        });
        ctx.success(200, '获取成功', { display: false, list: [] });
    }
}
