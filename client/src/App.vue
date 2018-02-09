<template>
  <q-layout ref="layout" view="hHr LpR lFf">

    <!-- Header -->
    <navbar slot="header" />

    <!-- Left Side Panel -->
    <leftsider slot="left" />

    <!-- Pages are injected here -->
    <div class="m-15">
      <router-view />
    </div>

    <!-- Footer -->
    <footerbar slot="footer" />

  </q-layout>
</template>

<script>
import Navbar from './components/core/Navbar'
import Leftsider from './components/core/LeftSider'
import Footerbar from './components/core/Footer'
import Notification from './components/core/Notifications'

export default {
  name: 'app',
  components: {
    Footerbar,
    Navbar,
    Leftsider,
    Notification
  }
}
</script>
