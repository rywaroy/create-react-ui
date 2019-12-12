const Router = require('koa-router');
const fs = require('fs');
const path = require('path');

const router = new Router();

router.get('/api/file/template', async ctx => {
    const base = path.join(process.cwd(), 'crui', 'template');
    if (fs.existsSync(base)) {
        const file = fs.readdirSync(base);
        if (file.length === 0) {
            ctx.error(0, '该目录下没有文件', null);
        } else {
            const data = [];
            file.forEach((item, index) => {
                if (/^.+\..+$/.test(item)) { // 判断是文件
                    data.push({
                        title: item,
                        key: index + 1,
                        value: path.join('crui', 'template', item),
                    });
                }
            });
            ctx.success(200, '', data);
        }
    } else {
        ctx.error(0, '找不到/crui/template文件目录', null);
    }
});

module.exports = router;