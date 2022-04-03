<template>
    <div class="powershell-tab">
        <div class="md-title">PowerShell</div>
        <md-checkbox 
            v-model="copyToClip"
            class="copy-to-clip-toggle"
            title="copy the output to clipboard"
        >copy to clip</md-checkbox>
        <md-checkbox 
            v-model="expandContent"
            class="expand-content-toggle"
            title="output only expanded content"
        >expand content</md-checkbox>
        <md-content class="md-elevation-1">
            <codemirror :value="computedPowerShellCode" :options="editorOptions"></codemirror>
            <v-btn class="md-primary" @click="$emit('copy-output-code', computedPowerShellCode)">copy</v-btn>
        </md-content>
    </div>
</template>

<script>

require('codemirror/mode/powershell/powershell');
import { mapGetters } from 'vuex';

export default {
    name: 'PowerShellCodeTab',
    data: function () {
        return {
            copyToClip: false,
            expandContent: false,
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
        ...mapGetters(['inputData']),
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
        computedExpandContentStr: function () {
            const expandContent = this.expandContent ? ' | Select-Object -Expand Content' : '';
            return expandContent;
        },
        computedCopyToClipStr: function () {
            const copyToClip = this.copyToClip ? ' | clip' : '';
            return copyToClip;
        },
        computedPowerShellCode: function () {
            return (`Invoke-WebRequest -Uri '${this.inputData.fetchUrl}' ` +
            `-Method '${this.inputData.method}'${this.computedHeaderStr}${this.computedBodyStr}` +
            `${this.computedExpandContentStr}` +
            `${this.computedCopyToClipStr}`);
        }
    }
};
</script>

<style lang="scss" scoped>
.output-code {
  padding: 10px;
}
</style>


