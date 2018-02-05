<template>
  <div>
    <div class="error">
        <div class="content">
            <h1>404</h1>
            <p class="hint">那怎么办呀？<br/>你能看到这个我也很绝望啊[摊手]</p>
            <p>
                <span class="separator"></span>
                <a href id="js-history-back" @click="goback">返回上页</a>
            </p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goback() {
      this.$router.go(-1)
    }
  }
}
</script>
