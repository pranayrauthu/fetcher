<template>
  <md-content>

    <md-toolbar class="md-primary app-header">
      <span class="app-logo">
        <md-icon :md-src="appLogo" />
      </span>
      <a href="https://github.com/pranayrauthu/fetcher" target="_blank" class="github-link">
        <md-button class="md-icon-button">
          <md-icon :md-src="githubLogo"></md-icon>
        </md-button>
      </a>
      <a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fpranayrauthu%2Ffetcher&via=pranay_rauthu&text=generate%20HTTP%20request%20code%20with&hashtags=fetcher" target="_blank">
        <md-button class="md-icon-button">
          <md-icon :md-src="shareIcon"></md-icon>
        </md-button>
      </a>
    </md-toolbar>

    <md-content class="app-container">
      <md-content class="input-tab md-elevation-2">
        <RequestInfoForm :formData="inputData"></RequestInfoForm>
        <HeaderForm :formData="addHeaderForm" @add-header="addRequestHeader" :requestHeaders="inputData.requestHeaders" @delete-header="deleteHeader">
        </HeaderForm>
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
        <router-view :inputData="inputData" @copy-output-code="copyOutputCode" class="current-code-component"></router-view>
      </md-content>
    </md-content>

    <md-snackbar :md-position="'center'" :md-duration="2000" :md-active.sync="showSnackbar" md-persistent>
      <span>text copied to clipboard.</span>
      <md-button class="md-primary" @click="showSnackbar = false">close</md-button>
    </md-snackbar>

  </md-content>
</template>

<script>
import RequestInfoForm from "./components/RequestInfoForm.vue";
import HeaderForm from "./components/HeaderForm.vue";

export default {
  data: function () {
    return {
      appName: "Fetcher",
      appLogo: STATIC_ICONS_BASE + 'app-logo.svg',
      shareIcon: STATIC_ICONS_BASE + 'share2.svg',
      githubLogo: STATIC_ICONS_BASE + 'github.svg',
      inputData: {
        method: "GET",
        fetchUrl: "",
        requestBody: "",
        requestHeaders: {}
      },
      addHeaderForm: {
        headerKey: "",
        headerValue: ""
      },
      showSnackbar: false,
      yourCode: "// enter your code"
    };
  },
  methods: {
    addRequestHeader: function ({ headerKey, headerValue }) {
      if (
        !headerKey ||
        !headerValue ||
        (headerKey === "" || headerValue === "") ||
        this.inputData.requestHeaders[headerKey]
      ) {
        return;
      }
      this.inputData.requestHeaders = Object.assign(
        {},
        this.inputData.requestHeaders,
        { [headerKey]: headerValue }
      );
      this.addHeaderForm.headerKey = "";
      this.addHeaderForm.headerValue = "";
    },
    deleteHeader: function (header) {
      if (!header) {
        return;
      }
      if (this.inputData.requestHeaders[header]) {
        let newHeaders = Object.assign(
          {},
          this.inputData.requestHeaders
        );
        delete newHeaders[header];
        this.inputData.requestHeaders = newHeaders;
      }
    },
    copyOutputCode: function (copyText) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(copyText)
          .then(() => {
            this.showSnackbar = true;
          })
          .catch(err => {
            console.error('Could not copy text: ', err);
          });
      }
      // TODO: Handle old browsers
    }
  },
  components: {
    RequestInfoForm,
    HeaderForm,
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
  position: fixed;
  top: 0;
  z-index: 6;

  .app-logo {
    margin: auto;
    margin-left: 5px;

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
  margin-top: 80px;

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

  .github-link {
    color: white;
  }
}

@media only screen and (max-width: 800px) {
  .app-container {
    grid-template-columns: 100%;
  }
}
</style>


