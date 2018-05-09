import { createLocalVue, mount } from '@vue/test-utils';

import VueMaterial from 'vue-material';
import app from './../../src/app.vue';


const localVue = createLocalVue();
localVue.use(VueMaterial);
const wrapper = mount(app, {
    localVue
});

describe('fetch code tab', () => {
    it('fetch code tab should render properly', () => {
        let fetchCode = wrapper.find('.fetch-tab .output-code code').text();
        expect(fetchCode).toBe(
`fetch('', {
  "method": "GET",
  "headers": {}
}).then(function(resp){
                    console.log(resp);
                });`
        );
    })
})
