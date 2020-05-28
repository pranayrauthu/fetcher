


function generateHTTPHeaders(options) {
    const headers = Object.keys(options.requestHeaders);
    if (!(headers.length > 0)) {
        return '\n\t\tHttpHeaders headers = new HttpHeaders();\n';
    }
    let headerStr = '';
    headerStr += '\t\tHttpHeaders headers = new HttpHeaders();\n';
    headerStr += '\t\t';
    headerStr += (headers.map(h => {
        return `headers.add("${h}", "${options.requestHeaders[h]}");`;
    })).join('\n\t\t');
    return headerStr;
}

function generateEntityInstance(options) {
    if(options.requestBody){
        return (
            `\t\tString reqBody = ${JSON.stringify(options.requestBody)};\n` +
            `\t\tHttpEntity<String> entity = new HttpEntity<String>(reqBody, headers);`
        );
    }
    return (
        `\t\tHttpEntity entity = new HttpEntity(headers);`
    )
}


export function restTemplateCode(options) {
    
    return (
        `import org.springframework.http.HttpEntity;\n` +
        `import org.springframework.http.HttpHeaders;\n` +
        `import org.springframework.http.HttpMethod;\n` +
        `import org.springframework.http.ResponseEntity;\n` +
        `import org.springframework.web.client.RestTemplate;\n` +
        `\n` +
        `public class App {\n` +
        `\tpublic static void main(String[] args) {\n` +
        `\t\n` +
        `\t\tRestTemplate restTemplate = new RestTemplate();\n` +
        `\t\tString reqUrl = "${options.fetchUrl}";\n` +
        `${generateHTTPHeaders(options)}\n` +
        `${generateEntityInstance(options)}\n` +
        `\t\tResponseEntity<String> response = restTemplate.exchange(reqUrl, HttpMethod.${options.method}, entity, String.class);\n` +
        `\t\tSystem.out.println(response.getBody());\n` +
        `\n` +
        `\t};\n` +
        `};\n`
    );
}