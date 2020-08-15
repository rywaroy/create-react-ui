// ref: https://umijs.org/config/
import { defineConfig } from 'umi';
const path = require('path');
import { dark } from 'umi-ui-theme';

export default defineConfig({
  title: '快速生成react代码工具',
  antd: {},
  hash: true,
  // dynamicImport: {},
  nodeModulesTransform: {
    type: 'none',
  },
  history: {
    type: 'browser'
  },
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
  theme: dark,
  outputPath: './lib/static'
});

