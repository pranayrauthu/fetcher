<template>
    <div>
        <md-toolbar class="md-primary app-header">
      <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
        <md-icon :md-src="menuIcon" class="app-menu"/>
      </md-button>
      <span class="app-logo">
        <md-icon :md-src="appLogo" />
      </span>
      <a href="https://github.com/pranayrauthu/fetcher" target="_blank" class="github-link">
        <md-button class="md-icon-button">
          <md-icon :md-src="githubLogo"></md-icon>
        </md-button>
      </a>
      <a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fpranayrauthu%2Ffetcher&via=pranay_rauthu&text=generate%20HTTP%20request%20code%20with&hashtags=fetcher" target="_blank">
        <md-button class="md-icon-button">
          <md-icon :md-src="shareIcon"></md-icon>
        </md-button>
      </a>
    </md-toolbar>
    <md-drawer :md-active.sync="menuVisible">

        <md-list>
          <md-list-item>
            <span class="md-list-item-text"></span>
          </md-list-item>
        </md-list>
        <md-list>
          <md-list-item>
            <md-button class="nav-btn-save" @click="onSaveClick">save</md-button>
          </md-list-item>
        </md-list>

      </md-drawer>
    </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    name: 'AppHeader',
    data(){
        return {
            appLogo: STATIC_ICONS_BASE + 'app-logo.svg',
            shareIcon: STATIC_ICONS_BASE + 'share2.svg',
            githubLogo: STATIC_ICONS_BASE + 'github.svg',
            menuIcon: STATIC_ICONS_BASE + 'menuIcon.svg',
            menuVisible: false,
        }
    },
    methods: {
      ...mapActions(['saveRequest']),
      onSaveClick(){
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
    margin-left: 0px;

    .md-icon {
      width: 100px;
    }
  }

  .github-link {
    color: white;
  }

}

.md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);

    .nav-btn-save {
        width: 100%;
    }
}

</style>
