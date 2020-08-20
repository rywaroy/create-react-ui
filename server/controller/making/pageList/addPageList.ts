import path from 'path';
import fs from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';
import IContext from '../../../types/context';

interface IBody {
    title: string;
    value: any;
    isPage: boolean;
}

export default function pageSave(ctx: IContext) {
    // @ts-ignore for travis
    const { title, value, isPage }: IBody = ctx.request.body;
    const pagePath = path.join(process.cwd(), 'node_modules/.cache/crui/pageList.json');
    const pageExists = fs.existsSync(pagePath);
    if (pageExists) {
        const pageList: any[] = fs.readJsonSync(pagePath);
        pageList.push({
            title,
            id: uuidv4(),
            value,
            isPage,
        });
        fs.writeJsonSync(pagePath, pageList);
        ctx.success(200, '保存成功');
    } else {
        ctx.error(0, '保存失败');
    }
}
