<template>
    <div>
        <div>
            <md-autocomplete v-model="headerKey" :md-options="Object.keys(httpHeaders)" md-dense class="header-key-input">
                <label>header key</label>
            </md-autocomplete>
            <md-autocomplete v-model="headerValue" :md-options="httpHeaders[headerKey] || []" md-dense class="header-value-input">
                <label>header value</label>
            </md-autocomplete>
            <md-button
                :disabled="headerKey===''"
                @click="addHeader"
                class="md-raised md-primary add-header-btn"
            >ADD</md-button>
        </div>
        <div>
            <md-list @click="deleteHeader($event.target.dataset.header)">
                <md-list-item v-for="(value, key) in requestHeaders" :key="key">
                    <span class="header-item">'{{key}}': '{{value}}'</span>
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
import { mapGetters } from 'vuex';

export default {
    computed:{
        ...mapGetters(['requestHeaders'])
    },
    data: function () {
        return {
            headerKey: '',
            headerValue: '',
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
    },
    methods: {
        addHeader(){
            const {headerKey, headerValue} = this;
            this.$store.commit('addRequestHeader', {
                headerKey,
                headerValue
            });
            this.resetHeaderForm();
        },
        resetHeaderForm(){
            this.headerKey = '';
            this.headerValue = '';
        },
        deleteHeader(headerKey){
            this.$store.commit('deleteHeader', headerKey)
        }
    }
}
</script>


<style lang="scss" scoped>

.delete-icon {
    pointer-events: none;
}

.header-item {
    width: 90%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

</style>
