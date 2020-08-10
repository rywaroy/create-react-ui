import path from 'path';
import fs from 'fs';
import { create, add } from 'create-simple-app';
import IContext from '../../types/context';
import { ICreateParams } from '../../types/create';

export default async function createProject(ctx: IContext) {
    // @ts-ignore for travis
    const { list, project }: ICreateParams = ctx.request.body;
    const promptResult = {
        module: list,
    };
    let generator: any;
    if (fs.existsSync(path.join(process.cwd(), 'package.json'))) {
        generator = add(project, promptResult);
    } else {
        generator = create(project, promptResult);
    }
    try {
        await generator.create();
        ctx.success(200, '操作成功');
    } catch {
        ctx.error(0, '操作失败');
    }
}
