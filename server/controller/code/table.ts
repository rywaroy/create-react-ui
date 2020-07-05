import path from 'path';
import fs from 'fs';
import { ITableCodeParams } from '../../types/code';
import IContext from '../../types/context';
import codeFormat from '../../utils/codeFormat';
import tableCodeTemplate from '../../templateString/table-code-template';

export default async function table(ctx: IContext) {
    // @ts-ignore for travis
    const { url, columns, variable }: ITableCodeParams = ctx.request.body;
    const base = path.join(process.cwd(), url || '');
    if (fs.existsSync(base)) {
        const code = tableCodeTemplate(columns, variable);
        fs.appendFileSync(base, `\n\n${codeFormat(code)}`, 'utf8');
        ctx.success(200, '创建成功', null);
    } else {
        ctx.error(0, '找不到该文件', null);
    }
}
