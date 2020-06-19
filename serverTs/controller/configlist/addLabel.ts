import path from 'path';
import fs from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';
import IContext from '../../types/context';
import { ILabelJson } from '../../types/label';

interface IBody {
    name: string;
}

export default function addLabel(ctx: IContext) {
    const { name }: IBody = ctx.request.body;
    const labelPath = path.join(process.cwd(), 'node_modules/.cache/crui/label.json');
    const labelExists = fs.existsSync(labelPath);
    if (labelExists) {
        const label: ILabelJson = fs.readJsonSync(labelPath);
        label.list.push({
            name,
            id: uuidv4(),
        });
        fs.writeJsonSync(labelPath, label);
        ctx.success(200, '添加成功');
    } else {
        ctx.error(0, '添加失败');
    }
}
