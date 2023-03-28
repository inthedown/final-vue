<template>
  <el-form label-width="90px">
    <el-form-item label="课程名称">
      <el-input v-model="state.name" />
    </el-form-item>
    <el-form-item label="任课班级">
      <el-select v-model="state.classes" placeholder="please select your class">
        <el-option label="计算1902" value="js1902" />
        <el-option label="大数据1901" value="sj1901" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <draw-mapv-2  @childClick="handleChildClick"></draw-mapv-2>
    </el-form-item>
    <el-form-item>
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
  teacherId: '1',
  data: [],
})

const instance = getCurrentInstance()
const handleChildClick = param => {
  console.log('接收到子组件传递的参数：', param)
  console.log('接收到子组件传递的参数：',param.date)
  console.log('接收到子组件传递的参数：',JSON.stringify(param.date))
  state.data = param
}
// const filterData=(data)=> {
  
//   if (Array.isArray(data)) { // 如果是数组，递归处理每个元素
//     return data.map(filterData);
//   } else if (typeof data === 'object') { // 如果是对象，筛掉指定属性后递归处理子对象
//     const { x, y, depth, type, style,currency,rate,status,variableName,variableValue,variableUp, ...rest } = data;
 
//     const filteredObj = {};
//     for (const key in rest) {
//       console.log('key',key);
    
//       filteredObj[key] = filterData(rest[key]);
//     }
//     return filteredObj;
//   } else { // 如果不是数组或对象，直接返回
//     return data;
//   }
// }


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
      classes: state.classes,
      teacherId: state.teacherId,
      data:filterObject( state.data),
    }
    console.log(JSON.stringify(data))
    axios.post('/api/course/add', data).then(res => {
      if (res.data.rspCode === '200') {
        instance.proxy.$message({
          message: '课程创建成功',
          type: 'success',
        })
        instance.proxy.$router.push('/course')
      } else {
        instance.proxy.$message({
          message: '课程创建失败',
          type: 'error',
        })
      }
    })
  }
}
onMounted(() => {

})
</script>

<style scoped></style>
