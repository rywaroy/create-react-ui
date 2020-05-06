const path = require('path');
const fs = require('fs-extra');
const { v4: uuidv4 } = require('uuid');

module.exports = async function addLabel(ctx) {
    const { name } = ctx.request.body;
    const labelPath = path.join(process.cwd(), 'node_modules/.cache/crui/label.json');
    const labelExists = fs.existsSync(labelPath);
    if (labelExists) {
        const label = fs.readJsonSync(labelPath);
        label.list.push({
            name,
            id: uuidv4(),
        });
        fs.writeJsonSync(labelPath, label);
        ctx.success(200, '添加成功');
    } else {
        ctx.error(0, '添加失败');
    }
};
