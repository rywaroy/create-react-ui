import path from 'path';
import fs from 'fs-extra';
import IContext from '../../../types/context';
import { IClassItem } from '../../../types/configlist';

export default async function addLabel(ctx: IContext) {
    // @ts-ignore for travis
    const { name, id, value }: IClassItem = ctx.request.body;
    const classPath = path.join(process.cwd(), 'node_modules/.cache/crui/classList.json');
    const classExists = fs.existsSync(classPath);
    if (classExists) {
        const classList:IClassItem[] = fs.readJsonSync(classPath);
        let index: number;
        for (let i = 0; i < classList.length; i++) {
            if (classList[i].id === id) {
                index = i;
                break;
            }
        }
        if (index === undefined) {
            ctx.error(0, '修改失败');
        } else {
            classList[index].name = name;
            classList[index].value = value;
            fs.writeJsonSync(classPath, classList);
            ctx.success(200, '修改成功');
        }
    } else {
        ctx.error(0, '修改失败');
    }
}
