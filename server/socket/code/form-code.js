const path = require('path');
const fs = require('fs');

module.exports = function createFormCode({ url, code }) {
    return new Promise((resolve, reject) => {
        const base = path.join(process.cwd(), url ? url : '');
        if (fs.existsSync(base)) {
            fs.appendFileSync(base, `\n\n${code}`, 'utf8');
            resolve();
        } else {
            reject('找不到该文件');
        }
    });
};