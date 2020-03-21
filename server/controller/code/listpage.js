const path = require('path');
const fs = require('fs-extra');
const oilListpageMap = require('../../templateString/oil-listpage-map');
const oilListpageModel = require('../../templateString/oil-listpage-model');

module.exports = async function listpage(ctx) {
    const { url, name, pageOption, namespace } = ctx.request.body;
    const { formCode, tableCode, popupForms } = pageOption;
    // map.js
    const mapBase = path.join(process.cwd(), url, name, 'map.js');
    const mapString = oilListpageMap(formCode, tableCode, popupForms);

    // model.js
    const modelBase = path.join(process.cwd(), url, name, 'model.js');
    const modelString = oilListpageModel(namespace);
    try {
        fs.outputFileSync(mapBase, mapString);
        fs.outputFileSync(modelBase, modelString);
        ctx.success(200, '创建成功', null);
    } catch {
        ctx.success(0, '创建失败', null);
    }
};
