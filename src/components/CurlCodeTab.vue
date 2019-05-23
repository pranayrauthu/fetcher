<template>
    <div class="curl-tab">
        <div class="md-title">cURL</div>
        <md-checkbox
            v-model="isInsecure"
            class="insecure-toggle"
            title="Allow insecure server connections when using SSL"
        >insecure</md-checkbox>
        <md-checkbox 
            v-model="copyToClip"
            class="copy-to-clip-toggle"
            title="copy response to clipboard (might not work in few systems)"
        >copy to clip</md-checkbox>
        <md-checkbox
            v-model="dumpHeaders"
            class="dump-headers-toggle"
        >dump-headers</md-checkbox>
        <md-content class="md-elevation-1">
            <codemirror :value="computedCurlCode" :options="editorOptions"></codemirror>
            <md-button
                class="md-primary"
                @click="$emit('copy-output-code', computedCurlCode)"
            >copy</md-button>
        </md-content>
    </div>
</template>

<script>

require('codemirror/mode/shell/shell');
import get from 'lodash/get';

export default {
    name: 'CurlCodeTab',
    props: {
        inputData: {
            type: Object,
            default: function () {
                return {};
            }
        }
    },
    data: function () {
        return {
            isInsecure: false,
            copyToClip: false,
            dumpHeaders: false,
            editorOptions: {
                mode: 'text/x-sh',
                tabSize: 2,
                lineWrapping: true,
                lineNumbers: true,
                autoRefresh: true
            }
        };
    },
    computed: {
        computedHeadersStr: function () {
            const headers = Object.keys(this.inputData.requestHeaders);
            if (headers.length > 0) {
                return headers.reduce((accumulator, currentValue) => (
                    accumulator + `-H "${currentValue}: ${this.inputData.requestHeaders[currentValue]}" `
                ), ' ');
            }
            return ' ';
        },
        computedRequestBodyStr: function () {
            let { requestBody = '' } = this.inputData;
            requestBody = requestBody.replace(/"/g,`\\"`);
            return (requestBody) ? (`-d "${requestBody}" `) : ('');
        },
        computedInsecureStr: function () {
            return (this.isInsecure) ? ('--insecure ') : ('');
        },
        computedDumpHeaderStr: function () {
            return (this.dumpHeaders) ? ('--dump-header - ') : ('');
        },
        computedCopyToClipStr: function () {
            const platform = (get(window, 'navigator.platform') || '').toLowerCase();
            let copyToClip = ' | clip';
            if(platform.includes('mac')){
                copyToClip = ' | pbclip';
            }
            return (this.copyToClip) ? (copyToClip) : ('');
        },
        computedCurlCode: function () {
            return `curl ${this.computedInsecureStr}${this.computedDumpHeaderStr}-X${this.inputData.method}`+
            `${this.computedHeadersStr}${this.computedRequestBodyStr}"`+
            `${this.inputData.fetchUrl}"${ this.computedCopyToClipStr }`;
        }
    }
};
</script>

<style lang="scss" scoped>
.output-code {
  padding: 10px;
}
</style>


