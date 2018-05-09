import { createLocalVue, mount } from '@vue/test-utils';

import VueMaterial from 'vue-material';
import app from './../../src/app.vue';


const localVue = createLocalVue();
localVue.use(VueMaterial);
const wrapper = mount(app, {
    localVue
});

describe('curl code tab', () => {
    it('curl code tab should render properly', () => {
        const curlCode = wrapper.find('.curl-tab .output-code code').text();
        expect(curlCode).toBe(`curl -XGET ''`);
    })
})
