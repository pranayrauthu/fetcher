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
      path: '/response/:id',
      name: 'response',
      component: ResponseTab
    },
    {
      path: '/:id',
      alias: '/fetch/:id',
      name: 'fetch',
      component: FetchCodeTab
    },
    {
      path: '/curl/:id',
      name: 'curl',
      component: CurlCodeTab
    },
    {
      path: '/csharp',
      name: 'csharp',
      component: CsharpCodeTab
    },
    {
      path: '/http/:id',
      name: 'http',
      component: HttpCodeTab
    },
    {
      path: '/powershell/:id',
      name: 'powershell',
      component: PowerShellCodeTab
    },
    {
      path: '/java/:id',
      name: 'java',
      component: JavaCodeTab
    },
  ]
})