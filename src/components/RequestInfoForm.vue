<template>
  <div class="pa-2">
    <v-text-field
      v-model="store.inputData.fetchUrl"
      label="URL"
      variant="outlined"
      density="comfortable"
      placeholder="https://api.example.com"
      class="mb-4"
    ></v-text-field>

    <v-select
      v-model="store.inputData.method"
      :items="httpMethodsList"
      label="Method"
      variant="outlined"
      density="comfortable"
      class="mb-4"
    ></v-select>

    <v-textarea
      v-model="store.inputData.requestBody"
      label="Body"
      variant="outlined"
      density="comfortable"
      rows="5"
      class="request-body"
      auto-grow
    ></v-textarea>
    
    <v-btn
      color="primary"
      block
      class="mt-4"
      @click="store.fetchResponse"
    >
      Send Request
    </v-btn>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAppStore } from '../store';
import { httpMethods } from '../enums/http-methods';

const store = useAppStore();
const httpMethodsList = Object.values(httpMethods);

onMounted(() => {
  store.getSavedRequest();
});
</script>

<style lang="scss" scoped>
.request-body :deep(textarea) {
  font-family: "Source Code Pro", monospace;
  font-size: 14px;
}
</style>
