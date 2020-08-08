import path from 'path';
import fs from 'fs';
import { create, add } from 'create-simple-app';
import IContext from '../../types/context';

export default async function list(ctx: IContext) {
    let generator: any;
    if (fs.existsSync(path.join(process.cwd(), 'package.json'))) {
        generator = add();
    } else {
        generator = create();
    }
    ctx.success(200, '获取成功', generator.getModulePrompts());
}
