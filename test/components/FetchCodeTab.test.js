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

test('fetchCodeTab should render on load', async () => {

    await page.waitForSelector('.fetch-tab .CodeMirror-line');
    let codeSnippet = await page.$$eval('.fetch-tab .CodeMirror-line', els => (
        Array.from(els).map(el => el.innerText).join('')
    ));
    expect(codeSnippet).toBe(`fetch('', {  "method": "GET",  "headers": {}}).then(function(resp){  console.log(resp);});`);
    
}, 30000);

afterAll(() => {
    browser.close();
});
