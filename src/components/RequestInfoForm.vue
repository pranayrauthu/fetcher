<template>
  <div>
    <md-field class="fetch-url-input">
      <label>url</label>
      <md-input v-model="fetchUrl"></md-input>
    </md-field>
    <br/>
    <md-field>
      <label for="method">method</label>
      <md-select v-model="method" name="method" id="method" class="http-method-input">
        <md-option
          :value='httpMethod'
          :key="i" v-for="(httpMethod, i) in httpMethods"
        >{{httpMethod}}</md-option>
      </md-select>
    </md-field>
    <br/>
    <md-field>
      <label>body</label>
      <md-textarea v-model="requestBody" class="request-body"></md-textarea>
    </md-field>
  </div>
</template>

<script>
import {httpMethods} from './../enums/http-methods';

export default {
  computed:{
    fetchUrl: {
      get: function () {
        return this.$store.getters.fetchUrl;
      },
      set: function (value) {
        this.$store.commit('setFetchUrl', value);
      }
    },
    method: {
      get: function () {
        return this.$store.getters.method;
      },
      set: function (value) {
        this.$store.commit('setMethod', value);
      }
    },
    requestBody: {
      get: function () {
        return this.$store.getters.requestBody;
      },
      set: function (value) {
        this.$store.commit('setRequestBody', value);
      }
    }
  },
  data: function () {
    return {
      httpMethods: Object.values(httpMethods)
    };
  }
};
</script>

<style lang="scss" scoped>
.request-body {
  font-family: monospace;
  font-size: 14px;
}
</style>


