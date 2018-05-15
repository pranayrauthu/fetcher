import { createLocalVue, mount } from '@vue/test-utils';

import VueMaterial from 'vue-material';
import AsyncComputed from "vue-async-computed";
import app from './../../src/app.vue';


const localVue = createLocalVue();
localVue.use(VueMaterial);
localVue.use(AsyncComputed);


const expectedDefaultCode = `using System;
                using System.Net.Http;

                namespace Fetcher
                {
                    class Program
                    {
                        static void Main(string[] args)
                        {
                            using (var httpClient = new HttpClient())
                            {
                                
                                var response = httpClient.GetStringAsync(new Uri("")).Result;
                                // your code
                            }
                        }
                    }
                }`;

const expectedCodeWithUrl = `using System;
                using System.Net.Http;

                namespace Fetcher
                {
                    class Program
                    {
                        static void Main(string[] args)
                        {
                            using (var httpClient = new HttpClient())
                            {
                                
                                var response = httpClient.GetStringAsync(new Uri("https://github.com/pranayrauthu/fetcher")).Result;
                                // your code
                            }
                        }
                    }
                }`;

describe('csharp code tab', () => {

    it('csharp code tab should render properly', () => {
        const wrapper = mount(app, {
            localVue
        });
        const csharpCode = wrapper.find('.csharp-tab .output-code code').text();
        expect(csharpCode.replace(/\s{2}/g, ' ')).toBe(expectedDefaultCode.replace(/\s{2}/g, ' '));
    });
    
    it('csharp code tab should process url correctly', () => {
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
        const csharpCode = wrapper.find('.csharp-tab .output-code code').text();
        expect(csharpCode.replace(/\s{2}/g, ' ')).toBe(expectedCodeWithUrl.replace(/\s{2}/g, ' '));
    });
    
})
