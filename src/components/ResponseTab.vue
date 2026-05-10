<template>
  <div class="response-tab">
    <div class="d-flex align-center justify-space-between mb-4">
      <h2 class="text-h6">Response (beta)</h2>
      <v-btn
        @click="store.fetchResponse"
        color="primary"
        :disabled="!store.fetchUrl"
      >
        SEND
      </v-btn>
    </div>
    
    <v-sheet elevation="1" class="pa-0 overflow-hidden rounded">
      <codemirror
        v-model="store.response"
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
          @click="$emit('copy-output-code', store.response)"
        >
          copy
        </v-btn>
      </div>
    </v-sheet>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAppStore } from '../store';
import { Codemirror } from 'vue-codemirror';
import { StreamLanguage } from '@codemirror/language';
import { http } from '@codemirror/legacy-modes/mode/http';

const store = useAppStore();
const extensions = [StreamLanguage.define(http)];

defineEmits(['copy-output-code']);
</script>

<style lang="scss" scoped>
.response-tab {
  padding: 8px;
}
</style>
