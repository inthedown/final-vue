<template>
  <div class="dashboard-editor-container">
    <!-- <github-corner class="github-corner" /> -->

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row>
      <el-col :xs="24" :sm="24" :lg="7">
        <div class="chart-wrapper">
          <div class="head-title">设备状态</div>
          <doughnut-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="7">
        <div class="chart-wrapper">
          <div class="head-title">素材资源</div>
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="10">
        <div class="chart-wrapper">
          <div class="head-title">设备分布</div>
          <column-chart />
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :xs="24" :sm="24" :lg="14">
        <div class="form-wrapper">
          <div class="head-title">计划审核提醒</div>
          <plan-form />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="10">
        <div class="form-wrapper1">
          <div class="head-title">事件记录</div>

          <form-record />

        </div>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import PanelGroup from './components/PanelGroup'
import DoughnutChart from './components/DoughnutChart'
import PieChart from './components/PieChart'
import ColumnChart from './components/ColumnChart.vue'
import PlanForm from './components/PlanForm.vue'
import FormRecord from './components/FormRecord.vue'


const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    DoughnutChart,
    PieChart,
    ColumnChart,
    PlanForm,
    FormRecord
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      eventsRecord: {}
    }
  },
  // mounted() {
  //   this.query()
  // },
  methods: {
    query() {
      // getEventsRecord().then((res) => {
      //   this.eventsRecord = res.data.events
      //   console.log(this.eventsRecord)
      // })
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
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
