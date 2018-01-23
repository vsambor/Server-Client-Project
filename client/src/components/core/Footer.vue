<template>
  <q-toolbar :color="$store.getters.currentTheme">
    <q-toolbar-title>
      {{(new Date()).getFullYear()}} © {{$store.state.appName}}. {{$t('footer.rights')}}
      <i class="fa fa-github"></i>
    </q-toolbar-title>
  </q-toolbar>
</template>
