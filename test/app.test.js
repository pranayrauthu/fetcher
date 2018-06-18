const regeneratorRuntime = require("regenerator-runtime");
const puppeteer = require('puppeteer');

let browser, page;
beforeAll(async () => {

    browser = await puppeteer.launch({
        headless: true,
    });
    page = await browser.newPage();
    await page.goto('http://localhost:9000/');

}, 30000)

test('app should render title properly', async () => {

    await page.waitForSelector('.app-title');
    const appTitle = await page.$eval('.app-title', e => e.innerHTML);
    expect(appTitle).toBe('Fetcher (beta)');

}, 30000);

afterAll(() => {
    browser.close();
})
