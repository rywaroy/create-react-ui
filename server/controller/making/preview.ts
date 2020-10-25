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
    const { materials, url, name, namespace, tabWith }: IBody = ctx.request.body;
    const generator = new Generator(materials, {
        plugin,
        url,
        name,
        namespace,
        tabWith,
    });
    ctx.success(200, '成功', generator.create());
}
