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
      <el-button type="info" @click="refresh()">
        刷新
      </el-button>
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
  <el-dialog
    v-model="dialogVisible"
    width="70%"
    title="导入班级"
    :before-close="handleClose"
  >
  <el-form :model="form">
    <el-form-item label="班级名称">
      <el-input v-model="form.className"></el-input>
    </el-form-item>
    <el-form-item style="text-align: center;" >
      <el-button type="primary" @click="submit">确定</el-button>
      <el-button type="danger" @click="clearForm">取消</el-button>
    </el-form-item>
  </el-form>
  </el-dialog>

<el-dialog
    v-model="dialogImportVisible"
    width="70%"
    title="导入学生"
    :before-close="handleClose"
  >
  <!-- 子父组件传值 -->
  <import-stu :id="selectItem.id" :className="selectItem.className"  @close="dialogImportVisible = false"></import-stu>
  </el-dialog>
</template>

<script>
import * as API from '@/api/classes'
import { defineComponent, ref, getCurrentInstance, reactive, toRefs } from '@vue/runtime-core'
import importStu from './importStu.vue'

export default defineComponent({
  components: { importStu },
  setup() {
    const table = ref(null)

    const instance = getCurrentInstance()
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
      selectItem: {},
      dialogVisible: false,
      dialogImportVisible: false,
      form: {
        id: '',
        className: '',
      },
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
      state.selectedPlanIds = ev.map(item => item.id)
     state.selectItem = ev[0]
     console.log('state.selectItem',JSON.stringify(state.selectItem));
    }
    const addClass = () => {
      state.dialogVisible = true
      
    }

const submit = async () => {
  var form=state.form
  console.log(form)
  const { rspCode } = await API.add(form)
  if (rspCode === '200') {
     instance.proxy.$message({
    message: '创建成功',
    type: 'success',
  })
    state.dialogVisible = false
    table.value.refresh()
  } else {
    instance.proxy.$message({
    message: '创建失败',
    type: 'error',
  })
  }
}
const clearForm = () => {
  state.dialogVisible = false
  state.form = {
    id: '',
    className: '',
  }
}
const refresh = () => {
  table.value.refresh()
}
const importStu=async ()=>{
  if(state.selectedPlanIds.length<=0){
    instance.proxy.$message({
    message: '请选择班级',
    type: 'error',
    })
    return;
  }else if(state.selectedPlanIds.length>1){
    instance.proxy.$message({
    message: '只能选择一个班级',
    type: 'error',
    })
    return;
  }
  state.dialogImportVisible=true
  //传入子组件

}
    return {
      ...toRefs(state),
      getClassesList,
      parseTime,
      deletePlan,
      table,
      addClass,
      handleSelectionChange,
      submit,
      clearForm,
      refresh,
      importStu,
    }
  },
  })
</script>

<style>

</style>