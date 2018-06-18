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


test('HttpCodeTab should render on load', async () => {

    await page.waitForSelector('.http-tab .CodeMirror-line');
    const codeSnippet = await commonInputs.getCodeSnippet(page, 'http');
    expect(codeSnippet).toBe(`GET  HTTP/1.1​​​`);
    
}, 30000);

test('httpCodeTab should render GET request code', async () => {

    await commonInputs.enterSampleGETRequestInput(page);
    let codeSnippet = await commonInputs.getCodeSnippet(page, 'http');
    expect(codeSnippet).toBe(`GET https://jsonplaceholder.typicode.com/posts/1 HTTP/1.1Accept: application/json​​​`);

}, 30000);

test('httpCodeTab should render POST request code', async () => {

    await commonInputs.enterSamplePOSTRequestInput(page);
    let codeSnippet = await commonInputs.getCodeSnippet(page, 'http');
    expect(codeSnippet).toBe(`POST https://jsonplaceholder.typicode.com/posts HTTP/1.1Accept: application/json​​{"title":"foo","body":"bar","userId":1}`);

}, 30000);

afterAll(() => {
    browser.close();
});
