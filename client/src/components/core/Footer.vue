<template>
  <q-toolbar :color="$store.getters.currentTheme">
    <q-toolbar-title>
      {{(new Date()).getFullYear()}} © {{$store.state.appName}}. {{$t('footer.rights')}}
      <!-- <q-icon name="fa-github-alt" /> -->
    </q-toolbar-title>
  </q-toolbar>
</template>
