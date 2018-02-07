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
      <q-btn v-if="!$store.getters.isLogged" flat @click="$router.push('/login')">
        <q-icon name="assignment ind" />
        <q-tooltip>{{$t('general.login')}}</q-tooltip>
      </q-btn>

      <!-- Register button -->
      <q-btn v-if="!$store.getters.isLogged" flat @click="$router.push('/register')">
        <q-icon name="assignment" />
        <q-tooltip>{{$t('general.register')}}</q-tooltip>
      </q-btn>

      <!-- Logout button -->

      <q-btn v-if="$store.getters.isLogged" @click="onLogout" flat>
        <q-icon name="exit to app" />
        <q-tooltip>{{$t('general.logout')}}</q-tooltip>
      </q-btn>

      <!-- Language switcher component -->
      <lang-switch />
    </q-toolbar>

    <!-- Navigation -->
    <q-tabs slot="navigation" :color="$store.getters.currentTheme" inverted>
      <q-route-tab slot="title" icon="home" to="/" replace hide="icon" :label="$t('general.home')" />
      <q-route-tab v-if="$store.getters.isLogged" slot="title" icon="dashboard" to="dashboard" replace hide="icon" :label="$t('general.dashboard')" />
      <q-route-tab v-if="$store.getters.isLogged" slot="title" icon="map" to="map" replace hide="icon" :label="$t('general.map')" />
    </q-tabs>
  </div>
</template>

<script>
import LangSwitch from 'common/LangSwitch'
import { Toast } from 'quasar-framework'

export default {
  components: {
    'lang-switch': LangSwitch
  },
  created() {
    // Hides the left sider at the beginning.
    this.$parent.hideLeft()
  },
  methods: {
    onLogout() {
      this.$store.commit('logout')
      Toast.create.positive(this.$t('logout.success'))
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style>
/* Hides the page context to not be seen under navigation bar. */
.q-tabs-inverted .q-tabs-head {
  background: white;
}
</style>
