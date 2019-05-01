<template>
    <div class="response-tab">
        <div class="md-title">Response</div>
        <div>
            <md-button @click="fetchResponse" class="md-raised md-primary add-header-btn">SEND</md-button>
        </div>
        <md-content class="md-elevation-1">
            <codemirror :value="response" :options="editorOptions"></codemirror>
            <md-button class="md-primary" @click="$emit('copy-output-code', response)">copy</md-button>
        </md-content>
    </div>
</template>

<script>

require('codemirror/mode/http/http');
import get from 'lodash/get';
import { setTimeout } from 'timers';

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
        fetchResponse(){
            this.response = 'Loading...';
            fetch('https://fetcher-api.azurewebsites.net/api/process',{
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    method: this.inputData.method,
                    url: this.inputData.fetchUrl
                })
            })
            .then(resp => resp.json())
            .then(resp => {
                this.response = JSON.stringify(resp);
            })
            .catch(err => {
                this.response = err;
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


