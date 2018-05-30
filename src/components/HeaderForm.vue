<template>
    <div>
        <div>
            <md-autocomplete v-model="formData.headerKey" :md-options="Object.keys(httpHeaders)" md-dense :md-open-on-focus="false">
                <label>header key</label>
            </md-autocomplete>
            <md-autocomplete v-model="formData.headerValue" :md-options="httpHeaders[formData.headerKey] || []" md-dense :md-open-on-focus="false">
                <label>header value</label>
            </md-autocomplete>
            <md-button @click="$emit('add-header', formData)" class="md-raised md-primary">ADD</md-button>
        </div>
        <div>
            <md-list @click="$emit('delete-header', $event.target.dataset.header)">
                <md-list-item v-for="(value, key) in requestHeaders" :key="key">
                    '{{key}}': '{{value}}'
                    <md-button class="md-icon-button">
                        <md-icon class="fa fa-trash" :data-header='key'></md-icon>
                    </md-button>
                </md-list-item>
            </md-list>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        formData: {
            type: Object,
            default: function () {
                return {
                    headerKey: '',
                    headerValue: ''
                };
            }
        },
        requestHeaders: {
            type: Object,
            default: function () {
                return {};
            }
        }
    },
    asyncComputed: {
        httpHeaders: {
            lazy: true,
            get(){
                return fetch(STATIC_JSON_DATA_URL).then(resp => resp.json());
            },
            default: []
        }
    }
}
</script>
