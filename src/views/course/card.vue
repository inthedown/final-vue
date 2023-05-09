<template>
   <el-card >
      
      <div style="padding: 14px;">
        <img src="~@/assets/img/course.png" class="image">
        <span>{{data.courseName}}</span>
        <span style="margin-left:10px;">{{data.teacherName}}</span>
        <div class="bottom clearfix">
         开始时间<span class="time">{{ data.startTime }}</span>结束时间<span class="time">{{ data.endTime }}</span>
          <el-button type="text" class="button" @click="find">查看</el-button>
           <el-button type="text" class="button" @click="update">修改</el-button>
            <el-button type="text" class="button" @click="del">删除</el-button>
        </div>
      </div>
    </el-card>
</template>

<script>
import { reactive, toRefs ,getCurrentInstance} from 'vue'
import * as COURSE from '@/api/Course'
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
    const update = () => {
      instance.proxy.$router.push({ path: '/add', query: { id: state.data.id,data:JSON.stringify(state.data)} })
    }
    const del = () => {
      //pop up a confirm window
      instance.proxy.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //delete the course
        COURSE.deleteCourse(state.data.id).then((res) => {
          if(res.rspCode == 200){
            instance.proxy.$message({
              type: 'success',
              message: '删除成功!'
            });
          
        }else{
          instance.proxy.$message({
            type: 'error',
            message: '删除失败!'
          });
        }
      })
    })
    }
    return {
      ...toRefs(state),
      find,
     update,
     del
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