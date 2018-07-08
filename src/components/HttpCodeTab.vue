<template>
    <div class="http-tab">
        <div class="md-title">HTTP</div>
        <md-content class="md-elevation-1">
            <codemirror :value="outputCodeStr" :options="editorOptions"></codemirror>
            <md-button class="md-primary" @click="$emit('copy-output-code', outputCodeStr)">copy</md-button>
        </md-content>
    </div>
</template>


<script>

require('codemirror/mode/http/http');

export default {
    name: 'HttpCodeTab',
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
            editorOptions: {
                mode: 'message/http',
                tabSize: 2,
                lineWrapping: true,
                lineNumbers: true,
                autoRefresh: true
            }
        }
    },
    computed: {
        outputCodeStr: function () {
            return `${this.inputData.method} ${this.inputData.fetchUrl} HTTP/1.1\n${this.computedHeadersStr}\n\n${this.inputData.requestBody}`;
        },
        computedHeadersStr: function () {
            const headers = Object.keys(this.inputData.requestHeaders);
            if (headers.length > 0) {
                let returnStr = "";
                headers.forEach(h => {
                    returnStr += `${h}: ${this.inputData.requestHeaders[h]}\n`;
                });
                return returnStr;
            }
            return "";
        }
    }
}
</script>

<style lang="scss" scoped>
.output-code {
  padding: 10px;
}
</style>

