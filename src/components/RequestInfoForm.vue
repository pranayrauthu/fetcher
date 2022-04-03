<template>
  <v-container fluid>
    <v-text-field
      label="url"
      v-model="fetchUrl"
    ></v-text-field>
    <br />
    <v-select solo :items="httpMethods" label="method" v-model="method">
    </v-select>
    <br />
    <v-textarea solo label="body" v-model="requestBody" class="request-body"></v-textarea>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import router from './../router';
import { httpMethods } from './../enums/http-methods';

export default {
  computed: {
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
  },
  methods: {
    ...mapActions(['getSavedRequest'])
  },
  mounted() {
    router.onReady(() => this.getSavedRequest());
  }
};
</script>

<style lang="scss" scoped>
.request-body {
  font-family: monospace;
  font-size: 14px;
}
</style>


