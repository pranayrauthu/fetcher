import { Page } from "puppeteer";

/**
 * clicks on specific tab.
 * @param {Page} page 
 * @param {string} tab 
 */
export function clickTab(page, tab){
    return page.click(`a[href='#/${tab}']`);
}

/**
 * returns generated code snippet.
 * @param {Page} page 
 * @param {string} tab 
 */
export async function getCodeSnippet(page, tab) {
    await clickTab(page, tab);
    await page.waitForSelector(`.${tab}-tab .CodeMirror-line`);
    return page.$$eval(`.${tab}-tab .CodeMirror-line`, els => (
        Array.from(els).map(el => el.innerText).join('')
    ));
}

/**
 * fills input fields to make a simple GET request.
 * @param {Page} page 
 * @param {string} tab 
 */
export async function enterSampleGETRequestInput(page) {
    await page.type('.input-tab .fetch-url-input input', 'https://jsonplaceholder.typicode.com/posts/1', {delay: 20});
    await page.type('.input-tab .header-key-input input', 'Accept', {delay: 20});
    await page.type('.input-tab .header-value-input input', 'application/json', {delay: 20});
    await page.keyboard.press('Tab');
    await page.waitFor(3000);
    await page.click('.input-tab .add-header-btn');
    return page.waitFor(3000);
}

/**
 * fills input fields to make a simple POST request.
 * @param {Page} page
 * @param {string} tab 
 */
export async function enterSamplePOSTRequestInput(page) {
    await page.type('.input-tab .fetch-url-input input', 'https://jsonplaceholder.typicode.com/posts', {delay: 20});
    await page.click('.input-tab .http-method-input input');
    await page.click(
        'div.md-select-menu.md-menu-content-bottom-start.md-menu-content-small.md-menu-content.md-theme-default > div > ul > li:nth-child(2) > button',
        {delay: 20}
    );
    await page.type('.input-tab textarea.request-body', `{"title":"foo","body":"bar","userId":1}`, {delay: 20});
    await page.type('.input-tab .header-key-input input', 'Accept', {delay: 20});
    await page.type('.input-tab .header-value-input input', 'application/json', {delay: 20});
    await page.keyboard.press('Tab');
    await page.waitFor(3000);
    await page.click('.input-tab .add-header-btn');
    return page.waitFor(3000);
}