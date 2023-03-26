<template>
  <pro-table
    ref="table"
    title="节目列表"
    :request="getProgramList"
    :columns="columns"
    :search="search"
    :pagination="pagination"
    @selectionChange="handleSelectionChange"
  >
    <template #toolbar>
      <el-button type="primary" @click="$router.push('/program/add')">
        创建节目
      </el-button>
      <el-button
        :disabled="selectedProgramIds.length <= 0"
        type="danger"
        @click="deleteProgram(selectedProgramIds.join(','))"
      >
        批量删除
      </el-button>
    </template>
    <template #status="{row}">
      <el-tag
        :type="row.status === '已发布' ? 'success' : 'danger'"
        style="font-size: 12px; margin-right: 5px;"
      >
        {{ row.status }}
      </el-tag>
    </template>
    <template #totalTime="{row}">{{ row.totalTime }} s</template>
    <template #imgUrl="{row}">
      <el-image
        style="width: 100%; height: 100%"
        :src="row.url"
        fit="contain"
      />
    </template>
    <template #updateTime="{row}">
      {{ parseTime(row.updateTime) }}
    </template>

    <template #operate="{row}">
      <el-button
        type="primary"
        size="mini"
        @click="$router.push(`/program/edit/${row.id}`)"
      >
        编辑
      </el-button>
      <el-button type="danger" size="mini" @click="deleteProgram(row.id)">
        删除
      </el-button>
      <el-button type="success" size="mini">
        发布
      </el-button>
    </template>
  </pro-table>
</template>

<script>
import * as API from '@/api/program'
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
          label: '缩略图',
          prop: 'imgUrl',
          tdSlot: 'imgUrl',
        },
        {
          label: '节目名称',
          prop: 'name',
        },
        {
          label: '分辨率',
          prop: 'resolution',
        },
        {
          label: '节目时长',
          prop: 'totalTime',
          tdSlot: 'totalTime',
        },
        {
          label: '节目大小',
          prop: 'size',
        },
        {
          label: '节目状态',
          prop: 'status',
          tdSlot: 'status',
        },
        {
          label: '作者',
          prop: 'author',
        },
        {
          label: '更新时间',
          prop: 'updateTime',
          tdSlot: 'updateTime',
        },
        {
          label: '操作',
          fixed: 'right',
          width: 200,
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
            label: '节目名称',
            name: 'programName',
          },
          {
            type: 'select',
            label: '分辨率',
            name: 'resolving',
            options: [],
          },
          {
            type: 'select',
            label: '节目状态',
            name: 'status',
          },
        ],
      },
      pagination: {
        pageSize: 10,
        pageSizes: [5, 10, 20, 50],
      },
      selectedProgramIds: [],
    })
    onBeforeMount(async () => {
      const data = [
        {
          name: '待发布',
          value: '待发布',
        },
        {
          name: '已发布',
          value: '已发布',
        },
        {
          name: '已失效',
          value: '已失效',
        },
        {
          name: '已结束',
          value: '已结束',
        },
      ]
      const data1 = [
        {
          name: '1080 *1920',
          value: '1080 *1920',
        },
        {
          name: '1080 *1920',
          value: '1080 *1920',
        },
      ]
      state.search.fields.find(item => item.name === 'status').options = data
      state.search.fields.find(
        item => item.name === 'resolving'
      ).options = data1
    })
    const getProgramList = async params => {
      const { data, total } = await API.getProgramList(params)
      console.log(data)
      return {
        data,
        total,
      }
    }

    const parseTime = time => {
      const date = new Date(time)
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

    const deleteProgram = () => {
      var programIds = state.selectedProgramIds
      ctx
        .$confirm('是否确定删除？', {
          type: 'warning',
        })
        .then(async () => {
          const { rspCode } = await API.deleteProgram(programIds)

          if (rspCode === '200') {
            ctx.$message.success('删除成功')
            table.value.refresh()
          }
        })
        .catch(() => {})
    }
    const handleSelectionChange = ev => {
      state.selectedProgramIds = ev.map(item => item.id)
    }
    return {
      ...toRefs(state),
      getProgramList,
      parseTime,
      deleteProgram,
      table,
      handleSelectionChange,
    }
  },
})
</script>
