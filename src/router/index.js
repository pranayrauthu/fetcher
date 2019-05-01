import Vue from 'vue';
import Router from 'vue-router';


const FetchCodeTab = () => import('./../components/FetchCodeTab.vue');
const CurlCodeTab = () => import('./../components/CurlCodeTab.vue');
const CsharpCodeTab = () => import('./../components/CsharpCodeTab.vue');
const HttpCodeTab = () => import('./../components/HttpCodeTab.vue');
const PowerShellCodeTab = () => import('./../components/PowerShellCodeTab.vue');
const JavaCodeTab = () => import('./../components/JavaCodeTab.vue');
const ResponseTab = () => import('./../components/ResponseTab.vue');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/response',
      name: 'response',
      component: ResponseTab
    },
    {
      path: '/',
      alias: '/fetch',
      name: 'fetch',
      component: FetchCodeTab
    },
    {
      path: '/curl',
      name: 'curl',
      component: CurlCodeTab
    },
    {
      path: '/csharp',
      name: 'csharp',
      component: CsharpCodeTab
    },
    {
      path: '/http',
      name: 'http',
      component: HttpCodeTab
    },
    {
      path: '/powershell',
      name: 'powershell',
      component: PowerShellCodeTab
    },
    {
      path: '/java',
      name: 'java',
      component: JavaCodeTab
    },
  ]
})