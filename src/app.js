import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

Vue.use(VueMaterial)

import app from './app.vue';

new Vue({
	el: '#fetcher-app',
	render: h => h(app)
});