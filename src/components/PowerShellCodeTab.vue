<template>
    <div class="powershell-tab">
        <div class="md-title">PowerShell</div>
        <md-content class="md-elevation-1">
            <codemirror :value="computedPowerShellCode" :options="editorOptions"></codemirror>
            <md-button class="md-primary" @click="$emit('copy-output-code', computedPowerShellCode)">copy</md-button>
        </md-content>
    </div>
</template>

<script>

require('codemirror/mode/powershell/powershell');

export default {
    name: 'PowerShellCodeTab',
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
                mode: 'application/x-powershell',
                tabSize: 2,
                lineWrapping: true,
                lineNumbers: true,
                autoRefresh: true
            }
        };
    },
    computed: {
        computedBodyStr: function () {
            const { requestBody } = this.inputData;
            return (requestBody) ? (` -Body '${requestBody}' `) : ('');
        },
        computedHeaderStr: function () {
            const headers = Object.keys(this.inputData.requestHeaders);
            if (headers.length > 0) {
                return headers.reduce((accumulator, currentValue) => (
                    accumulator + `"${currentValue}"="${this.inputData.requestHeaders[currentValue]}";`
                ), '-Headers @{')+'}';
            }
            return '';
        },
        computedPowerShellCode: function () {
            return `Invoke-WebRequest -Uri '${this.inputData.fetchUrl}' -Method '${this.inputData.method}'${this.computedHeaderStr}${this.computedBodyStr}`;
        }
    }
};
</script>

<style scoped>
.output-code {
  padding: 10px;
}
</style>


