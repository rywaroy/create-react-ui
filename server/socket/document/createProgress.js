const chalk = require('chalk');

/**
 * 创建进度条
 * @param {Number} num - 当前进度
 * @param {Number} total - 总进度
 * @param {String} text - 文字展示
 */
module.exports = function creatProgress(num, total, text) {
    const percent = num / total;
    const done = Math.floor(20 * percent);
    const none = 20 - done;
    let p = '';
    for (let i = 0; i < done; i++) {
        p += chalk.green('▇');
    }
    for (let i = 0; i < none; i++) {
        p += chalk.gray('▇');
    }
    return `${text}  ${p}  ${num}/${total} \n`;
};
