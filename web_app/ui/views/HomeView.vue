<template>
  <div>
    <div class="jumbotron">
      <div class="desc">
        <h1>欢迎来到vue-ssr</h1>
        <br>
        <p 
          v-for="desc of descriptions" 
          :key="desc">
          {{ desc }}
        </p>
      </div>
    </div>

    <div class="tablecontainer">
      <div class="tableview">
        <el-table 
          :data="tasks" 
          stripe>
          <el-table-column 
            prop="id" 
            label="编号" 
            width="110" 
            show-overflow-tooltip/>
          <el-table-column 
            prop="task" 
            label="任务" />
          <el-table-column 
            label="状态" 
            width="80">
            <template slot-scope="scope">
              <el-switch 
                v-model="scope.row.completed" 
                disabled/>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    descriptions() {
      return this.$store.state.tasks.descriptions || []
    },
    tasks() {
      return this.$store.state.tasks.tasks || []
    }
  },
  preFetch({ store }) {
    return Promise.all([store.dispatch('tasks/fetchTasks'), store.dispatch('tasks/fetchDescriptions')])
  },
  title() {
    return '首页'
  }
}
</script>
<style lang="stylus" scoped>
.jumbotron
  width 100%
  height 350px
  display flex
  flex-direction column

  .desc
    display flex
    flex-direction column
    justify-content center
