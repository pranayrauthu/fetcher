function processResponseHeaders(headers) {
    const processHeaders = Object.entries(
        headers
    ).map(([key, value]) => `${key}: ${value}`)
        .join('\n');
    return processHeaders;
}

function processReponseBody(body) {
    if (typeof body === "object") {
        return JSON.stringify(body, null, 2);
    }
    return body;
}

function processResponse(resp) {
    const processedResponse = [
        `${resp.status}`,
        processResponseHeaders(resp.headers),
        ``,
        processReponseBody(resp.data)
    ].join('\n');
    return processedResponse;
}

export function fetchResponse({ getters, dispatch }) {
    const {
        method,
        fetchUrl: url,
        requestHeaders: headers
    } = getters.inputData;
    dispatch('setResponse', 'Loading...');
    fetch('https://fetcher-api.azurewebsites.net/api/process', {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            method,
            url,
            headers
        })
    })
        .then(resp => resp.json())
        .then(resp => {
            dispatch('setResponse', processResponse(resp));
        })
        .catch(err => {
            dispatch('setResponse', err.message);
        });
}

export default fetchResponse;