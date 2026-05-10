<template>
  <div class="java-tab">
    <div class="text-h6 mb-2">Java</div>
    <v-select
      v-model="clientType"
      :items="clientTypeOptions"
      item-title="label"
      item-value="value"
      label="client type"
      variant="outlined"
      density="compact"
    />
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
import { ref, computed } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { java } from '@codemirror/lang-java'
import { useAppStore } from '../../store'
import { httpUrlConnectionCode } from './http-url-con-output-code'
import { restTemplateCode } from './rest-template-output-code'

const store = useAppStore()
const extensions = [java()]

const clientType = ref('http-url-con')
const clientTypeOptions = [
  {
    value: 'http-url-con',
    label: 'HttpURLConnection'
  },
  {
    value: 'rest-template',
    label: 'Rest Template'
  }
]

const outputCode = computed(() => {
  const options = {
    ...store.inputData
  }
  if (clientType.value === 'rest-template') {
    return restTemplateCode(options)
  }
  return httpUrlConnectionCode(options)
})

defineEmits(['copy-output-code'])
</script>
