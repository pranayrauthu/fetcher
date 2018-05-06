<template>
    <div class="fetch-tab">
        <h4>JavaScript - fetch</h4>
        <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="process-json">
            <input type="checkbox" id="process-json" class="mdl-checkbox__input" v-model="processJSON">
            <span class="mdl-checkbox__label">process JSON</span>
        </label>
        <div>
            <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="add-mode">
                <input type="checkbox" id="add-mode" class="mdl-checkbox__input" v-model="enableMode">
                <span class="mdl-checkbox__label">add mode</span>
            </label>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <select class="mdl-textfield__input" name="method" v-model="selectedMode">
                    <option :value='mode' :key="i" v-for="(mode, i) in modeOptions">{{mode}}</option>
                </select>
            </div>
        </div>
        <pre>
            <code class="language-javascript">
                fetch('{{ inputData.fetchUrl }}', {{optionsJSONStr}}){{ processJSONStr }}.then(function(resp){
                    console.log(resp);
                });
            </code>
        </pre>
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
  }
};
</script>
