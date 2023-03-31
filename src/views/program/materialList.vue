<template>
  <pro-table
    ref="table"
    title="素材列表"
    :request="getPlanList"
    :columns="columns"
    :search="search"
    :pagination="pagination"
    @selectionChange="handleSelectionChange"
  >
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
      <el-button size="mini" @click="preview">
        预览
      </el-button>
      <el-button
        type="primary"
        size="mini"
        @click="$router.push(`/plan/edit/${row.id}`)"
      >
        重命名
      </el-button>
      <el-button type="danger" size="mini" @click="deletePlan([row.id])">
        删除
      </el-button>
      <el-button type="info" size="mini">
        下载
      </el-button>
    </template>
  </pro-table>
</template>

<script>
import * as API from '@/api/classes'
import { defineComponent, ref, getCurrentInstance, reactive, toRefs } from 'vue'

export default defineComponent({
  setup(props, { emit }) {
    const table = ref(null)
    const { ctx } = getCurrentInstance()
    const state = reactive({
      columns: [
        {
          type: 'selection',
        },
        {
          label: '缩略图',
          prop: 'url',
          tdSlot: 'imgUrl',
        },
        {
          label: '名称',
          prop: 'name',
        },
        {
          label: '分辨率',
          prop: 'resolution',
        },
        {
          label: '大小',
          prop: 'size',
        },
        {
          label: '引用节目',
          prop: 'belongProgram',
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
            label: '素材名称',
            name: 'planName',
          },
        ],
      },
      pagination: {
        pageSize: 10,
        pageSizes: [5, 10, 20, 50],
      },
      selectedPlanIds: [],
      filelist: [],
    })
    const getPlanList = async params => {
      const { data, total } = await API.getList(params)
      state.filelist = data
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

    const deletePlan = planIds => {
      ctx
        .$confirm('是否确定删除？', {
          type: 'warning',
        })
        .then(async () => {
          console.log(planIds)
          const { rspCode } = await API.deleteFile(planIds)
          console.log(rspCode)
          if (rspCode === '200') {
            ctx.$message.success('删除成功')
            table.value.refresh()
          }
        })
        .catch(() => {})
    }
    const handleSelectionChange = ev => {
      state.selectedPlanIds = ev.map(item => item.id)
      state.filelist = ev
      console.log(state.filelist)
      emit('select', state.filelist)
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
