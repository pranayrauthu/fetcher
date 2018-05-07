<template>
    <div class="fetch-tab">
        <div class="md-title">JavaScript - fetch</div>
        <md-checkbox v-model="processJSON">process JSON</md-checkbox>
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
            <pre class="output-code">
                <code @click="selectCodeBlock" contenteditable="true">
                    fetch('{{ inputData.fetchUrl }}', {{optionsJSONStr}}){{ processJSONStr }}.then(function(resp){
                        console.log(resp);
                    });
                </code>
            </pre>
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
    data: function () {
        return {
            processJSON: false,
            enableMode: false,
            modeOptions: ["same-origin", "no-cors", "cors", "navigate"],
            selectedMode: "cors"
        };
    },
    computed: {
        processJSONStr: function () {
            if (this.processJSON) {
                return `.then(function(resp){
                        return resp.json();
                    })`;
            }
            return "";
        },
        optionsJSONStr: function () {
            let retObj = {
                method: this.inputData.method,
                headers: this.inputData.requestHeaders
            };

            if (retObj.method !== "GET") {
                retObj.body = this.inputData.requestBody;
            }

            if (this.enableMode) {
                retObj.mode = this.selectedMode;
            }
            return retObj;
        }
    },
    methods: {
        selectCodeBlock: function (event) {
            event.target.focus();
            const range = document.createRange();
            range.selectNodeContents(event.target);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            if (navigator.clipboard) {
                navigator.clipboard.writeText(window.getSelection())
                    .then(() => {
                        // console.log('Text copied to clipboard');
                    })
                    .catch(err => {
                        // console.error('Could not copy text: ', err);
                    });
            }
        }
    }
};
</script>


<style scoped>
.output-code {
  padding: 10px;
  overflow: visible;
}
</style>
