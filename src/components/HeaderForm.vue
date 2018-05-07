<template>
    <div>
        <div>
            <md-autocomplete v-model="formData.headerKey" :md-options="Object.keys(httpHeaders)" md-dense :md-open-on-focus="false">
                <label>header key</label>
            </md-autocomplete>
            <md-autocomplete v-model="formData.headerValue" :md-options="httpHeaders[formData.headerKey] || []" md-dense :md-open-on-focus="false">
                <label>header value</label>
            </md-autocomplete>
            <md-button @click="$emit('add-header', formData)" class="md-raised md-primary">ADD</md-button>
        </div>
        <div>
            <md-list @click="$emit('delete-header', $event.target.dataset.header)">
                <md-list-item v-for="(value, key) in requestHeaders" :key="key">
                    '{{key}}': '{{value}}'
                    <md-button class="md-icon-button">
                        <md-icon class="fa fa-trash" :data-header='key'></md-icon>
                    </md-button>
                </md-list-item>
            </md-list>
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
                'Accept-Datetime': [''],
                'Access-Control-Request-Method': [''],
                'Access-Control-Request-Headers': [''],
                'Authorization': [''],
                'Cache-Control': [''],
                'Connection': ['keep-alive'],
                'Cookie': [''],
                'Content-Length': [''],
                'Content-MD5': [''],
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
                'Date': [''],
                'Expect': [''],
                'Forwarded': [''],
                'From': [''],
                'Host': [''],
                'If-Match': [''],
                'If-Modified-Since': [''],
                'If-None-Match': [''],
                'If-Range': [''],
                'If-Unmodified-Since': [''],
                'Max-Forwards': [''],
                'Origin': [''],
                'Pragma': ['no-cache'],
                'Proxy-Authorization': [''],
                'Range': [''],
                'Referer': [''],
                'TE': [''],
                'User-Agent': [''],
                'Upgrade': [''],
                'Via': [''],
                'Warning': ['']
            }
        }
    }
}
</script>
