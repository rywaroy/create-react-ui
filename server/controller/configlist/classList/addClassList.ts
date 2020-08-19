import path from 'path';
import fs from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';
import IContext from '../../../types/context';
import { IClassItem } from '../../../types/configlist';

interface IBody {
    name: string;
    value: string;
}

export default function addLabel(ctx: IContext) {
    // @ts-ignore for travis
    const { name, value }: IBody = ctx.request.body;
    const classPath = path.join(process.cwd(), 'node_modules/.cache/crui/classList.json');
    const classExists = fs.existsSync(classPath);
    if (classExists) {
        const classList: IClassItem[] = fs.readJsonSync(classPath);
        classList.push({
            name,
            id: uuidv4(),
            value,
        });
        fs.writeJsonSync(classPath, classList);
        ctx.success(200, '添加成功');
    } else {
        ctx.error(0, '添加失败');
    }
}
