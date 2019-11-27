import io from 'socket.io-client';

window.socket = io('http://localhost:2019');

export const dva = {
    config: {
        onError(err) {
            err.preventDefault();
            console.error(err.message);
        },
    },
};
