<template>
    <div class="head-title">学生反馈提醒</div>
    <el-table
      :data="tableData"
      height="300"
      size="mini"
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="plan_name" label="课程名称"></el-table-column>
      <el-table-column prop="plan_status" label="节点名称"></el-table-column>
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
import * as VISUAL from '@/api/visual'
export default {
  components: {
    Upage,
  },
  props: ["pc"],
  data() {
    return {
      tableData:[]
    };
  },
  methods: {
   initData(){
    VISUAL.getBack().then((res) => {
      this.tableData = res.data;
    });
   }
 
  },
  mounted() {
    this.initData()
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
