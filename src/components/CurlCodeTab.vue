<template>
  <div class="curl-tab">
    <div class="text-h6 mb-2">cURL</div>
    <div class="d-flex flex-wrap mb-2">
      <v-checkbox
        v-model="isInsecure"
        label="insecure"
        hide-details
        density="compact"
        title="Allow insecure server connections when using SSL"
        class="mr-4"
      />
      <v-checkbox
        v-model="isVerbose"
        label="verbose"
        hide-details
        density="compact"
        title="Output all the details of the request"
        class="mr-4"
      />
      <v-checkbox
        v-model="copyToClip"
        label="copy to clip"
        hide-details
        density="compact"
        title="copy response to clipboard (might not work in few systems)"
        class="mr-4"
      />
      <v-checkbox
        v-model="dumpHeaders"
        label="dump-headers"
        hide-details
        density="compact"
      />
    </div>
    <v-card variant="outlined" class="pa-4">
      <codemirror
        v-model="computedCurlCode"
        :extensions="extensions"
        disabled
        :style="{ height: '400px' }"
      />
      <v-btn
        color="primary"
        class="mt-4"
        @click="$emit('copy-output-code', computedCurlCode)"
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

const isInsecure = ref(false)
const isVerbose = ref(false)
const copyToClip = ref(false)
const dumpHeaders = ref(false)

const computedHeadersStr = computed(() => {
  const headers = Object.keys(store.inputData.requestHeaders)
  if (headers.length > 0) {
    return headers.reduce((accumulator, currentValue) => (
      accumulator + `-H "${currentValue}: ${store.inputData.requestHeaders[currentValue]}" `
    ), ' ')
  }
  return ' '
})

const computedRequestBodyStr = computed(() => {
  let requestBody = store.inputData.requestBody || ''
  requestBody = requestBody.replace(/"/g, '\\"')
  return requestBody ? `-d "${requestBody}" ` : ''
})

const computedInsecureStr = computed(() => (isInsecure.value ? '--insecure ' : ''))
const computedVerboseStr = computed(() => (isVerbose.value ? '--verbose ' : ''))
const computedDumpHeaderStr = computed(() => (dumpHeaders.value ? '--dump-header - ' : ''))

const computedCopyToClipStr = computed(() => {
  const platform = (window.navigator?.platform || '').toLowerCase()
  let clipCmd = ' | clip'
  if (platform.includes('mac')) {
    clipCmd = ' | pbclip'
  }
  return copyToClip.value ? clipCmd : ''
})

const computedCurlCode = computed(() => {
  return `curl ${computedInsecureStr.value}${computedVerboseStr.value}${computedDumpHeaderStr.value}-X${store.inputData.method}${computedHeadersStr.value}${computedRequestBodyStr.value}"${store.inputData.fetchUrl}"${computedCopyToClipStr.value}`
})

defineEmits(['copy-output-code'])
</script>

<style lang="scss" scoped>
.output-code {
  padding: 10px;
}
</style>
