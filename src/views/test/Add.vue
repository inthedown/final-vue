<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="分组名称">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="所属机构">
      <el-input v-model="form.institution" />
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="form.description" />
    </el-form-item>
    <span>*设备选择：</span>
    <div class="select">
      <div class="head">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="设备名称">
            <el-input v-model="formInline.user" placeholder="" />
          </el-form-item>
          <el-form-item label="分辨率">
            <el-select v-model="formInline.region" placeholder="">
              <el-option label="全部分辨率" value="value1" />
              <el-option label="1920x1080" value="value2" />
              <el-option label="1080x1920" value="value3" />
              <el-option label="3840x2160" value="value4" />
              <el-option label="2160x3840" value="value5" />
            </el-select>
          </el-form-item>
          <el-form-item class="btn1">
            <el-button type="default" @click="onSubmit">重置</el-button>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="block">
        <pro-table
          ref="table"
          :request="getList"
          :columns="columns"
          :search="searchConfig"
          :pagination="paginationConfig"
          @selectionChange="handleSelectionChange"
        ></pro-table>
      </div>
    </div>
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
