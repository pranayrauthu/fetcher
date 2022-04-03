<template>
  <v-container class="fetch-tab">
    <div class="text-h6">JavaScript - fetch</div>
    <v-row>
      <v-col><v-checkbox
        v-model="processJSON"
        label="process JSON"
      ></v-checkbox></v-col>
      <v-col><v-checkbox
        v-model="useAsyncAwait"
        label="use async-await"
      ></v-checkbox></v-col>
      <v-col><v-checkbox
        v-model="enableMode"
        label="add mode"
      ></v-checkbox></v-col>
      <v-col><v-select
        name="method"
        v-model="selectedMode"
        label="mode"
        :items="modeOptions"
      ></v-select></v-col>
    </v-row>

    <v-col>
      <codemirror
        :value="fetchCodeStr"
        :options="editorOptions"
      ></codemirror>
      <v-btn @click="$emit('copy-output-code', fetchCodeStr)">copy</v-btn>
    </v-col>
  </v-container>
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
        selectedMode: this.selectedMode,
        processJSON: this.processJSON
      };
      if (this.useAsyncAwait) {
        return asyncAwaitCode(options);
      }
      return fetchCode(options);
    }
  }
};
</script>

