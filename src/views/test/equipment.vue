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
        @click="$router.push('/test/add')"
      >
        批量导入
      </el-button>
      <el-button type="primary" icon="el-icon-download">
        模版下载
      </el-button>
      <el-button type="primary" icon="el-icon-delete" @click="batchDelete">
        批量删除
      </el-button>
      <el-button type="primary" icon="el-icon-control">
        批量控制
      </el-button>
      <el-button type="primary" icon="el-icon-output">
        数据导出
      </el-button>
    </template>
    <template #operate="scope">
      <el-button size="mini" type="primary">详情</el-button>
      <el-button size="mini" type="primary" disabled="dis">控制</el-button>
      <el-button size="mini" type="primary" @click="refresh">刷新</el-button>
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

export default defineComponent({
  name: 'eqList',
  setup() {
    const state = reactive({
      // 表格列配置，大部分属性跟el-table-column配置一样
      dis: false,
      columns: [
        { type: 'selection' },
        { label: '设备名称', prop: 'nickName', sortable: true, width: 150 },
        { label: '所属机构', prop: 'institution' },
        { label: '所属分组', prop: 'group' },
        { label: 'MAC地址', prop: 'address' },
        { label: '分辨率', prop: 'resolution' },
        { label: '设备状态', prop: 'state' },
        { label: '系统升级', prop: 'version' },
        { label: '当前计划', prop: 'plan' },
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
            label: '设备名称',
            name: 'nickName',
            defaultValue: '',
          },
          {
            type: 'text',
            label: '所属机构',
            name: 'institution',
          },
          {
            label: '所属分组',
            name: 'group',
            type: 'text',
          },
          {
            label: 'MAC地址',
            name: 'address',
            type: 'text',
          },
          {
            type: 'text',
            label: '分辨率',
            name: 'resolution',
            defaultValue: '',
          },
          {
            label: '设备状态',
            name: 'status',
            type: 'select',
            defaultValue: 1,
            options: [
              {
                name: '全部',
                value: 1,
              },
              {
                name: '播放',
                value: 2,
              },
              {
                name: '空闲',
                value: 3,
              },
              {
                name: '离线',
                value: 4,
              },
            ],
          },
          {
            label: '系统版本',
            name: 'version',
            type: 'select',
            defaultValue: 1,
            options: [
              {
                name: '全部',
                value: 1,
              },
              {
                name: '已是最新',
                value: 2,
              },
              {
                name: '升级',
                value: 3,
              },
              {
                name: '有新版本',
                value: 4,
              },
            ],
          },
          {
            label: '当前计划',
            name: 'plan',
            type: 'text',
          },
          {
            label: 'SN',
            name: 'sn',
            type: 'text',
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
                    nickName: '测试勿删',
                    institution: '城院罗老师测试',
                    group: '11111',
                    address: 'A0BB3ED2F376',
                    resolution: '1920x1080',
                    status: '离线',
                    version: '已是最新',
                    plan: '-',
                  },
                  {
                    id: 2,
                    nickName: '测试勿删2',
                    institution: '城院罗老师测试',
                    group: '11111',
                    address: 'A0BB3ED2F376',
                    resolution: '1920x1080',
                    status: '空闲',
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
    const refresh = () => {
      table.value.refresh()
    }

    return { ...toRefs(state), refresh, table }
  },
})
</script>
