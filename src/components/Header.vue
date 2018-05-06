<template>
    <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">
            <span class="mdl-layout-title">{{title}}</span>
            <div class="mdl-layout-spacer"></div>
            <nav class="mdl-navigation mdl-layout--large-screen-only">
                <!-- TODO: Need to modify this link -->
                <a class="mdl-navigation__link" href="https://github.com/pranayrauthu/" target="_blank">GitHub</a>
            </nav>
        </div>
    </header>
</template>

<script>
export default {
  props: ['title']
}
</script>

