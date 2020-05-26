import { fetchCode, asyncAwaitCode } from './output-code';

describe('JavaScript Fetch Api tests', () => {



    test('It should generate fetch Api code for GET requests', () => {
        const options = {
            fetchUrl: 'https://jsonplaceholder.typicode.com/posts/1',
            method: 'GET',
            requestHeaders: {},
            enableMode: false,
            processJSON: false
        };
        const actualOutput = fetchCode(options);
        const expectedCode = `fetch('https://jsonplaceholder.typicode.com/posts/1', {\n` +
                            `  "method": "GET",\n` +
                            `  "headers": {}\n` +
                            `}).then(function(resp){\n` +
                            `	console.log(resp);\n` +
                            `});`;
        expect(actualOutput).toBe(expectedCode);
    });

    test('It should generate fetch Api code for GET requests with JSON processing', () => {
        const options = {
            fetchUrl: 'https://jsonplaceholder.typicode.com/posts/1',
            method: 'GET',
            requestHeaders: {},
            enableMode: false,
            processJSON: true
        };
        const actualOutput = fetchCode(options);
        const expectedCode = `fetch('https://jsonplaceholder.typicode.com/posts/1', {\n` +
                            `  "method": "GET",\n` +
                            `  "headers": {}\n` +
                            `}).then(function(resp){\n` +
                            `	return resp.json();\n` +
                            `}).then(function(resp){\n` +
                            `	console.log(resp);\n` +
                            `});`;
        expect(actualOutput).toBe(expectedCode);
    });

    // TODO: Need to add test for fetch api with mode

    test('It should generate fetch Api code for POST requests', () => {
        const options = {
            fetchUrl: 'https://jsonplaceholder.typicode.com/posts',
            method: 'POST',
            requestBody: `{"id":1,"title":"foo","body":"bar","userId":1}`,
            requestHeaders: {
                'Content-Type':  'application/json'
            },
            enableMode: false,
            processJSON: false
        };
        const actualOutput = fetchCode(options);
        const expectedCode = `fetch('https://jsonplaceholder.typicode.com/posts', {\n` +
                            `  "method": "POST",\n` +
                            `  "headers": {\n` +
                            `    "Content-Type": "application/json"\n` +
                            `  },\n` +
                            `  "body": "{\\\"id\\\":1,\\\"title\\\":\\\"foo\\\",\\\"body\\\":\\\"bar\\\",\\\"userId\\\":1}"\n` +
                            `}).then(function(resp){\n` +
                            `	console.log(resp);\n` +
                            `});`;
        expect(actualOutput).toBe(expectedCode);
    });

    test('It should generate async await code for GET requests', () => {
        const options = {
            fetchUrl: 'https://jsonplaceholder.typicode.com/posts/1',
            method: 'GET',
            requestHeaders: {},
            enableMode: false,
            processJSON: false
        };
        const actualOutput = asyncAwaitCode(options);
        const expectedCode = `const resp = await fetch('https://jsonplaceholder.typicode.com/posts/1', {\n` +
                            `  "method": "GET",\n` +
                            `  "headers": {}\n` +
                            `});`;
        expect(actualOutput).toBe(expectedCode);
    });

    test('It should generate async await code for GET requests with JSON Processing', () => {
        const options = {
            fetchUrl: 'https://jsonplaceholder.typicode.com/posts/1',
            method: 'GET',
            requestHeaders: {},
            enableMode: false,
            processJSON: true
        };
        const actualOutput = asyncAwaitCode(options);
        const expectedCode = `const resp = await (await fetch('https://jsonplaceholder.typicode.com/posts/1', {\n` +
                            `  "method": "GET",\n` +
                            `  "headers": {}\n` +
                            `})).json();`;
        expect(actualOutput).toBe(expectedCode);
    });

    // TODO: Need to add test for async await with mode

    test('It should generate async await code for POST requests', () => {
        const options = {
            fetchUrl: 'https://jsonplaceholder.typicode.com/posts',
            method: 'POST',
            requestBody: `{"id":1,"title":"foo","body":"bar","userId":1}`,
            requestHeaders: {
                'Content-Type':  'application/json'
            },
            enableMode: false,
            processJSON: false
        };
        const actualOutput = asyncAwaitCode(options);
        const expectedCode = `const resp = await fetch('https://jsonplaceholder.typicode.com/posts', {\n` +
                            `  "method": "POST",\n` +
                            `  "headers": {\n` +
                            `    "Content-Type": "application/json"\n` +
                            `  },\n` +
                            `  "body": "{\\\"id\\\":1,\\\"title\\\":\\\"foo\\\",\\\"body\\\":\\\"bar\\\",\\\"userId\\\":1}"\n` +
                            `});`;
        expect(actualOutput).toBe(expectedCode);
    });


});
