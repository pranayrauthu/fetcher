<template>
  <v-app-bar color="primary" flat>
    <v-btn icon @click="menuVisible = !menuVisible" variant="text">
      <v-img :src="menuIcon" width="24" height="24" />
    </v-btn>

    <div class="app-logo-container ml-2">
      <v-img :src="appLogo" width="100" contain />
    </div>

    <v-spacer></v-spacer>

    <v-btn icon href="https://github.com/pranayrauthu/fetcher" target="_blank" variant="text">
      <v-img :src="githubLogo" width="24" height="24" />
    </v-btn>

    <v-btn icon href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fpranayrauthu%2Ffetcher&via=pranay_rauthu&text=generate%20HTTP%20request%20code%20with&hashtags=fetcher" target="_blank" variant="text">
      <v-img :src="shareIcon" width="24" height="24" />
    </v-btn>
  </v-app-bar>

  <v-navigation-drawer v-model="menuVisible" temporary>
    <v-list>
      <v-list-item>
        <v-btn block color="primary" @click="onSaveClick">save</v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue';
import { useAppStore } from '../store';

const store = useAppStore();

// Use import.meta.env.BASE_URL to handle the /fetcher/ base path
const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
const appLogo = `${baseUrl}/assets/app-logo.svg`;
const shareIcon = `${baseUrl}/assets/share2.svg`;
const githubLogo = `${baseUrl}/assets/github.svg`;
const menuIcon = `${baseUrl}/assets/menuIcon.svg`;

const menuVisible = ref(false);

const onSaveClick = () => {
  menuVisible.value = false;
  store.saveRequest();
};
</script>

<style lang="scss" scoped>
.app-logo-container {
  width: 100px;
  display: flex;
  align-items: center;
}
</style>
