import path from 'path';
import fs from 'fs';
import { create, add } from 'create-simple-app';
import IContext from '../../types/context';

export default async function list(ctx: IContext) {
    let generator: any;
    let isEmpty = true;
    const { project = '.' } = ctx.query;
    const packagePath = path.join(process.cwd(), project, 'package.json');
    if (fs.existsSync(packagePath)) {
        generator = add();
        isEmpty = false;
    } else {
        generator = create();
    }
    ctx.success(200, '获取成功', {
        list: generator.getModulePrompts(),
        isEmpty,
    });
}
