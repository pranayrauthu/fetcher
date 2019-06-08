import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        inputData: {
            method: "GET",
            fetchUrl: "",
            requestBody: "",    
            requestHeaders: {}
        }
    },
    getters: {
        inputData: state => state.inputData,
        method: state => state.inputData.method,
        fetchUrl: state => state.inputData.fetchUrl,
        requestBody: state => state.inputData.requestBody,
        requestHeaders: state => state.inputData.requestHeaders,
    },
    mutations: {
        addRequestHeader(state, {headerKey, headerValue}){
            state.inputData.requestHeaders = {
                ...state.inputData.requestHeaders,
                [headerKey]: headerValue
            }
        },
        deleteHeader(state, headerKey){
            const {requestHeaders} = state.inputData;
            delete requestHeaders[headerKey];
            state.inputData.requestHeaders = {
                ...requestHeaders
            };
        },
        setMethod(state, method){
            state.inputData.method = method;
        },
        setFetchUrl(state, fetchUrl){
            state.inputData.fetchUrl = fetchUrl;
        },
        setRequestBody(state, requestBody){
            state.inputData.requestBody = requestBody;
        }
    }
});

export default store;