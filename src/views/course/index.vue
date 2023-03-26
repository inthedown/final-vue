<template>
  <el-header>
    <el-row :gutter="20">
      <el-col :span="6">我的课程</el-col>
      <el-col :span="6" :offset="10">
        <el-button type="primary" @click="dialogVisible = true">
          增加课程
        </el-button>
        <!-- <el-dialog
          v-model="dialogVisible"
          title="增加课程"
          width="80%"
          append-to-body
          :before-close="handleClose"
        >
          <div>
            <add-course></add-course>
          </div>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="dialogVisible = false">
                确认
              </el-button>
            </span>
          </template>
        </el-dialog> -->
      </el-col>
    </el-row>
  </el-header>
  <el-main>
    <el-scrollbar height="500px">
      <p v-for="item in items" :key="item" class="scrollbar-demo-item">
        {{ item }}
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
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  margin: 20px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
