import Vue from 'vue';
import VueMaterial from 'vue-material';
import VueCodeMirror from 'vue-codemirror-lite'
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

require('codemirror/addon/display/autorefresh');

Vue.use(VueMaterial);
Vue.use(VueCodeMirror);

import app from './app.vue';


const APP =new Vue({
	el: '#fetcher-app',
	render: h => h(app)
});

if(!IS_PROD){
	window.FETCHER_APP = APP;
}