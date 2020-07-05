import path from 'path';
import fs from 'fs';
import { IFormCodeParams } from '../../types/code';
import IContext from '../../types/context';
import codeFormat from '../../utils/codeFormat';
import formCodeTemplate from '../../templateString/form-code-template';

export default async function form(ctx: IContext) {
    // @ts-ignore for travis
    const { url, options, name, labelCol, wrapperCol }: IFormCodeParams = ctx.request.body;
    const base = path.join(process.cwd(), url || '');
    if (fs.existsSync(base)) {
        const code = formCodeTemplate(options, name, labelCol, wrapperCol);
        fs.appendFileSync(base, `\n\n${codeFormat(code)}`, 'utf8');
        ctx.success(200, '创建成功', null);
    } else {
        ctx.error(0, '找不到该文件', null);
    }
}
