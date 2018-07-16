const commonInputs = require('./../helpers/commonInputs');
const regeneratorRuntime = require("regenerator-runtime");
const puppeteer = require('puppeteer');

let browser, page;

beforeAll(async () => {

    browser = await puppeteer.launch({
        headless: true,
    });
    page = await browser.newPage();

}, 30000);

beforeEach(async () => {
    await page.goto('http://localhost:9000/');
}, 30000);

test('CsharpCodeTab should render on load', async () => {

    const codeSnippet = await commonInputs.getCodeSnippet(page, 'csharp');
    expect(codeSnippet).toBe(`using System;using System.Net.Http;​namespace Fetcher{  class Program  {    static void Main(string[] args)    {      using (var httpClient = new HttpClient())      {                var response = httpClient.GetStringAsync(new Uri("")).Result;        // your code​      }    }  }}`);
    
}, 30000);

test('csharpCodeTab should render GET request code', async () => {

    await commonInputs.enterSampleGETRequestInput(page);
    let codeSnippet = await commonInputs.getCodeSnippet(page, 'csharp');
    expect(codeSnippet).toBe(`using System;using System.Net.Http;​namespace Fetcher{  class Program  {    static void Main(string[] args)    {      using (var httpClient = new HttpClient())      {        httpClient.DefaultRequestHeaders.Add("Accept", "application/json");        var response = httpClient.GetStringAsync(new Uri("https://jsonplaceholder.typicode.com/posts/1")).Result;        // your code​      }    }  }}`);

}, 30000);

test('csharpCodeTab should render POST request code', async () => {

    await commonInputs.enterSamplePOSTRequestInput(page);
    let codeSnippet = await commonInputs.getCodeSnippet(page, 'csharp');
    expect(codeSnippet).toBe(`using System;using System.Net.Http;​namespace Fetcher{  class Program  {    static void Main(string[] args)    {      using (var httpClient = new HttpClient())      {        httpClient.DefaultRequestHeaders.Add("Accept", "application/json");        var response = httpClient.PostStringAsync(new Uri("https://jsonplaceholder.typicode.com/posts"), new StringContent("{"title":"foo","body":"bar","userId":1}")).Result;        // your code​      }    }  }}`);

}, 30000);

afterAll(() => {
    browser.close();
});
