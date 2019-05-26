<template>
    <div class="response-tab">
        <div class="md-title">Response (beta)</div>
        <div>
            <md-button
                @click="fetchResponse"
                class="md-raised md-primary send-req-btn"
                :disabled="!inputData.fetchUrl"
            >SEND</md-button>
        </div>
        <md-content class="md-elevation-1">
            <codemirror
                :value="response"
                :options="editorOptions"
            ></codemirror>
            <md-button
                class="md-primary"
                @click="$emit('copy-output-code', response)"
            >copy</md-button>
        </md-content>
    </div>
</template>

<script>

require('codemirror/mode/http/http');
import get from 'lodash/get';

export default {
    name: 'ResponseTab',
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
            },
            response: 'click on send to see the response.'
        };
    },
    methods: {
        processResponseHeaders(headers){
            const processHeaders = Object.entries(
                headers
            ).map(([key, value]) => `${key}: ${value}`)
            .join('\n');
            return processHeaders;
        },
        processReponseBody(body){
            if(typeof body === "object"){
                return JSON.stringify(body, null, 2);
            }
            return body;
        },
        processResponse(resp){
            const processedResponse = [
                `${resp.status}`,
                this.processResponseHeaders(resp.headers),
                ``,
                this.processReponseBody(resp.data)
            ].join('\n');
            return processedResponse;
        },
        fetchResponse(){
            this.response = 'Loading...';
            fetch('https://fetcher-api.azurewebsites.net/api/process',{
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    method: this.inputData.method,
                    url: this.inputData.fetchUrl,
                    headers: this.inputData.requestHeaders
                })
            })
            .then(resp => resp.json())
            .then(resp => {
                this.response = this.processResponse(resp);
            })
            .catch(err => {
                this.response = err.message;
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.output-code {
  padding: 10px;
}
</style>


