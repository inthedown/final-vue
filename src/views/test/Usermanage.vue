<template>
  <pro-table
    ref="table"
    title="用户管理"
    :request="getList"
    :columns="columns"
    :search="searchConfig"
    :pagination="paginationConfig"
    @selectionChange="handleSelectionChange"
  >
  <template #password="{ row }">
      <!-- 默认时为*******,点击按钮解密 -->
       {{row.password!=null?'*******':null}}
       <el-button @click="seePwd(row.id)" icon="el-icon-view" size="mini" title="查看/隐藏"></el-button>
    </template>
    <template #roleId="{ row }">
      <el-tag v-if="row.roleId == 1" type="success">管理员</el-tag>
      <el-tag v-else-if="row.roleId == 2" type="info">学生</el-tag>
      <el-tag v-else type="warning">教师</el-tag>
    </template>
    <!-- 工具栏 -->
    <template #toolbar>
      <el-dialog v-model="dialogFormVisible" width="60%">
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
      </el-dialog>

      <el-button type="primary" icon="el-icon-delete" @click="batchDelete">
        批量删除
      </el-button>
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="dialogFormVisible = true"
      >
        添加
      </el-button>
      <el-button type="primary" icon="el-icon-refresh" @click="refresh">
        刷新
      </el-button>
    </template>
    <template #operate>
      <el-button
        size="mini"
        type="primary"
        @click="dialogFormVisible = true"
      >
        编辑
      </el-button>
      <el-button size="mini" type="danger">删除</el-button>
    </template>
  </pro-table>
</template>

<script>
import { defineComponent, reactive, ref, toRefs , getCurrentInstance} from 'vue'
import * as API from'@/api/user'
export default defineComponent({
  name: 'userList',

  setup() {
    const dialogTableVisible = ref(false)
    const dialogFormVisible = ref(false)
    const insertVisible = ref(false)
    const formLabelWidth = '440px'
    const instance = getCurrentInstance()
    const state = reactive({
      // 表格列配置，大部分属性跟el-table-column配置一样
      columns: [
        { type: 'selection' },
        { label: '用户名', prop: 'userName' , width: 120},
        { label: '角色', prop: 'roleId', width: 80,tdSlot:'roleId' },
        { label: '真实姓名', prop: 'name' },
        { label: '密码', prop: 'password',width:120,tdSlot:'password' },
        { label: '邮箱', prop: 'email' },
        {label:'年级',prop:'grade'},
        { label: '更新时间', prop: 'createTime', width: 160 },
        {label:'信息',prop:'info'},
        {
          label: '操作',
          width: 250,
          align: 'center',
          tdSlot: 'operate', // 自定义单元格内容的插槽名称
        },
      ],
      // 搜索配置
      searchConfig: {
        labelWidth: '90px', // 必须带上单位
        inputWidth: '360px', // 必须带上单位
        fields: [
          {
            type: 'text',
            label: '用户名',
            name: 'userName',
            defaultValue: '',
          }, 
          {
            label: '角色',
            name: 'roleId',
            type: 'select',
            defaultValue: '',
            options: [
              {
                name: '管理员',
                value: 1,
              },
              {
                name: '教师',
                value: 3,
              },
              {
                name: '学生',
                value: 2,
              },
            ],
          },
          
         
          
        ],
      },
      // 分页配置
      paginationConfig: {
        layout: 'total, prev, pager, next, sizes', // 分页组件显示哪些功能
        pageSize: 10, // 每页条数
        pageSizes: [10, 20, 30, 40],
        style: { textAlign: 'center' },
      },
      selectedItems: [],
      batchDelete() {
        console.log(state.selectedItems==0)
        if(state.selectedItems.length==0){
          instance.proxy.$message({
            message: '请选择要删除的用户',
            type: 'error',
          })
          return
        }
        instance.proxy.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(async () => {
            const ids = state.selectedItems.map((item) => item.id)
            const res = await API.deleteUser(ids)
            if (res.rspCode == 200) {
              instance.proxy.$message({
                message: '删除成功',
                type: 'success',
              })
              instance.proxy.getList()
            } else {
              instance.proxy.$message({
                message: '删除失败',
                type: 'error',
              })
            }
          })
          .catch(() => {
            instance.proxy.$message({
              message: '已取消删除',
              type: 'info',
            })
          })
      },
      insert() {
        if(state.selectedItems.length==0){
          instance.proxy.$message({
            message: '请选择要导入的用户',
            type: 'error',
          })
          return
        }
        instance.proxy.insertVisible = true
      
      },
      // 选择
      handleSelectionChange(arr) {
        state.selectedItems = arr
      },
      //获取列表
      async getList(params) {
        const {list,total}=  await API.getList(params).then((res) => {
          if (res.rspCode == 200) {
            instance.proxy.$message({
              message: '获取列表成功',
              type: 'success',
            })
            return {
              list: res.data.list,
              total: res.data.total,
            };
          } else {
            instance.proxy.$message({
              message: '获取列表失败',
              type: 'error',
            })
            return [];
          }
        })
         return {
          data: list,
          total: total,
        }
      },
      roleList: [
        {
          name: '管理员',
          value: 1,
        },
        {
          name: '教师',
          value: 3,
        },
        {
          name: '学生',
          value:2,
        },
      ],
    })
    const table = ref(null)
    const refresh = () => {
      table.value.refresh()
    }
    const seePwd = async(row) => {
      
      await API.seePwd(row).then((res) => {
        if (res.rspCode == '200') {
          instance.proxy.$message({
            message: '获取密码成功,'+res.data,
            type: 'success',
          })
    
        
        } else {
          instance.proxy.$message({
            message: '获取密码失败',
            type: 'error',
          })
        }
      })
     
    }
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
    
      } else {
         instance.proxy.$message({
          message: res.errMsg,
          type: 'error',
        })
      }
      onReset()
      refresh()
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
     ...toRefs(state),
     refresh, 
     table,
     dialogTableVisible,
     insertVisible,
     seePwd,
     dialogFormVisible,
     formLabelWidth,
      form,
    onSubmit,
    onReset
     }
  },
})
</script>
<style scoped>
.post {
  width: 100%;
  height: 100%;
}
</style>