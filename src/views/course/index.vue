<template>
  <el-header>
    <el-row :gutter="20">
      <el-col :span="6">我的课程</el-col>
      <el-col :span="6" :offset="10">
        <el-button type="primary" @click="dialogVisible = true">
          增加课程
        </el-button>
      </el-col>
    </el-row>
  </el-header>
  <el-main>
    <el-scrollbar height="500px" class="container">
      <p v-for="item in items" :key="item" class="scrollbar-demo-item">
        <card :data="item"></card>
      </p>
    </el-scrollbar>
  </el-main>
</template>

<script>
import { reactive, toRefs } from 'vue'
import AddCourse from './addCourse.vue'
import card from './card.vue'
export default {
  components: { AddCourse ,card},
  setup() {
    const state = reactive({
      items: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
      ],
      dialogVisible: false,
    })
    return {
      ...toRefs(state),
    }
  },
}
</script>

<style scoped>
.container{
  display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            /* 需要指定高度 */
            height: 800px;
            justify-content: center;
            align-items: flex-start;
}
.scrollbar-demo-item {
width: 25%;

}
</style>
