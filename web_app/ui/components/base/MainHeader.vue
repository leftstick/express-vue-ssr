<template>
  <el-menu :default-active="activeIndex" 
    :router="true" 
    mode="horizontal">
    <el-menu-item index="/">首页</el-menu-item>
    <el-menu-item index="/features">功能</el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: 'MainHeader',
  data() {
    return {
      activeIndex: this.$route.path
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
