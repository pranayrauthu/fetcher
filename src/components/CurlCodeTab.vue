<template>
    <div class="curl-tab">
        <div class="md-title">cURL</div>
        <md-checkbox v-model="isInsecure">insecure</md-checkbox>
        <md-content class="md-elevation-1">
            <pre class="output-code">
                <codemirror :value="computedCurlCode" :options="editorOptions"></codemirror>
            </pre>
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
                let returnStr = " ";
                headers.forEach(h => {
                    returnStr += `-H '${h}: ${
                        this.inputData.requestHeaders[h]
                        }' `;
                });
                return returnStr;
            }
            return " ";
        },
        computedRequestBodyStr: function () {
            let retStr = '';
            const { requestBody } = this.inputData
            if (requestBody && requestBody !== '') {
                retStr = `-d '${requestBody}' `;
            }
            return retStr;
        },
        computedInsecureStr: function () {
            if (this.isInsecure) {
                return " --insecure ";
            }
            return " ";
        },
        computedCurlCode: function () {
            return `curl${this.computedInsecureStr}-X${this.inputData.method}${this.computedHeadersStr}${this.computedRequestBodyStr}'${this.inputData.fetchUrl}'`;
        }
    }
};
</script>

<style scoped>
.output-code {
  padding: 10px;
}
</style>


