import { createRouter, createWebHashHistory } from 'vue-router';

const FetchCodeTab = () => import('./../components/FetchCodeTab/Index.vue');
const CurlCodeTab = () => import('./../components/CurlCodeTab.vue');
const CsharpCodeTab = () => import('./../components/CsharpCodeTab.vue');
const HttpCodeTab = () => import('./../components/HttpCodeTab.vue');
const PowerShellCodeTab = () => import('./../components/PowerShellCodeTab.vue');
const JavaCodeTab = () => import('./../components/JavaCodeTab/Index.vue');
const ResponseTab = () => import('./../components/ResponseTab.vue');

const routes = [
  {
    path: '/response/:id?',
    name: 'response',
    component: ResponseTab
  },
  {
    path: '/curl/:id?',
    name: 'curl',
    component: CurlCodeTab
  },
  {
    path: '/csharp/:id?',
    name: 'csharp',
    component: CsharpCodeTab
  },
  {
    path: '/http/:id?',
    name: 'http',
    component: HttpCodeTab
  },
  {
    path: '/powershell/:id?',
    name: 'powershell',
    component: PowerShellCodeTab
  },
  {
    path: '/java/:id?',
    name: 'java',
    component: JavaCodeTab
  },
  {
    path: '/fetch/:id?',
    alias: '/:id?',
    name: 'fetch',
    component: FetchCodeTab
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'home',
    component: FetchCodeTab
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
