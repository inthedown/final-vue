<template>
  <div id="container1" />
</template>

<script>
import { reactive, toRefs, getCurrentInstance, ref, onMounted } from "vue";
import * as echarts from "echarts";
import { Chart } from "@antv/g2";
import * as VISUAL from "@/api/visual";
export default {
  name: "EqDis",
  setup() {
    const state = reactive({
      data: [],
    });
    return {
      ...toRefs(state),
    };
  },
  mounted() {
    VISUAL.getStuActiveMap().then((res) => {
      this.data = res.data;
      this.$nextTick(() => {
        this.initChart();
      });
    });
  },

  methods: {
    initChart() {
      const chart = new Chart({
        container: "container1",
        theme: "classic",
        autoFit: false,
        width: 400,
        height: 300,
      });
      chart
        .point()
        .data(JSON.parse(JSON.stringify(this.data)))
        .encode("x", (d) => parseInt(d.dd))
        .encode("y", (d) => parseInt(d.hh))
        .encode("color", "time")
        .axis("x", {
          title: "日期",
        })
        .axis("y", {
          title: "时间",
        });

      chart.render();
    },
  },
};
</script>
<style scoped>
</style>