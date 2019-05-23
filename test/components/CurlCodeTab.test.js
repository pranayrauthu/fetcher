const {
    getCodeSnippet,
    clickTab,
    enterSampleGETRequestInput,
    enterSamplePOSTRequestInput
} = require('./../helpers/commonInputs');
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

test('CurlCodeTab should render on load', async () => {

    const codeSnippet = await getCodeSnippet(page, 'curl');
    expect(codeSnippet).toBe(`curl -XGET ""`);
    
}, 30000);

test('curlCodeTab should render GET request code', async () => {

    await enterSampleGETRequestInput(page);
    let codeSnippet = await getCodeSnippet(page, 'curl');
    expect(codeSnippet).toBe(`curl -XGET -H "Accept: application/json" "https://jsonplaceholder.typicode.com/posts/1"`);

}, 30000);

test('curlCodeTab should render POST request code', async () => {

    await enterSamplePOSTRequestInput(page);
    let codeSnippet = await getCodeSnippet(page, 'curl');
    expect(codeSnippet).toBe(`curl -XPOST -H "Accept: application/json" -d "{\\"title\\":\\"foo\\",\\"body\\":\\"bar\\",\\"userId\\":1}" "https://jsonplaceholder.typicode.com/posts"`);

}, 30000);

test('curlCodeTab should toggle insecure flag', async () => {
    
    await clickTab(page, 'curl');
    await page.waitFor(3000);
    await page.click('.curl-tab .insecure-toggle label');
    await page.waitFor(3000);
    const codeSnippet = await getCodeSnippet(page, 'curl');
    expect(codeSnippet).toBe(`curl --insecure -XGET ""`);
    
}, 30000);

test('curlCodeTab should toggle dump-header flag', async () => {
    
    await clickTab(page, 'curl');
    await page.waitFor(3000);
    await page.click('.curl-tab .dump-headers-toggle label');
    await page.waitFor(3000);
    const codeSnippet = await getCodeSnippet(page, 'curl');
    expect(codeSnippet).toBe(`curl --dump-header - -XGET ""`);
    
}, 30000);

test('curlCodeTab should pipe to clip', async () => {
    
    await clickTab(page, 'curl');
    await page.waitFor(3000);
    await page.click('.curl-tab .copy-to-clip-toggle label');
    await page.waitFor(3000);
    const codeSnippet = await getCodeSnippet(page, 'curl');
    expect(codeSnippet).toBe(`curl -XGET "" | clip`);

}, 30000);

afterAll(() => {
    browser.close();
});
