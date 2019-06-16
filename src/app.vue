<template>
  <md-content>

    <app-header/>

    <md-content class="app-container">
      <md-content class="input-tab md-elevation-2">
        <RequestInfoForm />
        <HeaderForm />
      </md-content>
      <md-content class="output-tab md-elevation-2">
        <md-tabs :md-active-tab="'tab-'+$route.path.slice(1)">
          <md-tab id="tab-response" md-label="Response" to="/response">
          </md-tab>
          <md-tab id="tab-fetch" md-label="JavaScript" to="/fetch">
          </md-tab>
          <md-tab id="tab-curl" md-label="cURL" to="/curl">
          </md-tab>
          <md-tab id="tab-csharp" md-label="C#" to="/csharp">
          </md-tab>
          <md-tab id="tab-http" md-label="HTTP" to="/http">
          </md-tab>
          <md-tab id="tab-powershell" md-label="PowerShell" to="/powershell">
          </md-tab>
          <md-tab id="tab-java" md-label="Java" to="/java">
          </md-tab>
        </md-tabs>
        <hr>
        <router-view @copy-output-code="copyOutputCode" class="current-code-component"></router-view>
      </md-content>
    </md-content>

    <md-snackbar :md-position="'center'" :md-duration="2000" :md-active.sync="snackBarState" md-persistent>
      <span>{{snackBarText}}</span>
      <md-button class="md-primary" @click="hideSnackBar">close</md-button>
    </md-snackbar>

  </md-content>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import RequestInfoForm from "./components/RequestInfoForm.vue";
import HeaderForm from "./components/HeaderForm.vue";
import AppHeader from "./components/AppHeader.vue";

export default {
  computed: {
    ...mapGetters([
      'snackBarText'
    ]),
    snackBarState: {
      get(){
        return this.$store.getters.snackBarState;
      },
      set(value){
        !value && this.hideSnackBar();
      }
    }
  },
  methods: {
    ...mapActions(['hideSnackBar', 'showSnackBar']),
    // TODO: This should be an async action
    copyOutputCode: function (copyText) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(copyText)
          .then(() => {
            this.showSnackBar('text copied successfully 💃💃💃');
          })
          .catch(err => {
            this.showSnackBar('unable to copy text.. 😢');
            console.error('Could not copy text: ', err);
          });
      }
      // TODO: Handle old browsers
    }
  },
  components: {
    RequestInfoForm,
    HeaderForm,
    AppHeader
  }
};
</script>

<style lang="scss">
@import "~vue-material/dist/theme/engine";

@include md-register-theme("default", (primary: #ff4500, accent: #1a11e8));

@import "~vue-material/dist/theme/all"; // Apply the theme

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
.app-header {
  top: 0;
  z-index: 6;

  .app-logo {
    margin: auto;
    margin-left: 0px;

    .md-icon {
      width: 100px;
    }
  }
}

.app-container {
  display: grid;
  grid-template-columns: 30% 70%;
  grid-template-rows: auto;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  margin: 10px;

  .input-tab,
  .output-tab {
    padding: 10px;
    height: auto;
  }

  .output-tab {
    .current-code-component{
      margin-top: 15px;
    }
  }

}

@media only screen and (max-width: 800px) {
  .app-container {
    grid-template-columns: 100%;
  }
}
</style>


