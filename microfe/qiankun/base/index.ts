import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'react-app', // app name registered
    entry: '//localhost:1231',
    container: '#app1',
    activeRule: '/app1',
  },
  {
    name: 'app2', // app name registered
    entry: '//localhost:1232',
    container: '#app2',
    activeRule: '/app1',
  },
  // {
  //   name: 'react app', // app name registered
  //   entry: { html: '<div id="root"></div>', scripts: ['//localhost:1231/main.js'] },
  //   container: '#app1',
  //   activeRule: '/app1',
  // },
]);

start();
