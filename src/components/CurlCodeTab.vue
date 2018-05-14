<template>
    <div class="curl-tab">
        <div class="md-title">cURL</div>
        <md-checkbox v-model="isInsecure">insecure</md-checkbox>
        <md-content class="md-elevation-1">
            <pre class="output-code">
                <code contenteditable="true" ref="outputCodeNode">
                    curl{{computedInsecureStr}}-X{{ inputData.method }}{{computedHeadersStr}}{{ computedRequestBodyStr }}'{{ inputData.fetchUrl }}'
                </code>
            </pre>
            <md-button class="md-primary" @click="$emit('copy-output-code', $refs['outputCodeNode'])">copy</md-button>
        </md-content>
    </div>
</template>

<script>
export default {
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
            isInsecure: false
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
        }
    }
};
</script>

<style scoped>
.output-code {
  padding: 10px;
}
</style>


