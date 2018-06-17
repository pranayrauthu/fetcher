<template>
    <div class="csharp-tab">
        <div class="md-title">C#</div>
        <md-content class="md-elevation-1">
            <codemirror :value="outputCode" :options="editorOptions"></codemirror>
            <md-button class="md-primary" @click="$emit('copy-output-code', outputCode)">copy</md-button>
        </md-content>
    </div>
</template>

<script>

require('codemirror/mode/clike/clike');

export default {
    name: 'CsharpCodeTab',
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
                mode: 'text/x-csharp',
                tabSize: 2,
                lineWrapping: true,
                lineNumbers: true,
                autoRefresh: true
            }
        }
    },
    computed: {
        computedHttpBodyStr: function () {
            const { method, requestBody } = this.inputData;
            if(method === 'GET'){
                return '';
            }
            return `, new StringContent("${requestBody}")`;
        },
        computedHttpMethodStr: function () {
            const { method } = this.inputData;
            return method.substr(0, 1) + method.substr(1).toLowerCase()
        },
        computedHeaderStr: function () {
            return (
                Object.keys(this.inputData.requestHeaders)
                .map(h => {
                    return `httpClient.DefaultRequestHeaders.Add("${h}", "${this.inputData.requestHeaders[h]}");`;
                }) || ['']).join('\n\t\t\t\t');
        },
        outputCode: function () {
            return `using System;\nusing System.Net.Http;\n\nnamespace Fetcher\n{\n\tclass Program\n\t{\n\t\tstatic void Main(string[] args)\n\t\t{\n\t\t\tusing (var httpClient = new HttpClient())\n\t\t\t{\n\t\t\t\t${this.computedHeaderStr}\n\t\t\t\tvar response = httpClient.${this.computedHttpMethodStr}StringAsync(new Uri("${this.inputData.fetchUrl}")${this.computedHttpBodyStr}).Result;\n\t\t\t\t// your code\n\n\t\t\t}\n\t\t}\n\t}\n}`;
        }
    }
};
</script>

