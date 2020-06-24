import io from 'socket.io-client';
import 'antd/dist/antd.css';

declare global {
    interface Window {
        socket: any;
    }
}

window.socket = io('http://localhost:2019');

export const dva = {
    config: {
        onError(err) {
            err.preventDefault();
            console.error(err.message);
        },
    },
};
