<template>
  <el-form :model="form" label-width="100px">
    <el-form-item label="账户名">
      <el-input v-model="form.userName" placeholder="" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.password" placeholder="" />
    </el-form-item>
    <el-form-item label="真实姓名">
      <el-input v-model="form.name" placeholder="" />
    </el-form-item>
    <el-form-item label="所属角色">
      <el-select v-model="form.roleId" placeholder="">
        <el-option label="管理员" value="1" />
        <el-option label="学生" value="2" />
        <el-option label="教师" value="3" />
      </el-select>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="form.email" placeholder="" />
    </el-form-item>
    <el-form-item label="年纪">
      <el-input v-model="form.grade" placeholder="" />
    </el-form-item>
    <el-form-item label="信息">
      <el-input v-model="form.info" placeholder="" />
    </el-form-item>

    <el-form-item class="btn2">
      <el-button>返回</el-button>
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { reactive, toRefs ,  getCurrentInstance } from 'vue'
import { ref } from 'vue'
import * as API from '@/api/user'
export default {
  //接收父组件传递的参数
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    

    const instance = getCurrentInstance()
     const form = reactive({
    userName: '',
    password: '',
    name: '',
    roleId: '',
    email: '',
    grade: '',
    info: '',
  })

  const onSubmit = async () => {
    await API.addUser(form).then((res) => {
      console.log('res'+JSON.stringify(res));
      if (res.rspCode == '200') {
         instance.proxy.$message({
          message: res.rspMsg,
          type: 'success',
        })
        console.log('instance'+JSON.stringify(instance.proxy));
       //传给父组件,将dialogFormVisible设置为false
        instance.proxy.dialogFormVisible = false
        instance.proxy.$emit('refresh')
        //跳转到用户列表
        instance.proxy.$router.push('/usermanage')
      } else {
         instance.proxy.$message({
          message: res.errMsg,
          type: 'error',
        })
      }
      onReset()
    })
  }
  function onReset() {
    form.userName = ''
    form.password = ''
    form.name = ''
    form.roleId = ''
    form.email = ''
    form.grade = ''
    form.info = ''
  }
  return {
    form,
    onSubmit,
    onReset
  }
  },
}

</script>
<style scoped>
.select {
  border: 1px solid rgb(172, 170, 170);
}
.head {
  padding: 10px;
}
.btn1 {
  float: right;
  height: 40px;
}
.btn2 {
  margin-top: 20px;
  text-align: center;
}
</style>
