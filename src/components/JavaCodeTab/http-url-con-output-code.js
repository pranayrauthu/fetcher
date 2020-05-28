


function computedHeaderStr(options) {
    const headers = Object.keys(options.requestHeaders);
    if (!(headers.length > 0)) {
        return '';
    }
    let headerStr = '\n\t\t\t';
    headerStr += (headers.map(h => {
        return `connection.setRequestProperty("${h}", "${options.requestHeaders[h]}");`;
    })).join('\n\t\t\t');
    return headerStr;
}


function computedHttpBodyStr(options) {
    const { method, requestBody } = options;
    if (method === 'GET' || !requestBody) {
        return '';
    }
    return (
        `\n` +
        `\t\t\tString requestBody = ${JSON.stringify(requestBody)};\n` +
        `\t\t\tconnection.setDoOutput(true);\n` +
        `\t\t\tDataOutputStream wr = new DataOutputStream(connection.getOutputStream());\n` +
        `\t\t\twr.writeBytes(requestBody);\n` +
        `\t\t\twr.flush();\n` +
        `\t\t\twr.close();`
    );
}

/**
 * generates Java code with using httpUrlConnection
 * @param {*} options 
 */
export function httpUrlConnectionCode(options) {

    return (
        `import java.io.DataOutputStream;\n` +
        `import java.io.BufferedReader;\n` +
        `import java.io.InputStreamReader;\n` +
        `import java.net.URL;\n` +
        `import java.net.HttpURLConnection;\n` +
        `\n` +
        `public class App {\n` +
        `\tpublic static void main(String[] args) {\n` +
        `\t\ttry {\n` +
        `\t\t\tURL url = new URL("${options.fetchUrl}");\n` +
        `\t\t\tHttpURLConnection connection = (HttpURLConnection) url.openConnection();\n` +
        `\t\t\tconnection.setRequestMethod("${options.method}");${computedHeaderStr(options)}${computedHttpBodyStr(options)}\n` +
        `\t\t\tBufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));\n` +
        `\t\t\tString inputLine;\n` +
        `\t\t\tStringBuffer response = new StringBuffer();\n` +
        `\t\t\twhile ((inputLine = in.readLine()) != null) {\n` +
        `\t\t\t\tresponse.append(inputLine);\n` +
        `\t\t\t}\n` +
        `\t\t\tin.close();\n` +
        `\t\t\tSystem.out.println(response.toString());\n` +
        `\t\t} catch (Exception e) {\n` +
        `\t\t\t// TODO: handle exception\n` +
        `\t\t}\n` +
        `\t}\n` +
        `}\n`
    );
}