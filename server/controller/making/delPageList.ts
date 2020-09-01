import path from 'path';
import fs from 'fs-extra';
import IContext from '../../types/context';

interface IQuery {
    id: string;
}

export default async function addLabel(ctx: IContext) {
    const { id }: IQuery = ctx.query;
    const pagePath = path.join(process.cwd(), 'node_modules/.cache/crui/pageList.json');
    const pageExists = fs.existsSync(pagePath);
    if (pageExists) {
        const pageList: any[] = fs.readJsonSync(pagePath);
        let index: number;
        for (let i = 0; i < pageList.length; i++) {
            if (pageList[i].id === id) {
                index = i;
                break;
            }
        }
        if (index === undefined) {
            ctx.error(0, '删除失败');
        } else {
            pageList.splice(index, 1);
            fs.writeJsonSync(pagePath, pageList);
            ctx.success(200, '删除成功');
        }
    } else {
        ctx.error(0, '删除失败');
    }
}
