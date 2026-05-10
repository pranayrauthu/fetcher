<template>
  <div class="csharp-tab">
    <div class="text-h6 mb-2">C#</div>
    <v-card variant="outlined" class="pa-4">
      <codemirror
        v-model="outputCode"
        :extensions="extensions"
        disabled
        :style="{ height: '400px' }"
      />
      <v-btn
        color="primary"
        class="mt-4"
        @click="$emit('copy-output-code', outputCode)"
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
import { csharp } from '@codemirror/legacy-modes/mode/clike'
import { useAppStore } from '../store'

const store = useAppStore()
const extensions = [StreamLanguage.define(csharp)]

const computedHttpBodyStr = computed(() => {
  const { method, requestBody } = store.inputData
  if (method === 'GET') {
    return ''
  }
  return `, new StringContent("${requestBody}")`
})

const computedHttpMethodStr = computed(() => {
  const { method } = store.inputData
  return method.charAt(0).toUpperCase() + method.slice(1).toLowerCase()
})

const computedHeaderStr = computed(() => {
  const headers = store.inputData.requestHeaders
  const headerKeys = Object.keys(headers)
  if (headerKeys.length === 0) {
    return ''
  }
  return headerKeys
    .map(h => {
      return `httpClient.DefaultRequestHeaders.Add("${h}", "${headers[h]}");`
    })
    .join('\n\t\t\t\t')
})

const outputCode = computed(() => {
  return `using System;\nusing System.Net.Http;\n\nnamespace Fetcher\n{\n\tclass Program\n\t{\n\t\tstatic void Main(string[] args)\n\t\t{\n\t\t\tusing (var httpClient = new HttpClient())\n\t\t\t{\n\t\t\t\t${computedHeaderStr.value}\n\t\t\t\tvar response = httpClient.${computedHttpMethodStr.value}StringAsync(new Uri("${store.inputData.fetchUrl}")${computedHttpBodyStr.value}).Result;\n\t\t\t\t// your code\n\n\t\t\t}\n\t\t}\n\t}\n}`
})

defineEmits(['copy-output-code'])
</script>
