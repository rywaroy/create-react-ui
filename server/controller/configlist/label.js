const path = require('path');
const fs = require('fs-extra');

module.exports = async function label(ctx) {
    const configPath = path.join(process.cwd(), 'node_modules/.cache/crui/config.json');
    const configExists = fs.existsSync(configPath);
    if (configExists) {
        const config = fs.readJsonSync(configPath);
        const { label } = config;
        if (label) {
            ctx.success(200, '获取成功', label);
        } else {
            config.label = { display: false, list: [] };
            fs.writeJsonSync(configPath, config);
            ctx.success(200, '获取成功', { display: false, list: [] });
        }
    } else {
        fs.writeJsonSync(configPath, { label: {
            display: false,
            list: [],
        } });
        ctx.success(200, '获取成功', { display: false, list: [] });
    }
};
