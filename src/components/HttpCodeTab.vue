<template>
    <div class="http-tab">
        <div class="md-title">HTTP</div>
        <md-content class="md-elevation-1">
            <pre class="output-code">
                <code @click="selectCodeBlock" contenteditable="true">
                    {{ outputCodeStr }}
                </code>
          </pre>
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
    methods: {
        selectCodeBlock: function (event) {
            event.target.focus();
            const range = document.createRange();
            range.selectNodeContents(event.target);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
        }
    },
    computed: {
        outputCodeStr: function () {
            return `${this.inputData.method} ${this.inputData.fetchUrl} HTTP/1.1
            ${this.computedHeadersStr}

            ${this.inputData.requestBody}
            `;
        },
        computedHeadersStr: function () {
            const headers = Object.keys(this.inputData.requestHeaders);
            if (headers.length > 0) {
                let returnStr = "";
                headers.forEach(h => {
                    returnStr += `${h}: ${this.inputData.requestHeaders[h]}
                    `;
                });
                return returnStr;
            }
            return "";
        }
    }
}
</script>

<style scoped>
.output-code {
  padding: 10px;
}
</style>

