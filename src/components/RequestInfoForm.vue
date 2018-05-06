<template>
    <div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="url" id="fetchUrl" name="formData.fetchUrl" v-model="formData.fetchUrl">
            <label class="mdl-textfield__label" for="fetchUrl">url</label>
        </div>
        <br/>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <label class="mdl-textfield__label" for="method">method: </label>
            <select class="mdl-textfield__input" name="method" v-model="formData.method">
                <option :value='httpMethod' :key="i" v-for="(httpMethod, i) in httpMethods">{{httpMethod}}</option>
            </select>
        </div>
        <br/>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <textarea class="mdl-textfield__input" type="text" rows="10" id="requestBody" v-model.lazy="formData.requestBody"></textarea>
            <label class="mdl-textfield__label" for="requestBody">body</label>
        </div>
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

