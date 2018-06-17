const regeneratorRuntime = require("regenerator-runtime");
const puppeteer = require('puppeteer');

let browser, page;
beforeAll(async () => {

    browser = await puppeteer.launch({
        headless: false,
    });
    page = await browser.newPage();
    await page.goto('http://localhost:9000/');

}, 30000);

test('CsharpCodeTab should render on load', async () => {

    await page.waitForSelector('.csharp-tab .CodeMirror-line');
    let codeSnippet = await page.$$eval('.csharp-tab .CodeMirror-line', els => (
        Array.from(els).map(el => el.innerText).join('')
    ));
    expect(codeSnippet).toBe(`using System;using System.Net.Http;​namespace Fetcher{  class Program  {    static void Main(string[] args)    {      using (var httpClient = new HttpClient())      {                var response = httpClient.GetStringAsync(new Uri("")).Result;        // your code​      }    }  }}`);
    
}, 30000);

afterAll(() => {
    browser.close();
});
