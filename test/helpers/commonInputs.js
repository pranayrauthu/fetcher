export function getCodeSnippet(page, tab) {
    return page.$$eval(`.${tab}-tab .CodeMirror-line`, els => (
        Array.from(els).map(el => el.innerText).join('')
    ));
}

export async function enterSampleGETRequestInput(page) {
    await page.type('.input-tab .fetch-url-input input', 'https://jsonplaceholder.typicode.com/posts/1', {delay: 20});
    await page.type('.input-tab .header-key-input input', 'Accept', {delay: 20});
    await page.type('.input-tab .header-value-input input', 'application/json', {delay: 20});
    return page.click('.input-tab .add-header-btn');
}

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
    return page.click('.input-tab .add-header-btn');
}