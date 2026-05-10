<template>
  <div class="http-tab">
    <div class="text-h6 mb-2">HTTP</div>
    <v-card variant="outlined" class="pa-4">
      <codemirror
        v-model="outputCodeStr"
        :extensions="extensions"
        disabled
        :style="{ height: '400px' }"
      />
      <v-btn
        color="primary"
        class="mt-4"
        @click="$emit('copy-output-code', outputCodeStr)"
      >
        copy
      </v-btn>
    </v-card>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { StreamLanguage } from '@codemirror/language'
import { http } from '@codemirror/legacy-modes/mode/http'
import { useAppStore } from '../store'

const store = useAppStore()
const extensions = [StreamLanguage.define(http)]

const computedHeadersStr = computed(() => {
  const headers = Object.keys(store.inputData.requestHeaders)
  if (headers.length > 0) {
    let returnStr = ''
    headers.forEach(h => {
      returnStr += `${h}: ${store.inputData.requestHeaders[h]}\n`
    })
    return returnStr
  }
  return ''
})

const outputCodeStr = computed(() => {
  return `${store.inputData.method} ${store.inputData.fetchUrl} HTTP/1.1\n${computedHeadersStr.value}\n\n${store.inputData.requestBody}`
})

defineEmits(['copy-output-code'])
</script>

<style lang="scss" scoped>
.output-code {
  padding: 10px;
}
</style>
