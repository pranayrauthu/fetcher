import { restTemplateCode } from './rest-template-output-code';


describe('JavaCode Tab restTemplate tests', () => {

    test('It should generate restTemplate code for GET requests', () => {
        const options = {
            fetchUrl: 'https://jsonplaceholder.typicode.com/posts/1',
            method: 'GET',
            requestHeaders: {},
        };
        const actualOutput = restTemplateCode(options);
        const expectedCode = `import org.springframework.http.HttpEntity;\n` +
                            `import org.springframework.http.HttpHeaders;\n` +
                            `import org.springframework.http.HttpMethod;\n` +
                            `import org.springframework.http.ResponseEntity;\n` +
                            `import org.springframework.web.client.RestTemplate;\n` +
                            `\n` +
                            `public class App {\n` +
                            `	public static void main(String[] args) {\n` +
                            `	\n` +
                            `		RestTemplate restTemplate = new RestTemplate();\n` +
                            `		String reqUrl = \"https://jsonplaceholder.typicode.com/posts/1\";\n` +
                            `\n` +
                            `		HttpHeaders headers = new HttpHeaders();\n` +
                            `\n` +
                            `		HttpEntity entity = new HttpEntity(headers);\n` +
                            `		ResponseEntity<String> response = restTemplate.exchange(reqUrl, HttpMethod.GET, entity, String.class);\n` +
                            `		System.out.println(response.getBody());\n` +
                            `\n` +
                            `	};\n` +
                            `};\n`;
        expect(actualOutput).toBe(expectedCode);
    });

    test('It should generate restTemplate code for POST requests', () => {
        const options = {
            fetchUrl: 'https://jsonplaceholder.typicode.com/posts',
            method: 'POST',
            requestBody: `{"id":1,"title":"foo","body":"bar","userId":1}`,
            requestHeaders: {
                'Content-Type':  'application/json'
            }
        };
        const actualOutput = restTemplateCode(options);
        const expectedCode = `import org.springframework.http.HttpEntity;\n` +
                            `import org.springframework.http.HttpHeaders;\n` +
                            `import org.springframework.http.HttpMethod;\n` +
                            `import org.springframework.http.ResponseEntity;\n` +
                            `import org.springframework.web.client.RestTemplate;\n` +
                            `\n` +
                            `public class App {\n` +
                            `	public static void main(String[] args) {\n` +
                            `	\n` +
                            `		RestTemplate restTemplate = new RestTemplate();\n` +
                            `		String reqUrl = \"https://jsonplaceholder.typicode.com/posts\";\n` +
                            `		HttpHeaders headers = new HttpHeaders();\n` +
                            `		headers.add(\"Content-Type\", \"application/json\");\n` +
                            `		String reqBody = \"{\\\"id\\\":1,\\\"title\\\":\\\"foo\\\",\\\"body\\\":\\\"bar\\\",\\\"userId\\\":1}\";\n` +
                            `		HttpEntity<String> entity = new HttpEntity<String>(reqBody, headers);\n` +
                            `		ResponseEntity<String> response = restTemplate.exchange(reqUrl, HttpMethod.POST, entity, String.class);\n` +
                            `		System.out.println(response.getBody());\n` +
                            `\n` +
                            `	};\n` +
                            `};\n`;
        expect(actualOutput).toBe(expectedCode);
    });

});