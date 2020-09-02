import IContext from '../../types/context';
import { IMaterial } from '../../types/making';
import Generator from './generator';
import plugin from './plugin';

interface IBody {
    materials: IMaterial[];
}

export default function preview(ctx: IContext) {
    // @ts-ignore for travis
    const { materials }: IBody = ctx.request.body;
    const generator = new Generator(materials, {
        plugin,
    });
    ctx.success(200, '成功', {
        code: generator.create(),
    });
}
