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
    <!-- 工具栏 -->
    <template #toolbar>

      <el-dialog v-model="dialogFormVisible" width="25%">
        <div class="post">
          <add-view></add-view>
        </div>
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
      <el-button size="mini" type="danger">停用</el-button>
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
import { defineComponent, reactive, ref, toRefs } from 'vue'
import AddView from '../test/UserAdd.vue'
export default defineComponent({
  name: 'userList',
  components: {
    AddView,
  },
  setup() {
    const dialogTableVisible = ref(false)
    const dialogFormVisible = ref(false)
    const formLabelWidth = '440px'
    const state = reactive({
      // 表格列配置，大部分属性跟el-table-column配置一样
      columns: [
        { type: 'selection' },
        { label: '账户名', prop: 'account' , width: 180},
        { label: '所属机构', prop: 'mechanism' },
        { label: '所属角色', prop: 'role' },
        { label: '状态', prop: 'status'  },
        { label: '真实姓名', prop: 'realname' },
        { label: '手机号', prop: 'phonenumber' },
        { label: '邮箱', prop: 'emale' },
        { label: '更新时间', prop: 'time' },

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
            label: '账户名',
            name: 'nickName',
            defaultValue: '',
          },
          
          {
            label: '状态',
            name: 'status',
            type: 'select',
            defaultValue: 2,
            options: [
              {
                name: '所有',
                value: 2,
              },
              {
                name: '启用',
                value: 1,
              },
              {
                name: '停用',
                value: 0,
              },
            ],
          },
          
          {
            label: '所属机构',
            name: 'mechanism',
            type: 'select',
            defaultValue: 0,
            options: [
              {
                name: '城院罗老师测试',
                value: 1,
              },
              
              {
                name: '无',
                value: 0,
              },
            ],
          },
         
          
          {
            label: '所属角色',
            name: 'role',
            type: 'select',
            defaultValue: 0,
            options: [
            
              {
                name: '罗老师',
                value: 1,
              },
              {
                name: '无',
                value: 0,
              },
            ],
          },
          
         
          
        ],
      },
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
                    account:'sgh',
                    mechanism:'城院罗老师测试',
                    role:'罗老师',
                    status:'启用',
                    realname:'sgh',
                    phonenumber:'15888209766',
                    emale: '15888209766@163.com',
                  },
                  {
                    account:'nbh',
                    mechanism:'城院罗老师测试',
                    role:'罗老师',
                    status:'启用',
                    realname:'nbh',
                    phonenumber:'15888209766',
                    emale: '15888209766@163.com',
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
    const refresh = () => {
      table.value.refresh()
    }

    return { 
     ...toRefs(state),
     refresh, 
     table,
     dialogTableVisible,
     dialogFormVisible,
     formLabelWidth,}
  },
})
</script>
<style scoped>
.post {
  width: 100%;
  height: 100%;
}
</style>