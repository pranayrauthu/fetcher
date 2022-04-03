import Vue from 'vue';

import {
	MdButton,
	MdContent,
	MdTabs,
	MdToolbar,
	MdIcon,
	MdSnackbar,
	MdField,
	MdCheckbox,
	MdAutocomplete,
	MdMenu,
	MdList,
	MdDrawer
} from 'vue-material/dist/components';
import VueCodeMirror from 'vue-codemirror-lite';
import 'vue-material/dist/vue-material.min.css';

require('codemirror/addon/display/autorefresh');

[
	VueCodeMirror,
	MdButton,
	MdContent,
	MdTabs,
	MdToolbar,
	MdIcon,
	MdSnackbar,
	MdField,
	MdCheckbox,
	MdAutocomplete,
	MdMenu,
	MdList,
	MdDrawer
].forEach(c => Vue.use(c));

import router from './router';
import store from './store';
import app from './app.vue';
import vuetify from './plugins/vuetify';

const APP = new Vue({
	el: '#fetcher-app',
	vuetify,
	router,
	store,
	render: h => h(app)
});

if (!IS_PROD) {
	window.FETCHER_APP = APP;
}