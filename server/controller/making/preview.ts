import IContext from '../../types/context';
import { IMaterial } from '../../types/making';

interface IBody {
    materials: IMaterial[];
}

export default function preview(ctx: IContext) {
    // @ts-ignore for travis
    const { materials }: IBody = ctx.request.body;
    console.log(materials);
    ctx.success(200, '成功');
}
