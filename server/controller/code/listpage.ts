import path from 'path';
import fs from 'fs-extra';
import IContext from '../../types/context';
import codeFormat from '../../utils/codeFormat';
import oilListpageMap from '../../templateString/oil-listpage-map';
import oilListpageModel from '../../templateString/oil-listpage-model';
import oilListpageIndex from '../../templateString/oil-listage-index';
import { IListPage } from '../../types/code';

export default async function listpage(ctx: IContext) {
    // @ts-ignore for travis
    const { url, name, pageOption, namespace }: IListPage = ctx.request.body;
    const { formObject, tableObject, popupForms, title, buttons } = pageOption;
    // map.js
    const mapBase = path.join(process.cwd(), url, name, 'map.js');
    let mapString = oilListpageMap(formObject, tableObject, popupForms);
    mapString = codeFormat(mapString);

    // model.js
    const popupFormsName = popupForms.map(item => item.name);
    const modelBase = path.join(process.cwd(), url, name, 'model.js');
    const { dataSource } = tableObject;
    let modelString = oilListpageModel(namespace, popupFormsName, dataSource);
    modelString = codeFormat(modelString);

    // index.js
    const indexBase = path.join(process.cwd(), url, name, 'index.js');
    let indexString = oilListpageIndex(name, title, namespace, buttons, !!formObject, popupForms);
    indexString = codeFormat(indexString);

    try {
        fs.outputFileSync(mapBase, mapString);
        fs.outputFileSync(modelBase, modelString);
        fs.outputFileSync(indexBase, indexString);
        ctx.success(200, '创建成功', null);
    } catch {
        ctx.success(0, '创建失败', null);
    }
}
