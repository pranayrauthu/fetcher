import Vue from 'vue';
import VueMaterial from 'vue-material';
import AsyncComputed from "vue-async-computed";
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

Vue.use(VueMaterial);
Vue.use(AsyncComputed);

import app from './app.vue';

new Vue({
	el: '#fetcher-app',
	render: h => h(app)
});