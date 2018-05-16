<template>
    <md-content>

        <!-- font-awesome icons -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

        <md-toolbar class="md-primary">
            <span class="md-title app-title" style="flex: 1">{{appName}}</span>
            <a href="https://github.com/pranayrauthu/fetcher" target="_blank" class="github-link">
                <md-button class="md-icon-button">
                    <md-icon class="fa fa-github"></md-icon>
                </md-button>
            </a>
            <a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fpranayrauthu%2Ffetcher&via=pranay_rauthu&text=generate%20HTTP%20request%20code%20with&hashtags=fetcher" target="_blank">
                <md-button class="md-icon-button">
                    <md-icon class="fa fa-share-alt"></md-icon>
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
                <md-tabs>
                    <md-tab id="tab-fetch" md-label="Fetch">
                        <FetchCodeTab :inputData="inputData" @copy-output-code="copyOutputCode"></FetchCodeTab>
                    </md-tab>
                    <md-tab id="tab-curl" md-label="cURL">
                        <CurlCodeTab :inputData="inputData" @copy-output-code="copyOutputCode"></CurlCodeTab>
                    </md-tab>
                    <md-tab id="tab-csharp" md-label="C#">
                        <CsharpCodeTab :inputData="inputData" @copy-output-code="copyOutputCode"></CsharpCodeTab>
                    </md-tab>
                    <md-tab id="tab-http" md-label="HTTP">
                        <HttpCodeTab :inputData="inputData" @copy-output-code="copyOutputCode"></HttpCodeTab>
                    </md-tab>
                </md-tabs>
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
import FetchCodeTab from "./components/FetchCodeTab.vue";
import CurlCodeTab from "./components/CurlCodeTab.vue";
import CsharpCodeTab from "./components/CsharpCodeTab.vue";
import HttpCodeTab from "./components/HttpCodeTab.vue";

export default {
    data: function () {
        return {
            appName: "Fetcher (beta)",
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
        copyOutputCode: function (node) {
            if (!node) {
                return;
            }
            node.focus();
            const range = document.createRange();
            range.selectNodeContents(node);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            if (navigator.clipboard) {
                navigator.clipboard.writeText(node.innerHTML)
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
        FetchCodeTab,
        CurlCodeTab,
        CsharpCodeTab,
        HttpCodeTab
    }
};
</script>

<style>
body {
  overflow-x: hidden;
}
code {
  white-space: pre-line;
  word-wrap: break-word;
}
</style>


<style scoped>
.app-container {
  display: grid;
  grid-template-columns: 30% auto;
  grid-template-rows: auto;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  margin: 10px;
}
.input-tab,
.output-tab {
  padding: 10px;
  height: auto;
}
.github-link {
  color: white;
}

@media only screen and (max-width: 800px) {
  .app-container {
    grid-template-columns: auto;
  }
}
</style>


