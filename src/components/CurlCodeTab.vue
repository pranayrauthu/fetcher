<template>
  <v-container class="curl-tab">
    <div class="text-h6">cURL</div>
    <v-row>
      <v-col>
        <v-checkbox
          v-model="isInsecure"
          class="insecure-toggle"
          title="Allow insecure server connections when using SSL"
          label="insecure"
        ></v-checkbox>
      </v-col>
      <v-col>
        <v-checkbox
          v-model="isVerbose"
          class="verbose-toggle"
          title="Output all the details of the request"
          label="verbose"
        ></v-checkbox>
      </v-col>
      <v-col>
        <v-checkbox
          v-model="copyToClip"
          class="copy-to-clip-toggle"
          title="copy response to clipboard (might not work in few systems)"
          label="copy to clip"
        ></v-checkbox>
      </v-col>
      <v-col>
        <v-checkbox
          v-model="dumpHeaders"
          class="dump-headers-toggle"
          label="dump-headers"
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-col>
      <codemirror
        :value="computedCurlCode"
        :options="editorOptions"
      ></codemirror>
      <v-btn @click="$emit('copy-output-code', computedCurlCode)">copy</v-btn>
    </v-col>
  </v-container>
</template>

<script>

require('codemirror/mode/shell/shell');
import get from 'lodash/get';
import { mapGetters } from 'vuex';

export default {
  name: 'CurlCodeTab',
  data: function () {
    return {
      isInsecure: false,
      isVerbose: false,
      copyToClip: false,
      dumpHeaders: false,
      editorOptions: {
        mode: 'text/x-sh',
        tabSize: 2,
        lineWrapping: true,
        lineNumbers: true,
        autoRefresh: true
      }
    };
  },
  computed: {
    ...mapGetters(['inputData']),
    computedHeadersStr: function () {
      const headers = Object.keys(this.inputData.requestHeaders);
      if (headers.length > 0) {
        return headers.reduce((accumulator, currentValue) => (
          accumulator + `-H "${currentValue}: ${this.inputData.requestHeaders[currentValue]}" `
        ), ' ');
      }
      return ' ';
    },
    computedRequestBodyStr: function () {
      let { requestBody = '' } = this.inputData;
      requestBody = requestBody.replace(/"/g, `\\"`);
      return (requestBody) ? (`-d "${requestBody}" `) : ('');
    },
    computedInsecureStr: function () {
      return (this.isInsecure) ? ('--insecure ') : ('');
    },
    computedVerboseStr: function () {
      return (this.isVerbose) ? ('--verbose ') : ('');
    },
    computedDumpHeaderStr: function () {
      return (this.dumpHeaders) ? ('--dump-header - ') : ('');
    },
    computedCopyToClipStr: function () {
      const platform = (get(window, 'navigator.platform') || '').toLowerCase();
      let copyToClip = ' | clip';
      if (platform.includes('mac')) {
        copyToClip = ' | pbclip';
      }
      return (this.copyToClip) ? (copyToClip) : ('');
    },
    computedCurlCode: function () {
      return `curl ${this.computedInsecureStr}${this.computedVerboseStr}${this.computedDumpHeaderStr}-X${this.inputData.method}` +
        `${this.computedHeadersStr}${this.computedRequestBodyStr}"` +
        `${this.inputData.fetchUrl}"${this.computedCopyToClipStr}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.output-code {
  padding: 10px;
}
</style>


