

function optionJSONStr(options) {
    let retObj = {
        method: options.method,
        headers: options.requestHeaders
    };

    if (retObj.method !== "GET") {
        retObj.body = options.requestBody;
    }

    if (options.enableMode) {
        retObj.mode = options.selectedMode;
    }
    return JSON.stringify(retObj, null, 2);
}

function processJSONStr(options) {
    if (options.processJSON) {
        return `.then(function(resp){\n\treturn resp.json();\n})`;
    }
    return "";
}


/**
 * generates output code for fetch api
 * @param {*} options 
 */
export function fetchCode(options) {
    return (
        `fetch('${options.fetchUrl}', ` +
        `${optionJSONStr(options)})${processJSONStr(options)}` +
        `.then(function(resp){\n\tconsole.log(resp);\n});`
    );
}

/**
 * generates code for async await
 * @param {*} options 
 */
export function asyncAwaitCode(options) {
    if(options.processJSON){
        return `const resp = await (await fetch('${options.fetchUrl}', ${optionJSONStr(options)})).json();`;
    }
    return `const resp = await fetch('${options.fetchUrl}', ${optionJSONStr(options)});`;
}
