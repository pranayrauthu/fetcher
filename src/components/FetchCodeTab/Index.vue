<template>
  <div class="fetch-tab pa-2">
    <h2 class="text-h6 mb-4">JavaScript - fetch</h2>
    
    <v-row dense align="center">
      <v-col cols="12" sm="4">
        <v-checkbox v-model="processJSON" label="process JSON" hide-details density="compact"></v-checkbox>
      </v-col>
      <v-col cols="12" sm="4">
        <v-checkbox v-model="useAsyncAwait" label="use async-await" hide-details density="compact"></v-checkbox>
      </v-col>
      <v-col cols="12" sm="4" class="d-flex align-center">
        <v-checkbox v-model="enableMode" label="add mode" hide-details density="compact" class="mr-2"></v-checkbox>
        <v-select
          v-model="selectedMode"
          :items="modeOptions"
          label="mode"
          variant="underlined"
          density="compact"
          hide-details
          :disabled="!enableMode"
        ></v-select>
      </v-col>
    </v-row>

    <v-sheet elevation="1" class="pa-0 overflow-hidden rounded mt-4">
      <codemirror
        v-model="fetchCodeStr"
        :extensions="extensions"
        :style="{ height: '400px' }"
        disabled
      />
      <v-divider></v-divider>
      <div class="pa-2 d-flex justify-end">
        <v-btn
          color="primary"
          variant="text"
          prepend-icon="mdi-content-copy"
          @click="$emit('copy-output-code', fetchCodeStr)"
        >
          copy
        </v-btn>
      </div>
    </v-sheet>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAppStore } from '../../store';
import { Codemirror } from 'vue-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { fetchCode, asyncAwaitCode } from './output-code';

const store = useAppStore();
const extensions = [javascript()];

const processJSON = ref(false);
const useAsyncAwait = ref(false);
const enableMode = ref(false);
const modeOptions = ["same-origin", "no-cors", "cors", "navigate"];
const selectedMode = ref("cors");

const fetchCodeStr = computed(() => {
  const options = {
    ...store.inputData,
    enableMode: enableMode.value,
    processJSON: processJSON.value,
    mode: selectedMode.value
  };
  if (useAsyncAwait.value) {
    return asyncAwaitCode(options);
  }
  return fetchCode(options);
});

defineEmits(['copy-output-code']);
</script>
