import path from 'path';
import fs from 'fs-extra';
import defaultTemplate from '../../templateString/default-template';
import IContext from '../../types/context';

interface IQuery {
    variable: string;
    url: string;
    folderName?: string;
    fileName: string;
}

export default async function defaultController(ctx: IContext) {
    let { variable }: IQuery = ctx.query;
    const { url, folderName, fileName }: IQuery = ctx.query;
    let base = path.join(process.cwd(), url || '');
    variable = variable || 'Template';

    // 创建文件夹
    if (folderName) {
        base = path.join(base, folderName);
        if (fs.existsSync(base)) {
            ctx.error(0, '该文件夹已存在', null);
            return;
        }
    }
    const script = defaultTemplate(variable);
    fs.outputFileSync(path.join(base, fileName), script);
    ctx.success(200, '创建成功', null);
}
