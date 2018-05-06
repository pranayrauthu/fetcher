<template>
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <Header :title="appName"></Header>
        <main class="mdl-layout__content">
            <div class="app page-content">
                <div class="input-tab mdl-card mdl-shadow--2dp">
                    <RequestInfoForm :formData="inputData">
                    </RequestInfoForm>
                    <div>
                        <HeaderForm :formData="addHeaderForm" @add-header="addRequestHeader" :requestHeaders="inputData.requestHeaders" @delete-header="deleteHeader">
                        </HeaderForm>
                    </div>
                </div>
                <div class="output-tab mdl-card mdl-shadow--2dp">
                    <FetchCodeTab :inputData="inputData"></FetchCodeTab>
                    <CurlCodeTab :inputData="inputData"></CurlCodeTab>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import Header from "./components/Header.vue";
import RequestInfoForm from "./components/RequestInfoForm.vue";
import HeaderForm from "./components/HeaderForm.vue";
import FetchCodeTab from "./components/FetchCodeTab.vue";
import CurlCodeTab from "./components/CurlCodeTab.vue";

export default {
    data: function() {
        return {
            appName: "Fetcher",
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
            yourCode: "// enter your code"
        };
    },
    methods: {
        addRequestHeader: function({ headerKey, headerValue }) {
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
        deleteHeader: function(header) {
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
        }
    },
    components: {
        Header,
        RequestInfoForm,
        HeaderForm,
        FetchCodeTab,
        CurlCodeTab
    }
};
</script>

<style>
code {
    white-space: pre-line;
}
</style>


<style scoped>
.app {
    display: flex;
}
.input-tab,
.output-tab {
    margin: 20px;
    padding: 30px;
    width: 100%;
}
</style>


