import path from 'path';
import fs from 'fs-extra';
import IContext from '../../../types/context';
import { IClassItem } from '../../../types/configlist';

interface IQuery {
    id: string;
}

export default async function addLabel(ctx: IContext) {
    const { id }: IQuery = ctx.query;
    const classPath = path.join(process.cwd(), 'node_modules/.cache/crui/classList.json');
    const classExists = fs.existsSync(classPath);
    if (classExists) {
        const classList: IClassItem[] = fs.readJsonSync(classPath);
        let index: number;
        for (let i = 0; i < classList.length; i++) {
            if (classList[i].id === id) {
                index = i;
                break;
            }
        }
        if (index === undefined) {
            ctx.error(0, '删除失败');
        } else {
            classList.splice(index, 1);
            fs.writeJsonSync(classPath, classList);
            ctx.success(200, '删除成功');
        }
    } else {
        ctx.error(0, '删除失败');
    }
}
