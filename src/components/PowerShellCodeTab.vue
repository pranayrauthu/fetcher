<template>
  <div class="powershell-tab">
    <div class="text-h6 mb-2">PowerShell</div>
    <div class="d-flex flex-wrap mb-2">
      <v-checkbox
        v-model="copyToClip"
        label="copy to clip"
        hide-details
        density="compact"
        title="copy the output to clipboard"
        class="mr-4"
      />
      <v-checkbox
        v-model="expandContent"
        label="expand content"
        hide-details
        density="compact"
        title="output only expanded content"
      />
    </div>
    <v-card variant="outlined" class="pa-4">
      <codemirror
        v-model="computedPowerShellCode"
        :extensions="extensions"
        disabled
        :style="{ height: '400px' }"
      />
      <v-btn
        color="primary"
        class="mt-4"
        @click="$emit('copy-output-code', computedPowerShellCode)"
      >
        copy
      </v-btn>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { StreamLanguage } from '@codemirror/language'
import { shell } from '@codemirror/legacy-modes/mode/shell'
import { useAppStore } from '../store'

const store = useAppStore()
const extensions = [StreamLanguage.define(shell)]

const copyToClip = ref(false)
const expandContent = ref(false)

const computedBodyStr = computed(() => {
  const { requestBody } = store.inputData
  return requestBody ? ` -Body '${requestBody}' ` : ''
})

const computedHeaderStr = computed(() => {
  const headers = Object.keys(store.inputData.requestHeaders)
  if (headers.length > 0) {
    return (
      headers.reduce(
        (accumulator, currentValue) =>
          accumulator + `"${currentValue}"="${store.inputData.requestHeaders[currentValue]}";`,
        '-Headers @{'
      ) + '}'
    )
  }
  return ''
})

const computedExpandContentStr = computed(() => {
  return expandContent.value ? ' | Select-Object -Expand Content' : ''
})

const computedCopyToClipStr = computed(() => {
  return copyToClip.value ? ' | clip' : ''
})

const computedPowerShellCode = computed(() => {
  return (
    `Invoke-WebRequest -Uri '${store.inputData.fetchUrl}' ` +
    `-Method '${store.inputData.method}'${computedHeaderStr.value}${computedBodyStr.value}` +
    `${computedExpandContentStr.value}` +
    `${computedCopyToClipStr.value}`
  )
})

defineEmits(['copy-output-code'])
</script>

<style lang="scss" scoped>
.output-code {
  padding: 10px;
}
</style>
