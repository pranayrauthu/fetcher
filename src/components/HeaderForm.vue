<template>
    <div>
        <div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input list="header-keys" class="mdl-textfield__input" type="text" id="headerKey" v-model="formData.headerKey">
                <label class="mdl-textfield__label" for="headerKey">header key</label>
                <datalist id="header-keys">
                    <option :value="headerKey" v-for="(headerKey, index) in Object.keys(httpHeaders)" :key="index"></option>
                </datalist>
            </div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input list="header-values" class="mdl-textfield__input" type="text" id="headerValue" v-model="formData.headerValue" />
                <label class="mdl-textfield__label" for="headerValue">header value</label>
                <datalist id="header-values">
                    <option :value="headerVal" v-for="(headerVal, index) in httpHeaders[formData.headerKey]" :key="index"></option>
                </datalist>
            </div>
            <button @click="$emit('add-header', formData)" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">ADD</button>
        </div>
        <div>
            <ul @click="$emit('delete-header', $event.target.dataset.header)">
                <li v-for="(value, key) in requestHeaders" :key="key">
                    '{{key}}': '{{value}}'
                    <button :data-header='key' class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">delete</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
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
    }
}
</script>
