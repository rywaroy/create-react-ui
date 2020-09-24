import path from 'path';
import fs from 'fs-extra';
import IContext from '../../types/context';
import { IMaterial } from '../../types/making';
import Generator from './generator';
import plugin from './plugin';

interface IBody {
    materials: IMaterial[];
    url: string;
    name: string;
    namespace: string;
}

export default function preview(ctx: IContext) {
    // @ts-ignore for travis
    const { materials, url, name, namespace }: IBody = ctx.request.body;
    const generator = new Generator(materials, {
        plugin,
        url,
        name,
        namespace,
    });
    const files = generator.create();
    Object.keys(files).forEach(item => {
        const filePath = path.join(process.cwd(), url, name, item);
        fs.outputFileSync(filePath, files[item]);
    });
    ctx.success(200, '成功');
}
