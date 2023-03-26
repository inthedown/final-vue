<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span>访问页面监控</span>
      </div>
    </template>
    <el-table
      :data="vist_page_data"
      height="300"
      size="mini"
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="name" label="昵称"></el-table-column>
      <el-table-column prop="user_name" label="用户名"></el-table-column>
      <el-table-column prop="vist_page" label="页面"></el-table-column>
      <el-table-column sortable prop="date" label="时间"></el-table-column>
      <el-table-column width="150" label="管理" fixed="right" align="right">
        <template #default="scope">
          <el-button
            size="mini"
            type="success"
            @click="views(scope.$index, scope.row)"
            >查看</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <Upage
      :pc="pc"
      :page="page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></Upage>
  </el-card>
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
      const name = ["灰太狼", "李天福", "葫芦娃", "李逵", "宋江"];
      const user = ["Bret", "Antonette", "Samantha", "Karianne", "Kamren"];
      const pages = ["论坛", "手册", "教程", "注册", "首页"];
      var time = new Date();
      const vist_data = {
        name: name[parseInt(Math.random() * (4 - 0 + 1) + 0, 10)],
        user_name: user[parseInt(Math.random() * (4 - 0 + 1) + 0, 10)],
        vist_page: pages[parseInt(Math.random() * (4 - 0 + 1) + 0, 10)],
        date:
          time.getFullYear() +
          "-" +
          time.getMonth() +
          "-" +
          time.getDate() +
          " :" +
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