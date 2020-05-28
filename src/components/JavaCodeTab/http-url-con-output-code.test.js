
import { httpUrlConnectionCode } from './http-url-con-output-code';

describe('JavaCode Tab httpUrlConnection tests', () => {

    test('It should generate httpUrlConnection code for GET requests', () => {
        const options = {
            fetchUrl: 'https://jsonplaceholder.typicode.com/posts/1',
            method: 'GET',
            requestHeaders: {},
        };
        const actualOutput = httpUrlConnectionCode(options);
        const expectedCode = `import java.io.DataOutputStream;\n` +
                            `import java.io.BufferedReader;\n` +
                            `import java.io.InputStreamReader;\n` +
                            `import java.net.URL;\n` +
                            `import java.net.HttpURLConnection;\n` +
                            `\n` +
                            `public class App {\n` +
                            `	public static void main(String[] args) {\n` +
                            `		try {\n` +
                            `			URL url = new URL(\"https://jsonplaceholder.typicode.com/posts/1\");\n` +
                            `			HttpURLConnection connection = (HttpURLConnection) url.openConnection();\n` +
                            `			connection.setRequestMethod(\"GET\");\n` +
                            `			BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));\n` +
                            `			String inputLine;\n` +
                            `			StringBuffer response = new StringBuffer();\n` +
                            `			while ((inputLine = in.readLine()) != null) {\n` +
                            `				response.append(inputLine);\n` +
                            `			}\n` +
                            `			in.close();\n` +
                            `			System.out.println(response.toString());\n` +
                            `		} catch (Exception e) {\n` +
                            `			// TODO: handle exception\n` +
                            `		}\n` +
                            `	}\n` +
                            `}\n`;
        expect(actualOutput).toBe(expectedCode);
    });

    test('It should generate httpUrlConnection code for POST requests', () => {
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
        const actualOutput = httpUrlConnectionCode(options);
        const expectedCode = `import java.io.DataOutputStream;\n` +
                            `import java.io.BufferedReader;\n` +
                            `import java.io.InputStreamReader;\n` +
                            `import java.net.URL;\n` +
                            `import java.net.HttpURLConnection;\n` +
                            `\n` +
                            `public class App {\n` +
                            `	public static void main(String[] args) {\n` +
                            `		try {\n` +
                            `			URL url = new URL(\"https://jsonplaceholder.typicode.com/posts\");\n` +
                            `			HttpURLConnection connection = (HttpURLConnection) url.openConnection();\n` +
                            `			connection.setRequestMethod(\"POST\");\n` +
                            `			connection.setRequestProperty(\"Content-Type\", \"application/json\");\n` +
                            `			String requestBody = \"{\\\"id\\\":1,\\\"title\\\":\\\"foo\\\",\\\"body\\\":\\\"bar\\\",\\\"userId\\\":1}\";\n` +
                            `			connection.setDoOutput(true);\n` +
                            `			DataOutputStream wr = new DataOutputStream(connection.getOutputStream());\n` +
                            `			wr.writeBytes(requestBody);\n` +
                            `			wr.flush();\n` +
                            `			wr.close();\n` +
                            `			BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));\n` +
                            `			String inputLine;\n` +
                            `			StringBuffer response = new StringBuffer();\n` +
                            `			while ((inputLine = in.readLine()) != null) {\n` +
                            `				response.append(inputLine);\n` +
                            `			}\n` +
                            `			in.close();\n` +
                            `			System.out.println(response.toString());\n` +
                            `		} catch (Exception e) {\n` +
                            `			// TODO: handle exception\n` +
                            `		}\n` +
                            `	}\n` +
                            `}\n`;
        expect(actualOutput).toBe(expectedCode);
    });

});
