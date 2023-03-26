<template>
  <el-form :model="form" label-width="100px">
    <el-form-item label="账户名">
      <el-input v-model="formInline.user" placeholder="" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formInline.password" placeholder="" />
    </el-form-item>
    <el-form-item label="所属机构">
      <el-select v-model="formInline.mechanism" placeholder="">
        <el-option label="城院罗老师测试" value="value1" />
      </el-select>
    </el-form-item>
    <el-form-item label="所属角色">
      <el-select v-model="formInline.role" placeholder="">
        <el-option label="罗老师" value="value1" />
      </el-select>
    </el-form-item>
    <el-form-item label="账号状态">
      <el-select v-model="formInline.status" placeholder="">
        <el-option label="启用" value="value1" />
        <el-option label="停用" value="value2" />
      </el-select>
    </el-form-item>
    <el-form-item label="真实姓名">
      <el-input v-model="formInline.name" placeholder="" />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="formInline.email" placeholder="" />
    </el-form-item>
    <el-form-item label="手机号">
      <el-input v-model="formInline.phonenumber" placeholder="" />
    </el-form-item>

    <el-form-item class="btn2">
      <el-button>返回</el-button>
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { reactive, toRefs } from 'vue'
import { ref } from 'vue'

export default {
  setup() {
    const state = reactive({
      // 表格列配置，大部分属性跟el-table-column配置一样
      dis: false,
      columns: [
        { type: 'selection' },
        { label: '设备名称', prop: 'nickName', sortable: true, width: 150 },
        { label: 'MAC地址', prop: 'address' },
        { label: '分辨率', prop: 'resolution' },
        { label: '所属机构', prop: 'institution' },
        { label: '当前计划', prop: 'plan' },
        { label: '设备状态', prop: 'status' },
      ],
      // 分页配置
      paginationConfig: {
        layout: 'total, prev, pager, next, sizes', // 分页组件显示哪些功能
        pageSize: 5, // 每页条数
        pageSizes: [5, 10, 20, 50],
        style: { textAlign: 'left' },
      },
      selectedItems: [],
      batchDelete() {
        console.log(state.selectedItems)
      },
      // 选择
      handleSelectionChange(arr) {
        state.selectedItems = arr
      },
      // 请求函数
      async getList(params) {
        console.log(params)
        // params是从组件接收的，包含分页和搜索字段。
        const { data } = await new Promise(rs => {
          setTimeout(() => {
            rs({
              code: 200,
              data: {
                list: [
                  {
                    id: 1,
                    nickName: '测试勿删',
                    institution: '城院罗老师测试',
                    group: '11111',
                    address: 'A0BB3ED2F376',
                    resolution: '1920x1080',
                    status: '离线',
                    version: '已是最新',
                    plan: '-',
                  },
                ],
                total: 100,
              },
            })
          }, 3000)
        })

        // 必须要返回一个对象，包含data数组和total总数
        return {
          data: data.list,
          total: +data.total,
        }
      },
    })
    const table = ref(null)
    const form = reactive({
      name: '',
      institution: '',
      description: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: '',
    })
    const formInline = reactive({
      user: '',
      region: '',
    })
    const value = ref('')
    const input3 = ref('')
    const onSubmit = () => {
      console.log('submit!')
    }
    return {
      ...toRefs(state),
      form,
      onSubmit,
      value,
      input3,
      formInline,
      table,
    }
  },
}
// do not use same name with ref
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
