<template>
    <div class="java-tab">
        <div class="md-title">Java</div>
        <md-content class="md-elevation-1">
            <codemirror :value="outputCode" :options="editorOptions"></codemirror>
            <md-button class="md-primary" @click="$emit('copy-output-code', outputCode)">copy</md-button>
        </md-content>
    </div>
</template>

<script>

require('codemirror/mode/clike/clike');
import { mapGetters } from 'vuex';

export default {
    name: 'JavaCodeTab',
    data: function () {
        return {
            editorOptions: {
                mode: 'text/x-java',
                tabSize: 2,
                lineWrapping: true,
                lineNumbers: true,
                autoRefresh: true
            }
        }
    },
    computed: {
        ...mapGetters(['inputData']),
        computedHttpBodyStr: function () {
            const { method, requestBody } = this.inputData;
            if (method === 'GET' || !requestBody) {
                return '';
            }
            return `\n\t\t\tString requestBody = ${JSON.stringify(requestBody)};\n\t\t\tconnection.setDoOutput(true);\n\t\t\tDataOutputStream wr = new DataOutputStream(connection.getOutputStream());\n\t\t\twr.writeBytes(requestBody);\n\t\t\twr.flush();\n\t\t\twr.close();`;
        },
        computedHeaderStr: function () {
            const headers = Object.keys(this.inputData.requestHeaders);
            if (!(headers.length > 0)) {
                return '';
            }
            let headerStr = '\n\t\t\t';
            headerStr += (headers.map(h => {
                return `connection.setRequestProperty("${h}", "${this.inputData.requestHeaders[h]}");`;
            })).join('\n\t\t\t');
            return headerStr;
        },
        outputCode: function () {
            return `import java.io.DataOutputStream;\nimport java.io.BufferedReader;\nimport java.io.InputStreamReader;\nimport java.net.URL;\nimport java.net.HttpURLConnection;\n\npublic class Main {\n\tpublic static void main(String[] args) {\n\t\ttry {\n\t\t\tURL url = new URL("${this.inputData.fetchUrl}");\n\t\t\tHttpURLConnection connection = (HttpURLConnection) url.openConnection();\n\t\t\tconnection.setRequestMethod("${this.inputData.method}");${this.computedHeaderStr}${this.computedHttpBodyStr}\n\t\t\tBufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));\n\t\t\tString inputLine;\n\t\t\tStringBuffer response = new StringBuffer();\n\t\t\twhile ((inputLine = in.readLine()) != null) {\n\t\t\t\tresponse.append(inputLine);\n\t\t\t}\n\t\t\tin.close();\n\t\t\tSystem.out.println(response.toString());\n\t\t} catch (Exception e) {\n\t\t\t// TODO: handle exception\n\t\t}\n\t}\n}`;
        }
    }
};
</script>

