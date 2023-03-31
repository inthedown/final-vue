<template>
   <pro-table
    ref="table"
    title="班级列表"
    :request="getClassesList"
    :columns="columns"
    :search="search"
    :pagination="pagination"
    @selectionChange="handleSelectionChange"
  >
    <template #toolbar>
      <el-button type="primary" @click="importStu()">
        导入学生
      </el-button>
      <el-button type="primary" @click="importCouse()">
        导入课程
      </el-button>
      <el-button type="primary" @click="addClass()">
        创建班级
      </el-button>
      <el-button
        :disabled="selectedPlanIds.length <= 0"
        type="danger"
        @click="deletePlan(selectedPlanIds)"
      >
        批量删除
      </el-button>
    </template>
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
  setup() {
    const table = ref(null)
    const { ctx } = getCurrentInstance()
    const state = reactive({
      columns: [
        {
          type: 'selection',
        },
        {
          label: '班级名称',
          prop: 'className',
        },
        {
          label: '学生人数',
          prop: 'studentNum',
        },
        {
          label: '课程数量',
          prop: 'courseName',
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
            label: '班级名称',
            name: 'className',
          },
        ],
      },
      pagination: {
        pageSize: 10,
        pageSizes: [5, 10, 20, 50],
      },
      selectedPlanIds: [],
    })
    const getClassesList = async params => {
      const { data, total } = await API.getList(params)
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
      console.log(ev)
      state.selectedPlanIds = ev.map(item => item.id)
    }
    return {
      ...toRefs(state),
      getClassesList,
      parseTime,
      deletePlan,
      table,
      handleSelectionChange,
    }
  },
  })
</script>

<style>

</style>