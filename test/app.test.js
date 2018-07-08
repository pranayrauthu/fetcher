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

test('app should render logo properly', async () => {

    await page.waitForSelector('.app-logo');
    const applogo = !!(await page.$('.app-logo'));
    expect(applogo).toBe(true);

}, 30000);

afterAll(() => {
    browser.close();
})
