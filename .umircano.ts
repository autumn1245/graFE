import { defineConfig } from 'umi';
const path = require('path');

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  chainWebpack: config => {
    console.log(config.toConfig(), '00000');
    return config.module
      .rule('less')
      .test(/\.less$/)
      .oneOf('normal')
      .use('sass-resources-loader')
      .loader('sass-resources-loader')
      .options({
        resources: path.resolve(__dirname, '../src/assets/styles/util.less'),
      })
      .end();
  },
  devtool:"eval",
});
