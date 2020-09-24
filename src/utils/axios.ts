// import axios from 'axios';
// import { message } from 'antd';

// const Axios = axios.create({
//     baseURL: 'http://localhost:2019/api/',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     responseType: 'json',
//     timeout: 100000,
// });

// // POST传参序列化(添加请求拦截器)
// Axios.interceptors.request.use(
//     config => config,
//     error => {
//         message.error(error.message);
//         return Promise.reject(error.message);
//     },
// );

// // 返回状态判断(添加响应拦截器)
// Axios.interceptors.response.use(
//     res => {
//         if (res.data.status !== 200) {
//             if (res.data.status === 0) {
//                 message.error(res.data.msg);
//             }
//             return Promise.reject(res.data.msg);
//         }
//         return res;
//     },
//     error => {
//         if (error.message.indexOf('timeout') > -1) {
//             message.error('请求超时,请检查网络');
//         }
//         if (error.message.indexOf('Network Error') > -1) {
//             message.error('当前无网络,请检查网络');
//         }
//         return Promise.reject(error.message);
//     },
// );

// export default Axios;

function axios() {
    return Promise.reject();
}

export default {
    get: axios,
    post: axios,
    patch: axios,
    put: axios,
    delete: axios,
};
