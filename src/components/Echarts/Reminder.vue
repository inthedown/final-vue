<template>
    <div class="head-title">计划审核提醒</div>
    <el-table
      :data="vist_page_data"
      height="300"
      size="mini"
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="plan_name" label="计划名称"></el-table-column>
      <el-table-column prop="plan_status" label="计划状态"></el-table-column>
      <el-table-column sortable prop="date" label="提交时间"></el-table-column>
      <el-table-column prop="name" label="提交人"></el-table-column>
      <!-- <el-table-column prop="user_name" label="用户名"></el-table-column>
      <el-table-column prop="vist_page" label="页面"></el-table-column> -->
      
      <el-table-column width="150" label="操作" fixed="right" align="right">
        <template #default="scope">
          <el-button
            size="mini"
            type="primary"
            @click="views(scope.$index, scope.row)"
            >查看</el-button
          >
          <!-- <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          > -->
        </template>
      </el-table-column>
    </el-table>
    <!-- <Upage
      :pc="pc"
      :page="page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></Upage> -->
 
</template>
<script>
import Upage from "@/components/Upage.vue";
export default {
  components: {
    Upage,
  },
  props: ["pc"],
  data() {
    return {
      vist_page_data: [],
      page: {
        pn: 1,
        rn: 100,
        total: 400,
      },
    };
  },
  methods: {
    views(index, data) {
      console.log(index, data);
    },
    handleDelete(index, data) {
      console.log(index, data);
    },
    handleSizeChange(size) {
      this.page.rn = size;
      console.log(size);
    },
    handleCurrentChange(pn) {
      this.page.pn = pn;
      console.log(pn);
    },
    init_vist_data() {
      const name = ["孙国豪", "臭华子", "孙天熔", "饶黎明"];
      const plan_name = ["Bret", "Antonette", "Samantha", "Karianne"];
      const plan_status = ["已发布", "待发布", "已失效", "已结束"];
      const pages = ["论坛", "手册", "教程", "注册"];
      var time = new Date();
      const vist_data = {
        name: name[parseInt(Math.random() * (3 - 0 + 1) + 0, 10)],
        plan_name: plan_name[parseInt(Math.random() * (3 - 0 + 1) + 0, 10)],
        plan_status: plan_status[parseInt(Math.random() * (3 - 0 + 1) + 0, 10)],
        vist_page: pages[parseInt(Math.random() * (3 - 0 + 1) + 0, 10)],
        date:
          time.getFullYear() +
          "-" +
          time.getMonth() +
          "-" +
          time.getDate() +
          "  " +
          time.getHours() +
          ":" +
          time.getMinutes() +
          ":" +
          time.getSeconds(),
      };
      this.vist_page_data.splice(0, 0, vist_data);
      if (this.vist_page_data.length > 40) {
        this.vist_page_data = [];
      }
      setTimeout(() => {
        this.init_vist_data();
      }, 1000);
    },
  },
  mounted() {
    this.init_vist_data();
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
    background-color: #1890ff!important;
    color: #1890ff!important;
    font-weight: 700!important;
    margin-right: 8px!important;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
