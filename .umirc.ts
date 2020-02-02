import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig =  {
  treeShaking: true,
  routes: [
    {
      path: '/',
      redirect: '/house',
    },
    {
      path: '/login',
      component: './login/index',
    },
    {
      path: '/house',
      component: './house/index',
    },
    {
      path: '/house',
      component: './house/index',
      routes: [
        { path: '/house/demo/table', component: './demo/table/index' },
        { path: '/house/demo/detail', component: './demo/detail/index' },
        { path: '/house/demo/detail1', component: './demo/detail/index' },
        { path: '/house/demo/detail2', component: './demo/detail/index' },
      ]
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'Hapi GUI',
      dll: true,
      locale: {
        enable: true,
        default: 'en-US',
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}

export default config;
