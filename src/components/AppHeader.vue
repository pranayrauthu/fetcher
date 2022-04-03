<template>
  <div>
    <v-app-bar
      dark
      elevation="1"
      class="app-header"
    >
      <v-app-bar-nav-icon @click="menuVisible = !menuVisible"></v-app-bar-nav-icon>
      <span class="app-logo">
        <md-icon :md-src="appLogo" />
      </span>
      <v-spacer></v-spacer>
      <a
        href="https://github.com/pranayrauthu/fetcher"
        target="_blank"
      >
        <v-btn icon>
          <v-icon dark>mdi-github</v-icon>
        </v-btn>
      </a>
      <a
        href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fpranayrauthu%2Ffetcher&via=pranay_rauthu&text=generate%20HTTP%20request%20code%20with&hashtags=fetcher"
        target="_blank"
      >
        <v-btn icon>
          <v-icon dark>mdi-share-variant</v-icon>
        </v-btn>
      </a>
    </v-app-bar>
    <v-navigation-drawer
      v-model="menuVisible"
      absolute
      bottom
      temporary
    >
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item>
            <v-list-item-title
              @click="onSaveClick"
            >Save</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>

    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AppHeader',
  data() {
    return {
      appLogo: STATIC_ICONS_BASE + 'app-logo.svg',
      menuVisible: false,
    }
  },
  methods: {
    ...mapActions(['saveRequest']),
    onSaveClick() {
      this.menuVisible = false;
      this.saveRequest();
    }
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  top: 0;
  z-index: 6;

  .app-logo {
    margin: auto;
    margin-top: 18px;
    margin-left: 0px;

    .md-icon {
      width: 100px;
    }
  }
}
</style>
