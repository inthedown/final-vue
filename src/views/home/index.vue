<template>
  <div class="dashboard-editor-container">
    <el-row>
      <el-col :xs="24" :sm="24" :lg="7">
        <div class="chart-wrapper">
          <div class="head-title">设备状态</div>
          <div id="a"></div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="7"> </el-col>
      <el-col :xs="24" :sm="24" :lg="10"> </el-col>
    </el-row>

    <el-row>
      <el-col :xs="24" :sm="24" :lg="14"> </el-col>
      <el-col :xs="24" :sm="24" :lg="10"> </el-col>
    </el-row>
  </div>
</template>


<script>
import { Chart } from "@antv/g2";
import { reactive, toRefs, getCurrentInstance, ref, onMounted} from "vue";
export default {
  name: "DashboardAdmin",
  components: {
    Chart,
  },
  setup() {
    const state = reactive({
      data: [
        { genre: "Sports", sold: 275 },
        { genre: "Strategy", sold: 115 },
        { genre: "Action", sold: 120 }, 
        { genre: "Shooter", sold: 350 },
        { genre: "Other", sold: 150 },
      ],
    });
    onMounted(() => {
      // 初始化图表实例
      const chart = new Chart({
        container: "a",
        theme: "classic",
      });

      // 声明可视化
      chart
        .interval() // 创建一个 Interval 标记
        .data(state.data) // 绑定数据
        .encode("x", "genre") // 编码 x 通道
        .encode("y", "sold"); // 编码 y 通道

      // 渲染可视化
      chart.render();
    });
    return {
       ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
