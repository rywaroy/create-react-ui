const path = require('path');
const fs = require('fs-extra');

module.exports = async function label(ctx) {
    const labelPath = path.join(process.cwd(), 'node_modules/.cache/crui/label.json');
    const labelExists = fs.existsSync(labelPath);
    if (labelExists) {
        const label = fs.readJsonSync(labelPath);
        ctx.success(200, '获取成功', label);
    } else {
        fs.writeJsonSync(labelPath, {
            display: false,
            list: [],
        });
        ctx.success(200, '获取成功', { display: false, list: [] });
    }
};
