const fs = require('fs');
const astParse = require('../../socket/document/astParse');

module.exports = async function create(ctx) {
    const { file } = ctx.request.files;
    // const { output } = ctx.request.body;
    const code = fs.readFileSync(file.path, 'utf-8');
    const fileObj = astParse(null, code);
    console.log(fileObj);
    ctx.success(200, '成功', null);
};
