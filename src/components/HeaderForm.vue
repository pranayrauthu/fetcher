<template>
    <div>
        <div>
            <md-autocomplete v-model="formData.headerKey" :md-options="Object.keys(httpHeaders)" md-dense class="header-key-input">
                <label>header key</label>
            </md-autocomplete>
            <md-autocomplete v-model="formData.headerValue" :md-options="httpHeaders[formData.headerKey] || []" md-dense class="header-value-input">
                <label>header value</label>
            </md-autocomplete>
            <md-button @click="$emit('add-header', formData)" class="md-raised md-primary add-header-btn">ADD</md-button>
        </div>
        <div>
            <md-list @click="$emit('delete-header', $event.target.dataset.header)">
                <md-list-item v-for="(value, key) in requestHeaders" :key="key">
                    '{{key}}': '{{value}}'
                    <md-button class="md-icon-button">
                        <span :data-header='key'>
                            <md-icon :md-src="deleteIcon" class="delete-icon"></md-icon>
                        </span>
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
            httpHeaders: [],
            deleteIcon: STATIC_ICONS_BASE + 'cancel-circle.svg'
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


<style lang="scss" scoped>

.delete-icon {
    pointer-events: none;
}

</style>
