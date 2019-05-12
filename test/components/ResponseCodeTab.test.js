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

test('ResponseCodeTab should render on load', async () => {

    const codeSnippet = await commonInputs.getCodeSnippet(page, 'response');
    expect(codeSnippet).toBe(`click on send to see the response.`);
    
}, 30000);

test('ResponseCodeTab should render GET request code', async () => {

    await commonInputs.enterSampleGETRequestInput(page);
    let codeSnippet = await commonInputs.getCodeSnippet(page, 'response');
    expect(codeSnippet).toBe(`click on send to see the response.`);
    // TODO: Need to send the request
    
}, 30000);

test('ResponseCodeTab should render POST request code', async () => {
    
    await commonInputs.enterSamplePOSTRequestInput(page);
    let codeSnippet = await commonInputs.getCodeSnippet(page, 'response');
    expect(codeSnippet).toBe(`click on send to see the response.`);
    // TODO: Need to send the request

}, 30000);

afterAll(() => {
    browser.close();
});
