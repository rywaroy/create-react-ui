import path from 'path';
import fs from 'fs-extra';
import IContext from '../../types/context';
import { ILabelJson } from '../../types/label';

export default async function addLabel(ctx: IContext) {
    const { name, id } = ctx.request.body;
    const labelPath = path.join(process.cwd(), 'node_modules/.cache/crui/label.json');
    const labelExists = fs.existsSync(labelPath);
    if (labelExists) {
        const label:ILabelJson = fs.readJsonSync(labelPath);
        let index: number;
        for (let i = 0; i < label.list.length; i++) {
            if (label.list[i].id === id) {
                index = i;
                break;
            }
        }
        if (index === undefined) {
            ctx.error(0, '修改失败');
        } else {
            label.list[index].name = name;
            fs.writeJsonSync(labelPath, label);
            ctx.success(200, '修改成功');
        }
    } else {
        ctx.error(0, '修改失败');
    }
}
