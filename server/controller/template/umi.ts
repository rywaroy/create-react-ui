import path from 'path';
import fs from 'fs-extra';
import umiModel from '../../templateString/umi-model';
import umiTemplate from '../../templateString/umi-template';
import IContext from '../../types/context';

interface IQuery {
    variable: string;
    url: string;
    folderName?: string;
    fileName: string;
    namespace: string;
    oilConfig: boolean;
}

export default async function umiController(ctx: IContext) {
    let { variable, namespace }: IQuery = ctx.query;
    const { url, folderName, fileName, oilConfig }: IQuery = ctx.query;
    let base = path.join(process.cwd(), url || '');
    variable = variable || 'Template';
    namespace = namespace || 'global';

    // 创建文件夹
    if (folderName) {
        base = path.join(base, folderName);
        if (fs.existsSync(base)) {
            ctx.error(0, '该文件夹已存在', null);
            return;
        }
    }
    const script = umiTemplate(variable, namespace);
    const modelscript = umiModel(namespace, oilConfig);

    fs.outputFileSync(path.join(base, fileName), script);
    fs.outputFileSync(path.join(base, 'model.js'), modelscript);
    ctx.success(200, '创建成功', null);
}
