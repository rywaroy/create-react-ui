const path = require('path');
const fs = require('fs-extra');

module.exports = async function addLabel(ctx) {
    const { id } = ctx.query;
    const labelPath = path.join(process.cwd(), 'node_modules/.cache/crui/label.json');
    const labelExists = fs.existsSync(labelPath);
    if (labelExists) {
        const label = fs.readJsonSync(labelPath);
        let index;
        for (let i = 0; i < label.list.length; i++) {
            if (label.list[i].id === id) {
                index = i;
                break;
            }
        }
        if (index === undefined) {
            ctx.error(0, '删除失败');
        } else {
            label.list.splice(index, 1);
            fs.writeJsonSync(labelPath, label);
            ctx.success(0, '删除成功');
        }
    } else {
        ctx.error(0, '删除失败');
    }
};
