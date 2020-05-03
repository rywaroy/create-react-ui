const path = require('path');
const fs = require('fs-extra');

module.exports = async function label(ctx) {
    const { display } = ctx.request.body;
    const labelPath = path.join(process.cwd(), 'node_modules/.cache/crui/label.json');
    const labelExists = fs.existsSync(labelPath);
    if (labelExists) {
        const label = fs.readJsonSync(labelPath);
        label.display = display !== 'false';
        fs.writeJsonSync(labelPath, label);
        ctx.success(0, '修改成功');
    } else {
        ctx.error(0, '修改失败');
    }
};
