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
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'ResponseTab',
    data: function () {
        return {
            editorOptions: {
                mode: 'message/http',
                tabSize: 2,
                lineWrapping: true,
                lineNumbers: true,
                autoRefresh: true
            },
        };
    },
    computed: {
        ...mapGetters(['inputData','response'])
    },
    methods: {
        ...mapActions(['fetchResponse'])
    }
};
</script>

<style lang="scss" scoped>
.output-code {
  padding: 10px;
}
</style>


