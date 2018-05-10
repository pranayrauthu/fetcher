import { createLocalVue, mount } from '@vue/test-utils';

import VueMaterial from 'vue-material';
import AsyncComputed from "vue-async-computed";
import app from './../../src/app.vue';


const localVue = createLocalVue();
localVue.use(VueMaterial);
localVue.use(AsyncComputed);

describe('http code tab', () => {

    it('http code tab should render properly', () => {
        const wrapper = mount(app, {
            localVue
        });
        const httpCode = wrapper.find('.http-tab .output-code code').text();
        expect(httpCode).toBe(`GET  HTTP/1.1`);
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
        const curlCode = wrapper.find('.http-tab .output-code code').text();
        expect(curlCode).toBe(`GET https://github.com/pranayrauthu/fetcher HTTP/1.1`);
    });
    
})
