import path from 'path';
import fs from 'fs-extra';
import IContext from '../../types/context';
import { ILabelJson } from '../../types/label';

interface IQuery {
    id: string;
}

export default async function addLabel(ctx: IContext) {
    const { id }: IQuery = ctx.query;
    const labelPath = path.join(process.cwd(), 'node_modules/.cache/crui/label.json');
    const labelExists = fs.existsSync(labelPath);
    if (labelExists) {
        const label: ILabelJson = fs.readJsonSync(labelPath);
        let index: number;
        for (let i = 0; i < label.list.length; i++) {
            if (label.list[i].id === id) {
                index = i;
                break;
            }
        }
        if (index === undefined) {
            ctx.error(0, '删除失败');
        } else {
            label.list.splice(index, 1);
            fs.writeJsonSync(labelPath, label);
            ctx.success(200, '删除成功');
        }
    } else {
        ctx.error(0, '删除失败');
    }
}
