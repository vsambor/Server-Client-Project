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

export default {
  name: 'app',
  components: {
    Footerbar,
    Navbar,
    Leftsider
  }
}
</script>

<style>
/* Fix scroll bar which appears on all pages, when is not needed. */
.layout-page {
  min-height: 0px !important;
}
</style>

