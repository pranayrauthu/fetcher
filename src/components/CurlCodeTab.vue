<template>
    <div class="curl-tab">
        <div class="md-title">cURL</div>
        <md-checkbox v-model="isInsecure">insecure</md-checkbox>
        <md-content class="md-elevation-1">
            <codemirror :value="computedCurlCode" :options="editorOptions"></codemirror>
            <md-button class="md-primary" @click="$emit('copy-output-code', computedCurlCode)">copy</md-button>
        </md-content>
    </div>
</template>

<script>

require('codemirror/mode/shell/shell');

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
                    accumulator + `-H '${currentValue}: ${this.inputData.requestHeaders[currentValue]}' `
                ), ' ');
            }
            return ' ';
        },
        computedRequestBodyStr: function () {
            const { requestBody } = this.inputData;
            return (requestBody) ? (`-d '${requestBody}' `) : ('');
        },
        computedInsecureStr: function () {
            return (this.isInsecure) ? (' --insecure ') : (' ');
        },
        computedCurlCode: function () {
            return `curl${this.computedInsecureStr}-X${this.inputData.method}${this.computedHeadersStr}${this.computedRequestBodyStr}'${this.inputData.fetchUrl}'`;
        }
    }
};
</script>

<style lang="scss" scoped>
.output-code {
  padding: 10px;
}
</style>


