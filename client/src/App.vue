<template>
  <el-container id="app">

    <el-header>
      <navbar/>
    </el-header>

    <el-main>
      <router-view/>
    </el-main>

    <el-footer>
      <footerbar/>
    </el-footer>

  </el-container>
</template>

<script>
import Navbar from './components/core/Navbar'
import Footerbar from './components/core/Footer'

export default {
  name: 'app',
  components: {
    Footerbar,
    Navbar
  }
}
</script>

<style lang="scss">
body {
  margin: 0px;
}

.el-header {
  padding: 0px;
}

.el-footer {
  padding: 0px;
}
</style>
