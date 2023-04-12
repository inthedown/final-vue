<template>
    <div class="head-title">事件记录</div>
    <el-table
      :data="vist_page_data"
      height="300"
      size="mini"
      style="width: 100%"
    >
      <!-- <el-table-column type="index" label="序号" width="50"></el-table-column> -->
      <el-table-column prop="event_type" label=""></el-table-column>
      <el-table-column prop="event_name" label=""></el-table-column>
      <el-table-column prop="event" label=""></el-table-column>
      <el-table-column prop="date" label=""></el-table-column>
      <!-- <el-table-column prop="user_name" label="用户名"></el-table-column>
      <el-table-column prop="vist_page" label="页面"></el-table-column> -->

      <el-table-column width="150" label="" fixed="right" align="right">
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
// import Upage from "@/components/Upage.vue";
export default {
  components: {
    // Upage,
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
      const event_type = ["课程", "节点"];
      const event_name=["图","算法","设计","数据结构","计算机网络","操作系统","数据库","编译原理","计算机组成原理","计算机体系结构","计算机系统结构",]
      const event = ["开放", "结束", "进行中", "倒计时"];
      
    
      var time = new Date();
      const vist_data = {
        event_type: '【'+event_type[parseInt(Math.random() * (1 - 0 + 1) + 0, 10)]+'】',
        event: event[parseInt(Math.random() * (3 - 0 + 1) + 0, 10)],
        event_name: event_name[parseInt(Math.random() * (10 - 0 + 1) + 0, 10)],

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
