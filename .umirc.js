// ref: https://umijs.org/config/
const path = require('path');
import { dark } from 'umi-ui-theme';

export default {
  // title: '',
  antd: {},
  hash: true,
  // dynamicImport: {},
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        {
          path: '/',
          redirect: 'template'
        },
        {
          path: 'template',
          component: '../pages/template',
        },
        {
          path: 'code',
          component: '../pages/code',
        },
        {
          path: 'publish',
          component: '../pages/publish',
        },
        {
          path: 'document',
          component: '../pages/document',
        },
        {
          path: 'configlist',
          component: '../pages/configlist',
        },
      ],
    },
  ],
  history: {
    type: 'browser'
  },
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
  theme: dark,
  outputPath: './server/static'
};

