import SocketIo from 'socket.io';
import { Server } from 'http';
import document from './document';

export default function createSocket(server: Server) {
    const io = SocketIo(server);

    io.on('connection', socket => {
        // 心跳
        socket.on('heart-link', () => {});

        // 文档生成
        document(socket);
    });
}
