<template>
  <el-form>
    <el-form-item label="导入班级">
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
        <template #password="{ row }">
          <!-- 默认时为*******,点击按钮解密 -->
          {{ row.password != null ? "*******" : null }}
          <el-button
            @click="seePwd(row.id)"
            icon="el-icon-view"
            size="mini"
            title="查看/隐藏"
          ></el-button>
        </template>
        <template #roleId="{ row }">
          <el-tag v-if="row.roleId == 1" type="success">管理员</el-tag>
          <el-tag v-else-if="row.roleId == 2" type="info">学生</el-tag>
          <el-tag v-else type="warning">教师</el-tag>
        </template>
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
import * as API from "@/api/user";
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
        { label: "用户名", prop: "userName", width: 120 },
        { label: "角色", prop: "roleId", width: 80, tdSlot: "roleId" },
        { label: "真实姓名", prop: "name" },
        { label: "邮箱", prop: "emale" },
        { label: "年级", prop: "grade" },
      ],
      // 搜索配置
      searchConfig: {
        labelWidth: "90px", // 必须带上单位
        inputWidth: "360px", // 必须带上单位
        fields: [
          {
            type: "text",
            label: "用户名",
            name: "userName",
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
        params.roleId = 2;
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
        return {
          data: data,
          total: data.length,
        };
      },
    });
    const className = ref(props.className);
    const table = ref(null);
    const confirm = async () => {
      const ids = state.selectedItems.map((item) => item.id);

      const res = await API.importStu({
        stuIds: ids,
        classId: state.classId,
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
      console.log("className" + state.className);
      instance.proxy.$emit("close");
    };

    return {
      ...toRefs(state),
      table,
      confirm,
      className,
      close,
    };
  },
});
</script>

<style>
</style>