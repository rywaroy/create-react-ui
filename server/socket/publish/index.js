const execa = require('execa');
const glob = require('glob');
const path = require('path');
const fs = require('fs-extra');

module.exports = function publish(socket) {
    socket.on('build', async ({ svnBase }) => {
        // npm run build 构建流程
        socket.emit('term', '开始构建');
        socket.emit('term', 'npm run build');
        socket.emit('build-start');
        await execa.command('npm run build');
        socket.emit('term', '构建完成\n');

        // 更新svn目录
        socket.emit('term', '更新svn目录');
        socket.emit('term', 'svn update');
        await execa.command('svn update', {
            cwd: svnBase,
        });

        // 删除svn目录
        socket.emit('term', '删除svn目录');
        const data = glob.sync('*', {
            cwd: svnBase,
        });
        data.forEach(item => {
            socket.emit('term', `删除${path.join(svnBase, item)}`);
            fs.remove(path.join(svnBase, item));
        });
    });
};
