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

test('PowerShellCodeTab should render on load', async () => {

    await page.waitForSelector('.powershell-tab .CodeMirror-line');
    const codeSnippet = await commonInputs.getCodeSnippet(page, 'powershell');
    expect(codeSnippet).toBe(`Invoke-WebRequest -Uri '' -Method 'GET'`);
    
}, 30000);

test('PowerShellCodeTab should render GET request code', async () => {

    await commonInputs.enterSampleGETRequestInput(page);
    let codeSnippet = await commonInputs.getCodeSnippet(page, 'powershell');
    expect(codeSnippet).toBe(`Invoke-WebRequest -Uri 'https://jsonplaceholder.typicode.com/posts/1' -Method 'GET'-Headers @{"Accept"="application/json";}`);

}, 30000);

test('PowerShellCodeTab should render POST request code', async () => {

    await commonInputs.enterSamplePOSTRequestInput(page);
    let codeSnippet = await commonInputs.getCodeSnippet(page, 'powershell');
    expect(codeSnippet).toBe(`Invoke-WebRequest -Uri 'https://jsonplaceholder.typicode.com/posts' -Method 'POST'-Headers @{"Accept"="application/json";} -Body '{"title":"foo","body":"bar","userId":1}' `);

}, 30000);

afterAll(() => {
    browser.close();
});
