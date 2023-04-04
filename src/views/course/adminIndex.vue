<template>
  <pro-table
    ref="table"
    title="课程管理"
    :request="getList"
    :columns="columns"
    :search="searchConfig"
    :pagination="paginationConfig"
    @selectionChange="handleSelectionChange"
  >
  <template #teacher="{ row }">
      {{row.teacher.name}}
    </template>
  <template #state="{ row }">
        <el-tag v-if="row.state === '未开始'" type="info">未开始</el-tag>
        <el-tag v-if="row.state === '进行中'" type="success">进行中</el-tag>
<el-tag v-if="row.state === '已结束'" type="warning">已结束</el-tag>

    </template>
    <!-- 工具栏 -->
    <template #toolbar>
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
      <el-button size="mini" type="primary" @click="dialogFormVisible = true">
        编辑
      </el-button>
      <el-button size="mini" type="danger">删除</el-button>
    </template>
  </pro-table>
</template>

<script>
import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  getCurrentInstance,
} from "vue";
import * as API from "@/api/Course";
export default defineComponent({
  name: "courseList",
  setup() {
    const formLabelWidth = "440px";
    const instance = getCurrentInstance();
    const state = reactive({
      // 表格列配置，大部分属性跟el-table-column配置一样
      columns: [
        { type: "selection" },
        { label: "课程名称", prop: "courseName", width: 120 },
        { label: "开始时间", prop: "startTime", minWidth: 120 },
        { label: "结束时间", prop: "endTime", minWidth: 140 },
        { label: "课程状态", prop: "state", width: 120, tdSlot: "state"},
        { label: "任课老师", prop: "teacher", width: 120, tdSlot: "teacher" },
        { label: "课程小节数", prop: "sessionNum" },
        {
          label: "操作",
          width: 250,
          align: "center",
          tdSlot: "operate", // 自定义单元格内容的插槽名称
        },
      ],
      // 搜索配置
      searchConfig: {
        labelWidth: "90px", // 必须带上单位
        inputWidth: "360px", // 必须带上单位
        fields: [
          {
            type: "text",
            label: "课程名称",
            name: "courseName",
            defaultValue: "",
          },
          {
            type: "button",
            label: "管理员",
            name: "role",
            defaultValue: "admin",
            disabled: true,
          },
        ],
      },
      // 分页配置
      paginationConfig: {
        layout: "total, prev, pager, next, sizes", // 分页组件显示哪些功能
        pageSize: 10, // 每页条数
        pageSizes: [10, 20, 30, 40],
        style: { textAlign: "left" },
      },
      selectedItems: [],
      batchDelete() {
        console.log(state.selectedItems == 0);
        if (state.selectedItems.length == 0) {
          instance.proxy.$message({
            message: "请选择要删除的用户",
            type: "error",
          });
          return;
        }
        instance.proxy
          .$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(async () => {
            const ids = state.selectedItems.map((item) => item.id);
            const res = await API.deleteUser(ids);
            if (res.rspCode == 200) {
              instance.proxy.$message({
                message: "删除成功",
                type: "success",
              });
              instance.proxy.getList();
            } else {
              instance.proxy.$message({
                message: "删除失败",
                type: "error",
              });
            }
          })
          .catch(() => {
            instance.proxy.$message({
              message: "已取消删除",
              type: "info",
            });
          });
      },
      // 选择
      handleSelectionChange(arr) {
        state.selectedItems = arr;
      },
      //获取列表
      async getList(params) {
        const data = await API.getList(params).then((res) => {
          if (res.rspCode == 200) {
            instance.proxy.$message({
              message: "获取列表成功",
              type: "success",
            });
            return res.data;
          } else {
            instance.proxy.$message({
              message: "获取列表失败",
              type: "error",
            });
            return [];
          }
        });
        data.forEach((item) => {
          item["sessionNum"] = countSessions(item["sessions"]);
          item['state']=exState(item)
        });

        return {
          data: data,
          total: data.length,
        };
      },
    });
    const exState=(obj)=>{
        var startTime = new Date(obj.startTime);
        var endTime = new Date(obj.endTime);
        var now = new Date();
        if(startTime>now){
            return "未开始";
        }else if(startTime<now&&endTime>now){
           return  "进行中";
        }else{
            return "已结束";
        }

    }
    const countSessions = (obj) => {
      let count = 0;
      if (obj instanceof Array) {
        obj.forEach((item) => {
          count += countSessions(item);
        });
      } else if (obj instanceof Object) {
        if (obj.hasOwnProperty("sessionName")) {
          count += 1;
        }
        Object.keys(obj).forEach((key) => {
          count += countSessions(obj[key]);
        });
      }
      return count;
    };
    const table = ref(null);
    const refresh = () => {
      table.value.refresh();
    };

    return {
      ...toRefs(state),
      refresh,
      table,
      countSessions,
      formLabelWidth,
    };
  },
});
</script>
<style scoped>
.post {
  width: 100%;
  height: 100%;
}
</style>