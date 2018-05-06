Vue.component('fetch-code-tab', {
    props: {
        inputData: {
            type: Object,
            default: function () {
                return {};
            }
        },
    },
    data: function () {
        return {
            processJSON: false
        }
    },
    computed: {
        processJSONStr: function () {
            if (this.processJSON) {
                return `.then(function(resp){
                        return resp.json();
                    })`;
            }
            return '';
        }
    },
    template: `
        <div class="fetch-tab">
            <h2>JavaScript - fetch</h2>
            <input type="checkbox" v-model="processJSON"/><span> process JSON</span>
            <pre>
                <code>
                    fetch('{{ inputData.fetchUrl }}', {
                        method: '{{ inputData.method }}',
                        body: '{{ inputData.requestBody }}',
                        headers: {{ JSON.stringify(inputData.requestHeaders) }}
                    }){{ processJSONStr }}.then(function(resp){
                        console.log(resp);
                    });
                </code>
            </pre>
        </div>
    `
});
Vue.component('curl-code-tab', {
    props: {
        inputData: {
            type: Object,
            default: function () {
                return {};
            }
        },
    },
    data: function () {
        return {
            isInsecure: false
        }
    },
    computed: {
        computedHeadersStr: function () {
            const headers = Object.keys(this.inputData.requestHeaders);
            if(headers.length>0){
                let returnStr = ' ';
                headers.forEach(h => {
                    returnStr += `-H '${h}: ${this.inputData.requestHeaders[h]}' `;
                });
                return returnStr;
            }
            return ' ';
        },
        computedInsecureStr: function () {
            if(this.isInsecure){
                return ' --insecure ';
            }
            return ' ';
        }
    },
    template: `
        <div class="curl-tab">
            <h2>cURL</h2>
            <input type="checkbox" v-model="isInsecure"/><span>insecure</span>
            <pre>
                <code>
                    curl{{computedInsecureStr}}-X{{ inputData.method }}{{computedHeadersStr}}-d {{ inputData.requestBody }} '{{ inputData.fetchUrl }}'
                </code>
            </pre>
        </div>
    `
});
Vue.component('csharp-code-tab', {
    props: {
        inputData: {
            type: Object,
            default: function () {
                return {};
            }
        },
    },
    template: `
        <div class="csharp-tab">
            <h2>C#</h2>
            <pre>
                <code></code>
            </pre>
        </div>
    `
})
Vue.component('powershell-code-tab', {
    template: ``
});
Vue.component('http-code-tab', {
    template: ``
});

Vue.component('request-info-form', {
    props: {
        formData: {
            type: Object,
            default: function () {
                return {};
            }
        }
    },
    data: function () {
        return {
            httpMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
        }
    },
    template: `
        <div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input class="mdl-textfield__input" type="url" id="fetchUrl" name="formData.fetchUrl" v-model="formData.fetchUrl">
                <label class="mdl-textfield__label" for="fetchUrl">url</label>
            </div>
            <br/>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <label class="mdl-textfield__label" for="method">method: </label>
                <select class="mdl-textfield__input" name="method" v-model="formData.method">
                    <option :value='httpMethod' v-for="httpMethod in httpMethods">{{httpMethod}}</option>
                </select>
            </div>
            <br/>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <textarea class="mdl-textfield__input" type="text" rows= "10" id="requestBody" v-model.lazy="formData.requestBody"></textarea>
                <label class="mdl-textfield__label" for="requestBody">body</label>
            </div>
        </div>
    `
})

Vue.component('header-form', {
    props: {
        formData: {
            type: Object,
            default: function () {
                return {
                    headerKey: '',
                    headerValue: ''
                };
            }
        },
        requestHeaders: {
            type: Object,
            default: function () {
                return {};
            }
        }
    },
    data: function () {
        return {
            httpHeaders: {
                'Accept': [
                    'application/javascript',
                    'application/json',
                    'application/x-www-form-urlencoded',
                    'application/xml',
                    'application/zip',
                    'application/pdf',
                    'application/sql',
                    'application/graphql',
                    'application/ld+json',
                    'application/msword ',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    'application/vnd.ms-excel ',
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet ',
                    'application/vnd.ms-powerpoint ',
                    'application/vnd.openxmlformats-officedocument.presentationml.presentation ',
                    'application/vnd.oasis.opendocument.text ',
                    'audio/mpeg',
                    'audio/vorbis',
                    'multipart/form-data',
                    'text/css',
                    'text/html',
                    'text/csv',
                    'text/plain',
                    'image/png',
                    'image/jpeg',
                    'image/gif'
                ],
                'Accept-Charset': ['utf-8'],
                'Accept-Encoding': ['gzip'],
                'Accept-Language': ['en-US'],
                'Accept-Datetime': [],
                'Access-Control-Request-Method': [],
                'Access-Control-Request-Headers': [],
                'Authorization': [],
                'Cache-Control': [],
                'Connection': ['keep-alive'],
                'Cookie': [],
                'Content-Length': [],
                'Content-MD5': [],
                'Content-Type': [
                    'application/javascript',
                    'application/json',
                    'application/x-www-form-urlencoded',
                    'application/xml',
                    'application/zip',
                    'application/pdf',
                    'application/sql',
                    'application/graphql',
                    'application/ld+json',
                    'application/msword ',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    'application/vnd.ms-excel ',
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet ',
                    'application/vnd.ms-powerpoint ',
                    'application/vnd.openxmlformats-officedocument.presentationml.presentation ',
                    'application/vnd.oasis.opendocument.text ',
                    'audio/mpeg',
                    'audio/vorbis',
                    'multipart/form-data',
                    'text/css',
                    'text/html',
                    'text/csv',
                    'text/plain',
                    'image/png',
                    'image/jpeg',
                    'image/gif'
                ],
                'Date': [],
                'Expect': [],
                'Forwarded': [],
                'From': [],
                'Host': [],
                'If-Match': [],
                'If-Modified-Since': [],
                'If-None-Match': [],
                'If-Range': [],
                'If-Unmodified-Since': [],
                'Max-Forwards': [],
                'Origin': [],
                'Pragma': ['no-cache'],
                'Proxy-Authorization': [],
                'Range': [],
                'Referer': [],
                'TE': [],
                'User-Agent': [],
                'Upgrade': [],
                'Via': [],
                'Warning': []
            }
        }
    },
    template: `
        <div>
            <div>
                <input list="header-keys" type="text" placeholder="header key" v-model="formData.headerKey"/>
                <datalist id="header-keys">
                    <option :value="headerKey" v-for="(headerKey, index) in Object.keys(httpHeaders)"></option>
                </datalist>
                <input list="header-values" type="text" placeholder="header value" v-model="formData.headerValue"/>
                <datalist id="header-values">
                    <option :value="headerVal" v-for="(headerVal, index) in httpHeaders[formData.headerKey]"></option>
                </datalist>
                <button @click="$emit('add-header', formData)" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">ADD</button>
            </div>
            <div>
                <ul @click="$emit('delete-header', $event.target.dataset.header)">
                    <li v-for="(value, key) in requestHeaders">
                        '{{key}}': '{{value}}' <button :data-header='key' class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">delete</button>
                    </li>
                </ul>
            </div>
        </div>
    `
})

const app = new Vue({
    el: '#app',
    data: {
        appName: 'Fetcher',
        appStyle: [
            'header-color'
        ],
        inputData: {
            method: 'GET',
            fetchUrl: '',
            requestBody: '',
            requestHeaders: {}
        },
        addHeaderForm: {
            headerKey: '',
            headerValue: ''
        },
        yourCode: '// enter your code'
    },
    methods: {
        addRequestHeader: function ({ headerKey, headerValue }) {
            if (!headerKey || !headerValue || (headerKey === '' || headerValue === '') || this.inputData.requestHeaders[headerKey]) {
                return;
            }
            this.inputData.requestHeaders = Object.assign({}, this.inputData.requestHeaders, { [headerKey]: headerValue });
            this.addHeaderForm.headerKey = '';
            this.addHeaderForm.headerValue = '';
        },
        deleteHeader: function (header) {
            if (!header) {
                return;
            }
            if (this.inputData.requestHeaders[header]) {
                let newHeaders = Object.assign({}, this.inputData.requestHeaders);
                delete newHeaders[header];
                this.inputData.requestHeaders = newHeaders;
            }
        }
    },
    template: `
        <div>
            <h1>{{appName}}</h1>
            <div class="input-tab">
                <request-info-form
                    :formData="inputData"
                >
                </request-info-form>
                <div>
                    <header-form 
                        :formData="addHeaderForm" 
                        @add-header="addRequestHeader"
                        :requestHeaders="inputData.requestHeaders"
                        @delete-header="deleteHeader"
                    >
                    </header-form>                    
                </div>
            </div>
            <div class="output-tab">
                <fetch-code-tab :inputData="inputData"></fetch-code-tab>
                <curl-code-tab :inputData="inputData"></curl-code-tab>
                <csharp-code-tab :inputData="inputData"></csharp-code-tab>
            </div>
        </div>
    `
});