<template>
  <v-container fluid>
    <div>
      <v-autocomplete
        label="header key"
        v-model="headerKey"
        :items="Object.keys(httpHeaders)"
        class="header-key-input"
      ></v-autocomplete>
      <v-autocomplete
        v-if="httpHeaders[headerKey] && httpHeaders[headerKey].length"
        v-model="headerValue"
        :items="httpHeaders[headerKey] || []"
        class="header-value-input"
        label="header value"
      ></v-autocomplete>
      <v-text-field
        v-else
        v-model="headerValue"
        class="header-value-input"
        label="header value"
      ></v-text-field>
      <v-btn
        :disabled="headerKey===''"
        @click="addHeader"
        class="add-header-btn"
      >ADD</v-btn>
    </div>
    <div>
      <v-list>
        <v-list-item
          v-for="(value, key) in requestHeaders"
          :key="key"
        >
          <span class="header-item">'{{key}}': '{{value}}'</span>
          <v-btn icon @click="deleteHeader(key)">
            <v-icon
                class="delete-icon"
              >mdi-close</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['requestHeaders'])
  },
  data: function () {
    return {
      headerKey: '',
      headerValue: '',
      httpHeaders: [],
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
    addHeader() {
      const { headerKey, headerValue } = this;
      this.$store.commit('addRequestHeader', {
        headerKey,
        headerValue
      });
      this.resetHeaderForm();
    },
    resetHeaderForm() {
      this.headerKey = '';
      this.headerValue = '';
    },
    deleteHeader(headerKey) {
      this.$store.commit('deleteHeader', headerKey)
    }
  },
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
