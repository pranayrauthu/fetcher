<template>
    <div class="csharp-tab">
        <div class="md-title">C#</div>
        <md-content class="md-elevation-1">
            <pre class="output-code">
                <code contenteditable="true" ref="outputCodeNode">
                    {{ outputCode }}
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
        outputCode: function () {
            return `
                using System;
                using System.Net.Http;

                namespace Fetcher
                {
                    class Program
                    {
                        static void Main(string[] args)
                        {
                            using (var httpClient = new HttpClient())
                            {
                                ${
                                (Object.keys(this.inputData.requestHeaders).map(h => {
                                    return `httpClient.DefaultRequestHeaders.Add("${h}", "${this.inputData.requestHeaders[h]}");
                                `;
                                }) || [''])
                                    .join('')
                                }
                                var response = httpClient.${this.computedHttpMethodStr}StringAsync(new Uri("${this.inputData.fetchUrl}")${this.computedHttpBodyStr}).Result;
                                // your code
                            }
                        }
                    }
                }
            `
        }
    }
};
</script>

<style scoped>
code {
  white-space: unset;
  word-wrap: unset;
}
</style>

