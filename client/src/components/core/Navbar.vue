<template>
  <div>
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">

      <router-link to="/">
        <el-menu-item index="0">
          <strong>Server Client Project</strong>
        </el-menu-item>
      </router-link>

      <router-link to="/">
        <el-menu-item index="1">Home</el-menu-item>
      </router-link>

    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      // Not working for some reason, I will recheck.
      if (key === '0') {
        this.activeIndex = '1'
      }
    }
  }
}
</script>
