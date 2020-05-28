<template>
    <div class="java-tab">
        <div class="md-title">Java</div>
        <md-field>
            <label>client type</label>
            <md-select name="method" v-model="clientType">
                <md-option :value='value' :key="i" v-for="({value, label}, i) in clientTypeOptions">{{label}}</md-option>
            </md-select>
        </md-field>
        <md-content class="md-elevation-1">
            <codemirror :value="outputCode" :options="editorOptions"></codemirror>
            <md-button class="md-primary" @click="$emit('copy-output-code', outputCode)">copy</md-button>
        </md-content>
    </div>
</template>

<script>

require('codemirror/mode/clike/clike');
import { mapGetters } from 'vuex';
import { httpUrlConnectionCode } from './http-url-con-output-code';
import { restTemplateCode } from './rest-template-output-code';

export default {
    name: 'JavaCodeTab',
    data: function () {
        return {
            clientType: 'http-url-con',
            clientTypeOptions: [
                {
                    value: 'http-url-con',
                    label: 'HttpURLConnection'
                },
                {
                    value: 'rest-template',
                    label: 'Rest Template'
                }
            ],
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
        outputCode: function () {
            const options = {
                ...this.inputData
            };
            if(this.clientType === 'rest-template'){
                return restTemplateCode(options);
            }
            return httpUrlConnectionCode(options);
        }
    }
};
</script>

