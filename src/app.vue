<template>
  <v-app>
    <AppHeader />

    <v-main class="app-container">
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="4">
            <v-card class="pa-4 mb-4" elevation="2">
              <RequestInfoForm />
              <HeaderForm />
            </v-card>
          </v-col>
          
          <v-col cols="12" md="8">
            <v-card class="pa-4" elevation="2">
              <v-tabs v-model="activeTab" color="primary">
                <v-tab value="response" to="/response">Response</v-tab>
                <v-tab value="fetch" to="/fetch">JavaScript</v-tab>
                <v-tab value="curl" to="/curl">cURL</v-tab>
                <v-tab value="csharp" to="/csharp">C#</v-tab>
                <v-tab value="http" to="/http">HTTP</v-tab>
                <v-tab value="powershell" to="/powershell">PowerShell</v-tab>
                <v-tab value="java" to="/java">Java</v-tab>
              </v-tabs>

              <v-divider class="my-4"></v-divider>

              <router-view @copy-output-code="copyOutputCode" class="current-code-component"></router-view>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-snackbar
      v-model="store.snackBar.visible"
      :timeout="2000"
      location="center"
    >
      {{ store.snackBarText }}
      <template v-slot:actions>
        <v-btn
          color="primary"
          variant="text"
          @click="store.hideSnackBar"
        >
          close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAppStore } from './store';
import RequestInfoForm from "./components/RequestInfoForm.vue";
import HeaderForm from "./components/HeaderForm.vue";
import AppHeader from "./components/AppHeader.vue";

const store = useAppStore();
const route = useRoute();
const activeTab = ref('response');

// Sync activeTab with route
watch(() => route.path, (path) => {
  const segment = path.split('/')[1];
  if (segment) {
    activeTab.value = segment;
  }
}, { immediate: true });

const copyOutputCode = async (copyText) => {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(copyText);
      store.showSnackBar('text copied successfully 💃💃💃');
    } catch (err) {
      store.showSnackBar('unable to copy text.. 😢');
      console.error('Could not copy text: ', err);
    }
  }
};

onMounted(() => {
  store.getSavedRequest();
});
</script>

<style lang="scss">
body {
  overflow-x: hidden;
  .CodeMirror {
    height: 400px;
    pre {
      font-family: "Source Code Pro", Menlo, Monaco, Consolas, "Courier New",
        monospace;
    }
  }
}
</style>

<style lang="scss" scoped>
.app-container {
  background-color: #f5f5f5;
}

.current-code-component {
  margin-top: 15px;
}
</style>
