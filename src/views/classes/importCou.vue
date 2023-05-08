<template>
  <el-form>
    <el-form-item label="导入课程">
      <el-input v-model="className" disabled="true"></el-input>
    </el-form-item>
    <el-form-item>
      <pro-table
        ref="table"
        :request="getList"
        :columns="columns"
        :search="searchConfig"
        :pagination="paginationConfig"
        @selectionChange="handleSelectionChange"
      >
      </pro-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="confirm">确定</el-button>
      <el-button type="primary" @click="close">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  getCurrentInstance,
  onMounted,
} from "vue";
import * as API from "@/api/Course";
export default defineComponent({
    props: {
        id: {
            type: Number,
            default: 0,
        },
        className: {
            type: String,
            default: "",
        },
    },
  setup(props) {
    const instance = getCurrentInstance();
    const state = reactive({
      // 表格列配置，大部分属性跟el-table-column配置一样
      columns: [
        { type: "selection" },
        { label: "课程名称", prop: "courseName", width: 120 },
        { label: "教师名称", prop: "teacherName", width: 80 },
        { label: "开始时间", prop: "startTime" },
        { label: "结束时间", prop: "endTime" },
      ],
      // 搜索配置
      searchConfig: {
        labelWidth: "90px", // 必须带上单位
        inputWidth: "360px", // 必须带上单位
        fields: [
          {
            type: "text",
            label: "课程名",
            name: "courseName",
            defaultValue: "",
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
        params.role = "admin";
        const data = await API.getList(params).then((res) => {
          if (res.rspCode == 200) {
            instance.proxy.$message({
              message: "获取列表成功",
              type: "success",
            });
            //startTime endTime格式化
            res.data.content.forEach((item) => {
              item.startTime = item.startTime.substring(0, 10);
              item.endTime = item.endTime.substring(0, 10);
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
        return {
          data: data.content,
          total: data.totalElements,
        };
      },
    });
    const className = ref(props.className);
    const classId = ref(props.id);
    const table = ref(null);
    const confirm = async () => {
        if(state.selectedItems.length == 0){
            instance.proxy.$message({
                message: "请选择要导入的课程",
                type: "error",
              });
              return;
        }
        var ids=state.selectedItems.map((item) => item.id).toString();
        const res = await API.importCou({
            courseId:ids,
            classId: classId.value,
        });
      if (res.rspCode == 200) {
        instance.proxy.$message({
          message: "导入成功",
          type: "success",
        });
        instance.proxy.$emit("close");
      } else {
        instance.proxy.$message({
          message: res.data,
          type: "error",
        });
      }
    };
    const close = () => {
      instance.proxy.$emit("close");
    };

    return {
      ...toRefs(state),
      table,
      confirm,
      className,
      classId,
      close,
    };
  },
});
</script>

<style>

</style>