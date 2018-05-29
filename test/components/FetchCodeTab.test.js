import { createLocalVue, mount } from '@vue/test-utils';

import VueMaterial from 'vue-material';
import AsyncComputed from "vue-async-computed";
import app from './../../src/app.vue';


const localVue = createLocalVue();
localVue.use(VueMaterial);
localVue.use(AsyncComputed);

describe('fetch code tab', () => {

    it('fetch code tab should render properly', () => {
        const wrapper = mount(app, {
            localVue
        });
        let fetchCode = wrapper.find('.fetch-tab .output-code code').text();
        fetchCode = fetchCode.split(' ').join('');
        fetchCode = fetchCode.split('\n').join('');
        expect(fetchCode).toBe(`fetch('',{"method":"GET","headers":{}}).then(function(resp){console.log(resp);});`
        );
    });

    it('fetch code tab should process url correctly', () => {
        const wrapper = mount(app, {
            data:{
                appName: "Fetcher (beta)",
                inputData: {
                    method: "GET",
                    fetchUrl: "https://github.com/pranayrauthu/fetcher",
                    requestBody: "",
                    requestHeaders: {}
                },
                addHeaderForm: {
                    headerKey: "",
                    headerValue: ""
                },
                yourCode: "// enter your code"
            },
            localVue
        });
        let fetchCode = wrapper.find('.fetch-tab .output-code code').text();
        fetchCode = fetchCode.split(' ').join('');
        fetchCode = fetchCode.split('\n').join('');
        expect(fetchCode).toBe(`fetch('https://github.com/pranayrauthu/fetcher',{"method":"GET","headers":{}}).then(function(resp){console.log(resp);});`);
    });

})
