<template>
  <div>
    <q-toolbar slot="header" :color="themeColor">
      <q-btn flat @click="$parent.toggleLeft()">
        <q-icon name="menu" />
      </q-btn>
      <q-toolbar-title> SCP
        <span slot="subtitle">Server Client Project</span>
      </q-toolbar-title>

      <!-- Login -->
      <q-btn flat @click="$router.push('/login')">
        <q-icon name="assignment ind" />
      </q-btn>

      <q-btn flat>
        <q-icon name="assignment" />
      </q-btn>

      <q-btn flat>
        <q-icon name="exit to app" />
      </q-btn>

      <q-btn flat>
        <q-icon name="language" />
      </q-btn>
    </q-toolbar>

    <!-- Navigation -->
    <q-tabs slot="navigation" :color="themeColor" inverted>
      <q-route-tab slot="title" icon="home" to="/" replace hide="icon" label="Home" />
      <q-route-tab slot="title" icon="map" to="/map" replace hide="icon" label="Map" />
    </q-tabs>
  </div>
</template>

<script>
export default {
  props: {
    themeColor: ''
  },
  data() {
    return {}
  },
  methods: {}
}
</script>