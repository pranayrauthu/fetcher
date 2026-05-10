import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { API_BASE } from '../constants/api-constant';
import router from '../router';

export const useAppStore = defineStore('app', () => {
  // State
  const inputData = ref({
    method: 'GET',
    fetchUrl: '',
    requestBody: '',
    requestHeaders: {}
  });
  const response = ref('click on send to see the response.');
  const snackBar = ref({
    visible: false,
    text: ''
  });

  // Getters (computed)
  const method = computed(() => inputData.value.method);
  const fetchUrl = computed(() => inputData.value.fetchUrl);
  const requestBody = computed(() => inputData.value.requestBody);
  const requestHeaders = computed(() => inputData.value.requestHeaders);
  const snackBarState = computed(() => snackBar.value.visible);
  const snackBarText = computed(() => snackBar.value.text);

  // Helper functions for response processing
  function processResponseHeaders(headers) {
    return Object.entries(headers)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
  }

  function processResponseBody(body) {
    if (typeof body === 'object') {
      return JSON.stringify(body, null, 2);
    }
    return body;
  }

  function processResponse(resp) {
    return [
      `${resp.status}`,
      processResponseHeaders(resp.headers),
      '',
      processResponseBody(resp.data)
    ].join('\n');
  }

  // Actions
  function setInputData(data) {
    inputData.value = data;
  }

  function addRequestHeader(headerKey, headerValue) {
    inputData.value.requestHeaders = {
      ...inputData.value.requestHeaders,
      [headerKey]: headerValue
    };
  }

  function deleteHeader(headerKey) {
    const { [headerKey]: _, ...rest } = inputData.value.requestHeaders;
    inputData.value.requestHeaders = rest;
  }

  function setMethod(m) {
    inputData.value.method = m;
  }

  function setFetchUrl(url) {
    inputData.value.fetchUrl = url;
  }

  function setRequestBody(body) {
    inputData.value.requestBody = body;
  }

  function setResponse(res) {
    response.value = res;
  }

  function showSnackBar(text) {
    snackBar.value = {
      visible: true,
      text
    };
  }

  function hideSnackBar() {
    snackBar.value.visible = false;
  }

  // Async Actions
  async function fetchResponseAction() {
    const { method, fetchUrl: url, requestHeaders: headers, requestBody: data } = inputData.value;
    setResponse('Loading...');
    try {
      const resp = await fetch(`${API_BASE}/process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method, url, data, headers })
      });
      const json = await resp.json();
      setResponse(processResponse(json));
    } catch (err) {
      setResponse(err.message);
    }
  }

  async function getSavedRequest() {
    const id = router.currentRoute.value.query.id;
    if (!id) return;

    try {
      const resp = await fetch(`${API_BASE}/getrequest/${id}`);
      const json = await resp.json();
      const { method, headers = [], data: requestBody, url: fetchUrl } = json;
      const requestHeaders = headers.reduce((acc, cur) => ({
        ...acc, [cur.key]: cur.value
      }), {});

      setInputData({ method, requestHeaders, requestBody, fetchUrl });
    } catch (err) {
      console.error(err);
    }
  }

  async function saveRequest() {
    const { method, fetchUrl: url, requestHeaders, requestBody: data } = inputData.value;
    const headers = Object.keys(requestHeaders).map(h => ({ key: h, value: requestHeaders[h] }));

    if (!url) {
      showSnackBar('url is empty');
      return;
    }

    showSnackBar('Saving...');

    try {
      const resp = await fetch(`${API_BASE}/saverequest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method, url, data, headers })
      });
      const json = await resp.json();
      const { _id: id } = json;
      router.push({ query: { id } });
      showSnackBar('permalink created. It expires in 24 hours');
    } catch (err) {
      showSnackBar('unable to save request. please try again');
      console.error(err);
    }
  }

  return {
    inputData,
    response,
    snackBar,
    method,
    fetchUrl,
    requestBody,
    requestHeaders,
    snackBarState,
    snackBarText,
    setInputData,
    addRequestHeader,
    deleteHeader,
    setMethod,
    setFetchUrl,
    setRequestBody,
    setResponse,
    showSnackBar,
    hideSnackBar,
    fetchResponse: fetchResponseAction,
    getSavedRequest,
    saveRequest
  };
});
