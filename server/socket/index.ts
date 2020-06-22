import SocketIo from 'socket.io';
import publish from './publish';
import document from './document';

export default function createSocket(server) {
    const io = SocketIo(server);

    io.on('connection', socket => {
        // 心跳
        socket.on('heart-link', () => {});

        // 构建发布
        publish(socket);

        // 文档生成
        document(socket);
    });
}
