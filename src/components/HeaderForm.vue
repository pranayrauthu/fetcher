<template>
  <div class="pa-2 mt-4">
    <div class="d-flex align-center gap-2 mb-4">
      <v-combobox
        v-model="headerKey"
        :items="Object.keys(httpHeaders)"
        label="Header Key"
        variant="outlined"
        density="compact"
        hide-details
        class="flex-grow-1"
      ></v-combobox>
      <v-combobox
        v-model="headerValue"
        :items="httpHeaders[headerKey] || []"
        label="Value"
        variant="outlined"
        density="compact"
        hide-details
        class="flex-grow-1 mx-2"
      ></v-combobox>
      <v-btn
        :disabled="!headerKey"
        color="primary"
        @click="addHeader"
        height="40"
      >
        ADD
      </v-btn>
    </div>

    <v-list density="compact" class="bg-transparent">
      <v-list-item
        v-for="(value, key) in store.requestHeaders"
        :key="key"
        class="px-0"
      >
        <template v-slot:prepend>
          <v-icon icon="mdi-code-braces" size="small" class="mr-2"></v-icon>
        </template>
        
        <v-list-item-title class="header-item text-body-2">
          <strong>{{ key }}</strong>: {{ value }}
        </v-list-item-title>

        <template v-slot:append>
          <v-btn
            icon="mdi-close-circle"
            variant="text"
            color="error"
            size="small"
            @click="store.deleteHeader(key)"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAppStore } from '../store';

const store = useAppStore();

const headerKey = ref('');
const headerValue = ref('');
const httpHeaders = ref({});

onMounted(async () => {
  try {
    const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
    const staticJsonDataUrl = `${baseUrl}/data/http-headers.json`;
    const resp = await fetch(staticJsonDataUrl);
    httpHeaders.value = await resp.json();
  } catch (err) {
    console.error('Failed to load HTTP headers:', err);
  }
});

const addHeader = () => {
  store.addRequestHeader(headerKey.value, headerValue.value);
  headerKey.value = '';
  headerValue.value = '';
};
</script>

<style lang="scss" scoped>
.header-item {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
