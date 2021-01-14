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
    tabWith: number;
}

export default function create(ctx: IContext) {
    // @ts-ignore for travis
    const { materials, url, name, namespace, tabWith }: IBody = ctx.request.body;

    if (fs.existsSync(path.join(process.cwd(), url, name))) {
        ctx.success(0, '当前文件夹已经存在');
    } else {
        const generator = new Generator(materials, {
            plugin,
            url,
            name,
            namespace,
            tabWith,
            isCreate: true,
        });
        const files = generator.create();
        Object.keys(files).forEach(item => {
            const filePath = path.join(process.cwd(), url, name, item);
            fs.outputFileSync(filePath, files[item]);
        });
        ctx.success(200, '成功');
    }
}
