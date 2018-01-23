<template>
  <div>
    <q-toolbar slot="header" :color="$store.getters.currentTheme">
      <q-btn flat @click="$parent.toggleLeft">
        <q-icon name="menu" />
      </q-btn>
      <q-toolbar-title> {{$store.state.shortAppName}}
        <span slot="subtitle">{{$store.state.appName}}</span>
      </q-toolbar-title>

      <!-- Login button -->
      <q-btn flat @click="$router.push('/login')">
        <q-icon name="assignment ind" />
      </q-btn>

      <!-- Register button -->
      <q-btn flat @click="$router.push('/register')">
        <q-icon name="assignment" />
      </q-btn>

      <!-- Logout button -->
      <q-btn flat>
        <q-icon name="exit to app" />
      </q-btn>

      <!-- Language switcher component -->
      <lang-switch />
    </q-toolbar>

    <!-- Navigation -->
    <q-tabs slot="navigation" :color="$store.getters.currentTheme" inverted>
      <q-route-tab slot="title" icon="home" to="/" replace hide="icon" :label="$t('general.home')" />
      <q-route-tab slot="title" icon="map" to="/map" replace hide="icon" :label="$t('general.map')" />
    </q-tabs>
  </div>
</template>

<script>
import LangSwitch from 'common/LangSwitch'

export default {
  components: {
    'lang-switch': LangSwitch
  },
  created() {
    // Hides the left sider at the beginning.
    this.$parent.hideLeft()
  }
}
</script>

<style>
/* Hides the page context to not be seen under navigation bar. */
.q-tabs-inverted .q-tabs-head {
  background: white;
}
</style>
