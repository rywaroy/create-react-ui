import path from 'path';
import fs from 'fs';
import IContext from '../../types/context';
import codeFormat from '../../utils/codeFormat';

interface IBody {
    url: string;
    code: string;
}

export default async function form(ctx: IContext) {
    // @ts-ignore for travis
    const { url, code }: IBody = ctx.request.body;
    const base = path.join(process.cwd(), url || '');
    if (fs.existsSync(base)) {
        fs.appendFileSync(base, `\n\n${codeFormat(code)}`, 'utf8');
        ctx.success(200, '创建成功', null);
    } else {
        ctx.error(0, '找不到该文件', null);
    }
}
