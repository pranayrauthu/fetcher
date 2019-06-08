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

test('fetchCodeTab should render on load', async () => {

    // await commonInputs.clickTab(page, 'fetch');
    const codeSnippet = await commonInputs.getCodeSnippet(page, 'fetch');
    expect(codeSnippet).toBe(`fetch('', {  "method": "GET",  "headers": {}}).then(function(resp){  console.log(resp);});`);
    
}, 30000);

test('fetchCodeTab should render GET request code', async () => {
    
    // await commonInputs.clickTab(page, 'fetch');
    await commonInputs.enterSampleGETRequestInput(page);
    let codeSnippet = await commonInputs.getCodeSnippet(page, 'fetch');
    expect(codeSnippet).toBe(`fetch('https://jsonplaceholder.typicode.com/posts/1', {  "method": "GET",  "headers": {    "Accept": "application/json"  }}).then(function(resp){  console.log(resp);});`);
    
}, 30000);

test('fetchCodeTab should render POST request code', async () => {
    
    // await commonInputs.clickTab(page, 'fetch');
    await commonInputs.enterSamplePOSTRequestInput(page);
    let codeSnippet = await commonInputs.getCodeSnippet(page, 'fetch');
    expect(codeSnippet).toBe(`fetch('https://jsonplaceholder.typicode.com/posts', {  "method": "POST",  "headers": {    "Accept": "application/json"  },  "body": "{\\\"title\\\":\\\"foo\\\",\\\"body\\\":\\\"bar\\\",\\\"userId\\\":1}"}).then(function(resp){  console.log(resp);});`);

}, 30000);

afterAll(() => {
    browser.close();
});
