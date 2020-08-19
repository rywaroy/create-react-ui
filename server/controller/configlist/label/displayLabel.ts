import path from 'path';
import fs from 'fs-extra';
import IContext from '../../types/context';
import { ILabelJson } from '../../types/label';

interface IBody {
    display: boolean;
}

export default async function label(ctx: IContext) {
    // @ts-ignore for travis
    const { display }: IBody = ctx.request.body;
    const labelPath = path.join(process.cwd(), 'node_modules/.cache/crui/label.json');
    const labelExists = fs.existsSync(labelPath);
    if (labelExists) {
        const label: ILabelJson = fs.readJsonSync(labelPath);
        label.display = display;
        fs.writeJsonSync(labelPath, label);
        ctx.success(200, '修改成功');
    } else {
        ctx.error(0, '修改失败');
    }
}
