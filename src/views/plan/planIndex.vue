<template>
  <pro-table
    ref="table"
    title="计划列表"
    :request="getPlanList"
    :columns="columns"
    :search="search"
    :pagination="pagination"
    @selectionChange="handleSelectionChange"
  >
    <template #toolbar>
      <el-button type="primary" @click="$router.push('/plan/add')">
        创建计划
      </el-button>
      <el-button
        :disabled="selectedPlanIds.length <= 0"
        type="danger"
        @click="deletePlan(selectedPlanIds.join(','))"
      >
        批量删除
      </el-button>
    </template>

    <template #createTime="{row}">
      {{ parseTime(row.createTime) }}
    </template>

    <template #operate="{row}">
      <el-button
        type="primary"
        size="mini"
        @click="$router.push(`/plan/edit/${row.id}`)"
      >
        编辑
      </el-button>
      <el-button type="danger" size="mini" @click="deletePlan(row.id)">
        删除
      </el-button>
      <el-button type="success" size="mini">
        发布
      </el-button>
    </template>
  </pro-table>
</template>

<script>
import * as API from '@/api/plan'
import {
  defineComponent,
  ref,
  getCurrentInstance,
  onBeforeMount,
  reactive,
  toRefs,
} from 'vue'

export default defineComponent({
  setup() {
    const table = ref(null)
    const { ctx } = getCurrentInstance()
    const state = reactive({
      columns: [
        {
          type: 'selection',
        },
        {
          label: '计划名称',
          prop: 'planName',
        },
        {
          label: '缩略图',
          prop: 'image',
        },
        {
          label: '作者',
          prop: 'author',
        },
        {
          label: '计划状态',
          prop: 'state',
        },
        {
          label: '更新时间',
          prop: 'createTime',
          tdSlot: 'createTime',
        },
        {
          label: '操作',
          fixed: 'right',
          width: 300,
          align: 'center',
          tdSlot: 'operate',
        },
      ],
      search: {
        labelWidth: '88px',
        inputWidth: '320px',
        fields: [
          {
            type: 'text',
            label: '计划名称',
            name: 'planName',
          },
          {
            type: 'select',
            label: '计划状态',
            name: 'state',
            options: [],
          },
          {
            type: 'datetime',
            label: '更新时间',
            name: 'createTime',
          },
        ],
      },
      pagination: {
        pageSize: 10,
        pageSizes: [5, 10, 20, 50],
      },
      selectedPlanIds: [],
    })
    onBeforeMount(async () => {
      const { data } = await API.getRoleList()
      state.search.fields.find(item => item.name === 'state').options = data
    })
    const getPlanList = async params => {
      const { data, total } = await API.getPlanList(params)
      return {
        data,
        total,
      }
    }

    const parseTime = time => {
      const date = new Date(+time)
      const y = date.getFullYear()
      const m =
        date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1
      const d = date.getDate() < 10 ? '0' + date.getDate() : +date.getDate()
      const s = date.getHours() < 10 ? '0' + date.getHours() : +date.getHours()
      const f =
        date.getMinutes() < 10 ? '0' + date.getMinutes() : +date.getMinutes()
      const e =
        date.getSeconds() < 10 ? '0' + date.getSeconds() : +date.getSeconds()
      return y + '-' + m + '-' + d + ' ' + s + ':' + f + ':' + e
    }

    const deletePlan = planIds => {
      ctx
        .$confirm('是否确定删除？', {
          type: 'warning',
        })
        .then(async () => {
          const { code } = await API.deletePlan(planIds)

          if (+code === 200) {
            ctx.$message.success('删除成功')
            table.value.refresh()
          }
        })
        .catch(() => {})
    }
    const handleSelectionChange = ev => {
      state.selectedPlanIds = ev.map(item => item.id)
    }
    return {
      ...toRefs(state),
      getPlanList,
      parseTime,
      deletePlan,
      table,
      handleSelectionChange,
    }
  },
})
</script>
