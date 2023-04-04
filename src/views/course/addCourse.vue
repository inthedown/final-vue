<template>
  <el-form label-width="90px" >
    <el-form-item label="课程名称">
      <el-input v-model="state.name" />
    </el-form-item>
    <el-form-item>
      <draw-mapv-2  @childClick="handleChildClick"></draw-mapv-2>
    </el-form-item>
    <el-form-item  style="text-align: center;">
      <el-button>取消</el-button>
      <el-button type="primary" @click="submit">确认</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import {
  reactive,
  toRefs,
  ref,
  watch,
  getCurrentInstance,
  onMounted,
} from 'vue'
import axios from 'axios'
import drawMapv2 from './drawMapv2.vue'

const state = reactive({
  name: '',
  classes: '',
  teacherId: '22',
  data: [],
})

const instance = getCurrentInstance()
const handleChildClick = param => {
  console.log('接收到子组件传递的参数：', param)
  console.log('接收到子组件传递的参数：',param.date)
  console.log('接收到子组件传递的参数：',JSON.stringify(param.date))
  state.data = param
}

//过滤data属性
const filterObject=(obj)=> {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }
    
    if (Array.isArray(obj)) {
      return obj.map(filterObject);
    }
    
    const filteredObj = {};
    const allowedKeys = ['id', 'name', 'label', 'fileList', 'date', 'children','percentage','size','raw','uid'];
    
    for (const [key, value] of Object.entries(obj)) {
      if (allowedKeys.includes(key)) {
        if (key === 'children') {
          filteredObj[key] = value.map(filterObject);
        }else if(key==='date'){
          //若date为空数组，则不传给后端
          if(value==""){
            filteredObj[key] = [];
          }else{
            filteredObj[key] = value;
          }
          
        } else {
          filteredObj[key] = filterObject(value);
        }
      }
    }
    
    return filteredObj;
  }

const submit = () => {
  
  if (state.data.length === 0) {
    instance.proxy.$message({
      message: '请添加课程章节',
      type: 'error',
    })
  } else {
    const data = {
      name: state.name,
      teacherId: state.teacherId,
      data:filterObject( state.data),
    }
    axios.post('/api/course/add', data).then(res => {
      if (res.data.rspCode === '200') {
        instance.proxy.$message({
          message: '课程创建成功',
          type: 'success',
        })
        instance.proxy.$router.push('/course')
      } else {
        instance.proxy.$message({
          message: res.errMsg,
          type: 'error',
        })
      }
    })
  }
}
onMounted(() => {

})
</script>

<style scoped>

</style>
