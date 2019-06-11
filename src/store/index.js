import Vue from 'vue';
import Vuex from 'vuex';
import {
    fetchResponse
} from './async-actions/fetch-process-request';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        inputData: {
            method: "GET",
            fetchUrl: "",
            requestBody: "",    
            requestHeaders: {}
        },
        response: 'click on send to see the response.'
    },
    getters: {
        inputData: state => state.inputData,
        method: state => state.inputData.method,
        fetchUrl: state => state.inputData.fetchUrl,
        requestBody: state => state.inputData.requestBody,
        requestHeaders: state => state.inputData.requestHeaders,
        response: state => state.response
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
        },
        setResponse(state, response){
            state.response = response;
        }
    },
    actions: {
        addRequestHeader({commit}, {headerKey, headerValue}){
            commit('addRequestHeader', {headerKey, headerValue});
        },
        deleteHeader({commit}, headerKey){
            commit('deleteHeader', headerKey);
        },
        setMethod({commit}, method){
            commit('setMethod', method)
        },
        setFetchUrl({commit}, fetchUrl){
            commit('setFetchUrl', fetchUrl);
        },
        setRequestBody({commit}, requestBody){
            commit('setRequestBody', requestBody);
        },
        setResponse({commit}, response){
            commit('setResponse', response);
        },
        fetchResponse
    }
});

export default store;