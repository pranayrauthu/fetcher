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

test('HttpCodeTab should render on load', async () => {

    await page.waitForSelector('.http-tab .CodeMirror-line');
    let codeSnippet = await page.$$eval('.http-tab .CodeMirror-line', els => (
        Array.from(els).map(el => el.innerText).join('')
    ));
    expect(codeSnippet).toBe(`GET  HTTP/1.1​​​`);
    
}, 30000);

afterAll(() => {
    browser.close();
});
