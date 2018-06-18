<template>
  <div>
    <md-field class="fetch-url-input">
      <label>url</label>
      <md-input v-model="formData.fetchUrl"></md-input>
    </md-field>
    <br/>
    <md-field>
      <label for="method">method</label>
      <md-select v-model="formData.method" name="method" id="method" class="http-method-input">
        <md-option :value='httpMethod' :key="i" v-for="(httpMethod, i) in httpMethods">{{httpMethod}}</md-option>
      </md-select>
    </md-field>
    <br/>
    <md-field>
      <label>body</label>
      <md-textarea v-model="formData.requestBody" class="request-body"></md-textarea>
    </md-field>
  </div>
</template>

<script>
export default {
  props: {
    formData: {
      type: Object,
      default: function () {
        return {
          method: ''
        };
      }
    }
  },
  data: function () {
    return {
      httpMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
    };
  }
};
</script>

<style scoped>
.request-body {
  font-family: monospace;
  font-size: 14px;
}
</style>


