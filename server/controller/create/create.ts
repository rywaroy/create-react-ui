import path from 'path';
import fs from 'fs';
import { create, add } from 'create-simple-app';
import IContext from '../../types/context';

export default async function createProject(ctx: IContext) {
    // @ts-ignore for travis
    const { list }: IFormCodeParams = ctx.request.body;
    const promptResult = {
        module: list,
    };
    let generator: any;
    if (fs.existsSync(path.join(process.cwd(), 'package.json'))) {
        generator = add('example', promptResult);
    } else {
        generator = create('example', promptResult);
    }
    try {
        await generator.create();
        ctx.success(200, '操作成功');
    } catch {
        ctx.error(0, '操作失败');
    }
}
