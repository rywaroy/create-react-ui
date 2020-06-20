import execa from 'execa';
import glob from 'glob';
import path from 'path';
import fs from 'fs-extra';
import { Socket } from 'socket.io';

export default function publish(socket: Socket) {
    socket.on('build', async ({ svnBase }) => {
        try {
            // npm run build 构建流程
            socket.emit('term-publish', '开始构建');
            socket.emit('term-publish', 'npm run build');
            socket.emit('building', true);
            await execa.command('npm run build');
            socket.emit('term-publish', '构建完成\n');

            // 更新svn目录
            socket.emit('term-publish', '更新svn目录');
            socket.emit('term-publish', 'svn update');
            await execa.command('svn update', {
                cwd: svnBase,
            });

            // 删除svn目录
            socket.emit('term-publish', '删除svn目录');
            const data = glob.sync('*', {
                cwd: svnBase,
            });
            deleteFiles(data, svnBase);
            await execa.command('svn commit -m "delete"', {
                cwd: svnBase,
            });

            // 复制dist文件到svn
            socket.emit('term-publish', '将dist文件复制到svn');
            fs.copySync(path.join(process.cwd(), 'dist'), svnBase);

            // svn add
            socket.emit('term-publish', 'svn add . --force');
            await execa.command('svn add . --force', {
                cwd: svnBase,
            });
            socket.emit('term-publish', '提交svn');
            await execa.command('svn commit -m "add"', {
                cwd: svnBase,
            });
            socket.emit('term-publish', '提交完成');
            socket.emit('building', false);

            // 设置缓存
            writeCacheJson(svnBase);
        } catch {
            socket.emit('msg', {
                msg: '构建失败',
                status: 0,
            });
            socket.emit('building', false);
        }
    });
}

function deleteFiles(data: string[], svnBase: string) {
    for (let i = 0; i < data.length; i++) {
        const stats = fs.statSync(path.join(svnBase, data[i]));
        if (stats.isDirectory()) {
            const list = glob.sync(`${data[i]}/*`, {
                cwd: svnBase,
            });
            deleteFiles(list, svnBase);
            fs.remove(path.join(svnBase, data[i]));
        } else {
            execa.commandSync(`svn rm ${data[i]}`, {
                cwd: svnBase,
            });
        }
    }
}

function writeCacheJson(svnBase: string) {
    const cachePath = path.join(process.cwd(), 'node_modules/.cache/crui/cache.json');
    fs.outputJSONSync(cachePath, {
        svnBase,
    });
}
