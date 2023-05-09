<template>
  <div class="head-title">学生反馈提醒</div>
  <el-table :data="tableData" height="300" size="mini" style="width: 100%">
    <el-table-column type="index" label="序号" width="50"></el-table-column>
    <el-table-column prop="courseName" label="课程名称"></el-table-column>
    <el-table-column prop="sessionName" label="节点名称"></el-table-column>
    <el-table-column sortable prop="time" label="提交时间"></el-table-column>
    <el-table-column prop="userFromName" label="提交人"></el-table-column>

    <el-table-column width="150" label="操作" fixed="right" align="right">
      <template #default="scope">
        <el-button
          size="mini"
          type="primary"
          @click="views(scope.$index, scope.row)"
          >查看</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import Upage from "@/components/Upage.vue";
import { useUserinfo } from "@/components/Avatar/hooks/useUserinfo";
import { reactive, toRefs, getCurrentInstance } from "vue";
import * as VISUAL from "@/api/visual";
import * as COURSE from "@/api/Course";
export default {
  components: {
    Upage,
  },
  props: ["pc"],
  data() {
  
    const { userInfo } = useUserinfo();
    return {
      tableData: [],
      userInfo: userInfo,
    };
  },
  methods: {
    initData() {
      VISUAL.getBack().then((res) => {
        res.data.forEach((item) => {
          //2023-05-08T07:02:49.063+00:00 transform to 2023-05-08 07:02:49
          item.time = item.time.replace("T", " ").split(".")[0];
        });
        this.tableData = res.data;
      });
    },
    formatDate(date) {
      //格式化时间yyyy-mm-dd hh:mm:ss
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      //不足两位补0
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      hour = hour < 10 ? "0" + hour : hour;
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    },
    views(index, row) {
      console.log(index, row);
      const params = {
        id: this.userInfo.id,
        role: this.userInfo.role,
      };

      COURSE.getList(params)
        .then((res) => {
          res.data.content.forEach((item) => {
            if (item.id == row.courseId) {
              item.startTime = this.formatDate(new Date(item.startTime));
              item.endTime = this.formatDate(new Date(item.endTime));
              this.$router.push({
                path: "/detail",
                query: { id: row.courseId, data: JSON.stringify(item) },
              });
            }
          });
        })
        .catch((err) => {
          this.$message.error("跳转失败");
        });
    },
  },
  mounted() {
    this.initData();
  },
};
</script>
<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
    margin: 0 10px;
  }

  .form-wrapper1 {
    background: #fff;
    margin-top: 20px;
    padding: 16px 16px;
    margin-left: 10px;
    height: 330px;
  }
  .form-wrapper {
    background: #fff;
    margin-top: 20px;
    padding: 16px 16px;
    margin-left: 10px;
  }
  .head-title:before {
    content: "|";
    background-color: #1890ff !important;
    color: #1890ff !important;
    font-weight: 700 !important;
    margin-right: 8px !important;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
