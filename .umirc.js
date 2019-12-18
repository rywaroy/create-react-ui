// ref: https://umijs.org/config/
const path = require('path');
import { dark } from 'umi-ui-theme';

export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        {
          path: '/',
          component: '../pages/template',
        },
      ],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: {
          webpackChunkName: true,
        },
        title: 'crui',
        dll: true,
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
            /images\//,
          ],
        },
      },
    ],
  ],
  history: 'browser',
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
  theme: dark,
  outputPath: './server/static'
};

