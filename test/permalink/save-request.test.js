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

test('on saving the request permalink should be created', async () => {

    await commonInputs.enterSampleGETRequestInput(page);
    await page.click('.app-header .app-menu');
    await page.waitFor(3000);
    await page.click('.md-drawer .nav-btn-save');
    await page.waitFor(3000);
    const urlAfterSave = await page.url();
    expect(urlAfterSave).toContain('id');
    await page.goto(urlAfterSave);
    const codeSnippet = await commonInputs.getCodeSnippet(page, 'fetch');
    expect(codeSnippet).toBe(`fetch('https://jsonplaceholder.typicode.com/posts/1', {  "method": "GET",  "headers": {    "Accept": "application/json"  }}).then(function(resp){  console.log(resp);});`);
    
}, 30000);

afterAll(() => {
    browser.close();
});
