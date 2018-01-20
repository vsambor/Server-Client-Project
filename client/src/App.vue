<template>
  <q-layout ref="layout" view="hHr LpR lFf">

    <!-- Header -->
    <navbar slot="header" :themeColor="themeColor" />

    <!-- Left Side Panel -->
    <leftsider slot="left" />

    <!-- Pages are injected here -->
    <div class="m-15">
      <router-view />
    </div>

    <!-- Footer -->
    <footerbar slot="footer" :themeColor="themeColor" />

  </q-layout>
</template>

<script>
import Navbar from './components/core/Navbar'
import Leftsider from './components/core/LeftSider'
import Footerbar from './components/core/Footer'

export default {
  name: 'app',
  components: {
    Footerbar,
    Navbar,
    Leftsider
  },
  data() {
    return {
      themeColor: 'secondary'
    }
  }
}
</script>
