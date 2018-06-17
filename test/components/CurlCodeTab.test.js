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

test('CurlCodeTab should render on load', async () => {

    await page.waitForSelector('.curl-tab .CodeMirror-line');
    let codeSnippet = await page.$$eval('.curl-tab .CodeMirror-line', els => (
        Array.from(els).map(el => el.innerText).join('')
    ));
    expect(codeSnippet).toBe(`curl -XGET ''`);
    
}, 30000);

afterAll(() => {
    browser.close();
});
