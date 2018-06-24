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
	MdList
} from 'vue-material/dist/components';
import VueCodeMirror from 'vue-codemirror-lite'
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

require('codemirror/addon/display/autorefresh');

Vue.use(VueCodeMirror);

Vue.use(MdButton);
Vue.use(MdContent);
Vue.use(MdTabs);
Vue.use(MdToolbar);
Vue.use(MdIcon);
Vue.use(MdSnackbar);
Vue.use(MdField);
Vue.use(MdCheckbox);
Vue.use(MdAutocomplete);
Vue.use(MdMenu);
Vue.use(MdList);


import app from './app.vue';


const APP = new Vue({
	el: '#fetcher-app',
	render: h => h(app)
});

if (!IS_PROD) {
	window.FETCHER_APP = APP;
}