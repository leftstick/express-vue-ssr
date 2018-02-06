<template>
  <div id="main-app">
    <main-header></main-header>
    <router-view id="main-view" class="main"></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus">
*
  padding 0
  margin 0
  box-sizing border-box

html, body
  width 100%

html
  height 100%

body
  min-height 100%
  display flex
  flex-direction column

#main-app
  display flex
  flex-direction column
  padding 5px
  flex-grow 5

#main-view
  padding 15px
  flex-grow 5
</style>
