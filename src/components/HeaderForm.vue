<template>
    <div>
        <div>
            <md-autocomplete v-model="formData.headerKey" :md-options="Object.keys(httpHeaders)" md-dense :md-open-on-focus="false" class="header-key-input">
                <label>header key</label>
            </md-autocomplete>
            <md-autocomplete v-model="formData.headerValue" :md-options="httpHeaders[formData.headerKey] || []" md-dense :md-open-on-focus="false" class="header-value-input">
                <label>header value</label>
            </md-autocomplete>
            <md-button @click="$emit('add-header', formData)" class="md-raised md-primary add-header-btn">ADD</md-button>
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
    data: function () {
        return {
            httpHeaders: []
        }
    },
    mounted: function () {
        fetch(STATIC_JSON_DATA_URL)
            .then(resp => resp.json())
            .then(resp => {
                this.httpHeaders = resp;
            }).catch(err => {
                // console.log(err);
            });
    }
}
</script>
