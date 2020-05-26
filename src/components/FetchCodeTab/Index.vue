<template>
    <div class="fetch-tab">
        <div class="md-title">JavaScript - fetch</div>
        <md-checkbox v-model="processJSON">process JSON</md-checkbox>
        <md-checkbox v-model="useAsyncAwait">use async-await</md-checkbox>
        <span>
            <md-checkbox v-model="enableMode">add mode</md-checkbox>
            <md-field>
                <label>mode</label>
                <md-select name="method" v-model="selectedMode">
                    <md-option :value='mode' :key="i" v-for="(mode, i) in modeOptions">{{mode}}</md-option>
                </md-select>
            </md-field>
        </span>
        <md-content class="md-elevation-1">
            <codemirror :value="fetchCodeStr" :options="editorOptions"></codemirror>
            <md-button class="md-primary" @click="$emit('copy-output-code', fetchCodeStr)">copy</md-button>
        </md-content>
    </div>
</template>

<script>

require('codemirror/mode/javascript/javascript');
import { mapGetters } from 'vuex';

import { fetchCode, asyncAwaitCode } from './output-code';

export default {
    name: 'FetchCodeTab',
    data: function () {
        return {
            processJSON: false,
            useAsyncAwait: false,
            enableMode: false,
            modeOptions: ["same-origin", "no-cors", "cors", "navigate"],
            selectedMode: "cors",
            editorOptions: {
                mode: 'text/javascript',
                viewportMargin: Infinity,
                tabSize: 2,
                lineWrapping: true,
                lineNumbers: true,
                autoRefresh: true
            }
        };
    },
    computed: {
        ...mapGetters(['inputData']),
        fetchCodeStr: function () {
            const options = {
                ...this.inputData,
                enableMode: this.enableMode,
                processJSON: this.processJSON
            };
            if(this.useAsyncAwait){
                return asyncAwaitCode(options);
            }
            return fetchCode(options);
        }
    }
};
</script>

