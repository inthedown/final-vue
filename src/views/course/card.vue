<template>
   <el-card >
      
      <div style="padding: 14px;">
        <img src="~@/assets/img/course.png" class="image">
        <span>{{data.courseName}}</span>
        <span style="margin-left:10px;">{{data.teacherName}}</span>
        <div class="bottom clearfix">
         开始时间<span class="time">{{ data.startTime }}</span>结束时间<span class="time">{{ data.endTime }}</span>
          <el-button type="text" class="button" @click="find">查看</el-button>
        </div>
      </div>
    </el-card>
</template>

<script>
import { reactive, toRefs ,getCurrentInstance} from 'vue'
export default {
  name: 'card',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const instance = getCurrentInstance()
    const state = reactive({
      data: props.data,

    })
    const find = () => {
      instance.proxy.$router.push({ path: '/detail', query: { id: state.data.id,data:JSON.stringify(state.data)} })
    }
 
    return {
      ...toRefs(state),
      find,
     
    }
  },
  mounted() {
    
  }
}
</script>

<style>
 .time {
    font-size: 13px;
    color: #999;
    margin: 10px 5px;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 30px;
    height: 30px;
    
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>