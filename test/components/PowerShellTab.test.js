const commonInputs = require('./../helpers/commonInputs');
const regeneratorRuntime = require("regenerator-runtime");
const puppeteer = require('puppeteer');

let browser, page;
const TIME_OUT = 30000;

beforeAll(async () => {

    browser = await puppeteer.launch({
        headless: true,
    });
    page = await browser.newPage();
    
}, TIME_OUT);

beforeEach(async () => {
    await page.goto('http://localhost:9000/');
}, TIME_OUT);

test('PowerShellCodeTab should render on load', async () => {

    const codeSnippet = await commonInputs.getCodeSnippet(page, 'powershell');
    expect(codeSnippet).toBe(`Invoke-WebRequest -Uri '' -Method 'GET'`);
    
}, TIME_OUT);

test('PowerShellCodeTab should render GET request code', async () => {

    await commonInputs.enterSampleGETRequestInput(page);
    let codeSnippet = await commonInputs.getCodeSnippet(page, 'powershell');
    expect(codeSnippet).toBe(`Invoke-WebRequest -Uri 'https://jsonplaceholder.typicode.com/posts/1' -Method 'GET'-Headers @{"Accept"="application/json";}`);

}, TIME_OUT);

test('PowerShellCodeTab should render POST request code', async () => {

    await commonInputs.enterSamplePOSTRequestInput(page);
    let codeSnippet = await commonInputs.getCodeSnippet(page, 'powershell');
    expect(codeSnippet).toBe(`Invoke-WebRequest -Uri 'https://jsonplaceholder.typicode.com/posts' -Method 'POST'-Headers @{"Accept"="application/json";} -Body '{"title":"foo","body":"bar","userId":1}' `);

}, TIME_OUT);

test('PowerShellCodeTab should pipe to clip', async () => {
    
    await commonInputs.clickTab(page, 'powershell');
    await page.waitFor(3000);
    await page.click('.powershell-tab .copy-to-clip-toggle label');
    await page.waitFor(3000);
    const codeSnippet = await commonInputs.getCodeSnippet(page, 'powershell');
    expect(codeSnippet).toBe(`Invoke-WebRequest -Uri '' -Method 'GET' | clip`);
    
}, TIME_OUT);

test('PowerShellCodeTab should expand content property', async () => {
    
    await commonInputs.clickTab(page, 'powershell');
    await page.waitFor(3000);
    await page.click('.powershell-tab .expand-content-toggle label');
    await page.waitFor(3000);
    const codeSnippet = await commonInputs.getCodeSnippet(page, 'powershell');
    expect(codeSnippet).toBe(`Invoke-WebRequest -Uri '' -Method 'GET' | Select-Object -Expand Content`);
    
}, TIME_OUT);

afterAll(() => {
    browser.close();
});
