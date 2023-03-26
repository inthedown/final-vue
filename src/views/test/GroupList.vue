<template>
  <pro-table
    ref="table"
    title="列表"
    :request="getList"
    :columns="columns"
    :search="searchConfig"
    :pagination="paginationConfig"
    @selectionChange="handleSelectionChange"
  >
    <!-- 工具栏 -->
    <template #toolbar>
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="dialogFormVisible = true"
      >
        新建分组
      </el-button>
      <el-dialog v-model="dialogFormVisible" width="70%">
        <div class="post">
          <add-view></add-view>
        </div>
      </el-dialog>
    </template>
    <template #operate="scope">
      <el-button size="mini" type="primary">详情</el-button>
      <el-button
        size="mini"
        type="primary"
        @click="$router.push(`/test/edit/${scope.row.id}`)"
      >
        编辑
      </el-button>
      <el-button size="mini" type="danger">删除</el-button>
    </template>
  </pro-table>
</template>

<script>
import { defineComponent, reactive, ref, toRefs } from 'vue'
import AddView from '../test/Add.vue'
export default defineComponent({
  name: 'groupList',
  components: {
    AddView,
  },
  setup() {
    const dialogTableVisible = ref(false)
    const dialogFormVisible = ref(false)
    const formLabelWidth = '440px'
    const state = reactive({
      // 表格列配置，大部分属性跟el-table-column配置一样
      dis: false,
      columns: [
        { type: 'selection' },
        { label: '分组ID', prop: 'Id', sortable: true, width: 150 },
        { label: '分组名称', prop: 'groupName' },
        { label: '所属机构', prop: 'institution' },
        { label: '设备数量', prop: 'num' },
        { label: '描述', prop: 'description' },
        {
          label: '操作',
          width: 360,
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
            label: '分组名称',
            name: 'groupName',
          },
          {
            type: 'text',
            label: '所属机构',
            name: 'institution',
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
                    id: 1,
                    nickName: 'zhangsan',
                    userEmail: 'zhangsan@xx.com',
                  },
                  {
                    id: 2,
                    nickName: 'lisi',
                    userEmail: 'lisi@xx.com',
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
      formLabelWidth,
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
