<template>
  <el-header>
    <el-row :gutter="20">
      <el-col :span="6">我的课程</el-col>
      <el-col :span="6" :offset="10">
        <el-button type="primary" @click="addCourse">
          增加课程
        </el-button>
      </el-col>
    </el-row>
  </el-header>
  <el-main>
     <div v-if="items.length==0">
        <el-alert
          title="暂无课程"
          type="info"
        
          style=""
          :closable="false"
          show-icon>
        </el-alert>
      </div>
    <el-scrollbar v-else class="container">
     

      <p  v-for="item in items" :key="item" class="scrollbar-demo-item">
        <card :data="item"></card>
      </p>
    </el-scrollbar>
  </el-main>
</template>

<script>
import * as course from "@/api/Course"
import { reactive, toRefs ,getCurrentInstance} from 'vue'
import card from './card.vue'
export default {
  components: {card},
  setup() {
    const instance = getCurrentInstance()
    const state = reactive({
      items: [
      ],
      dialogVisible: false,
    })
    const addCourse=()=>{
      //跳转到增加课程页面
      instance.proxy.$router.push({path:'/add'})
    }
    return {
      ...toRefs(state),
      addCourse
    }
  },
  mounted(){
    var userInfo={
      "id":19,"role":'student'
    }
    course.getList(userInfo).then(res=>{
      //将数据赋值给items
      this.items=res.data
    })
  }
}
</script>

<style scoped>

.container{
  /* 瀑布流布局 */
  display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            /* 需要指定高度 */
            height: 600px;

}
.scrollbar-demo-item {
  /* 瀑布流卡片样式 */
width: 90%;
margin: 0 auto;
margin-bottom: 20px;

}
</style>
