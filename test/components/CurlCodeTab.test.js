import { createLocalVue, mount } from '@vue/test-utils';

import VueMaterial from 'vue-material';
import AsyncComputed from "vue-async-computed";
import app from './../../src/app.vue';


const localVue = createLocalVue();
localVue.use(VueMaterial);
localVue.use(AsyncComputed);

describe('curl code tab', () => {

    it('curl code tab should render properly', () => {
        const wrapper = mount(app, {
            localVue
        });
        const curlCode = wrapper.find('.curl-tab .output-code code').text();
        expect(curlCode).toBe(`curl -XGET ''`);
    });
    
    it('curl code tab should process url correctly', () => {
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
        const curlCode = wrapper.find('.curl-tab .output-code code').text();
        expect(curlCode).toBe(`curl -XGET 'https://github.com/pranayrauthu/fetcher'`);
    });
    
})