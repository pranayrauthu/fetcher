import { createLocalVue, mount } from '@vue/test-utils';

import VueMaterial from 'vue-material';
import AsyncComputed from "vue-async-computed";
import app from './../src/app.vue';


const localVue = createLocalVue();
localVue.use(VueMaterial);
localVue.use(AsyncComputed);
const wrapper = mount(app, {
    localVue
});

describe('app', () => {
    it('app should render title properly', () => {
        const appTitle = wrapper.find('.app-title').text();
        expect(appTitle).toBe('Fetcher (beta)');
    })
})
