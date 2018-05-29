import {
    createLocalVue,
    mount
} from '@vue/test-utils';

import VueMaterial from 'vue-material';
import AsyncComputed from "vue-async-computed";
import app from './../../src/app.vue';


const localVue = createLocalVue();
localVue.use(VueMaterial);
localVue.use(AsyncComputed);

const codeFormatter = code => (
    code.split('\n').join(' ').split('\t').join(' ')
    .split(' ')
    .map(s => s.trim())
    .filter(s => s)
    .join(' ')
);

const expectedDefaultCode = codeFormatter(`
using System;
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
}`);

const expectedCodeWithUrl = codeFormatter(`
using System;
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
}`);

describe('csharp code tab', () => {

    it('csharp code tab should render properly', () => {
        const wrapper = mount(app, {
            localVue
        });
        let csharpCode = wrapper.find('.csharp-tab .output-code code').text();
        csharpCode = codeFormatter(csharpCode);
        expect(csharpCode).toBe(expectedDefaultCode);
    });

    it('csharp code tab should process url correctly', () => {
        const wrapper = mount(app, {
            data: {
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
        let csharpCode = wrapper.find('.csharp-tab .output-code code').text();
        csharpCode = codeFormatter(csharpCode);
        expect(csharpCode).toBe(expectedCodeWithUrl);
    });

})
