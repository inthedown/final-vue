<template>
  <div id="container1" />
</template>

<script>
import * as echarts from "echarts";
import { Chart } from "@antv/g2";

export default {
  name: "EqDis",
  data() {
    return {
      chart: null,
      data: [
        { name: "1", time: "long", dd: "10", hhss: "10" },
        { name: "2", time: "short", dd: "12", hhss: "18" },
        { name: "3", time: "long", dd: "13", hhss: "07" },
        { name: "4", time: "short", dd: "11", hhss: "15" },
        { name: "5", time: "long", dd: "12", hhss: "22" },
        { name: "6", time: "short", dd: "15", hhss: "9" },
        { name: "7", time: "long", dd: "11", hhss: "14" },
        { name: "8", time: "short", dd: "12", hhss: "21" },
        { name: "9", time: "long", dd: "13", hhss: "8" },
        { name: "10", time: "short", dd: "13", hhss: "16" },
        { name: "11", time: "long", dd: "12", hhss: "11" },
        { name: "12", time: "short", dd: "13", hhss: "19" },
        { name: "13", time: "long", dd: "11", hhss: "8" },
        { name: "14", time: "short", dd: "15", hhss: "17" },
        { name: "15", time: "long", dd: "13", hhss: "6" },
        { name: "16", time: "short", dd: "11", hhss: "14" },
        { name: "17", time: "long", dd: "12", hhss: "23" },
        { name: "18", time: "short", dd: "13", hhss: "10" },
        { name: "19", time: "long", dd: "11", hhss: "12" },
        { name: "20", time: "short", dd: "12", hhss: "20" },
        { name: "21", time: "long", dd: "13", hhss: "5" },
        { name: "22", time: "short", dd: "11", hhss: "13" },
        { name: "23", time: "long", dd: "12", hhss: "22" },
        { name: "24", time: "short", dd: "13", hhss: "9" },
        { name: "25", time: "long", dd: "11", hhss: "16" },
        { name: "26", time: "short", dd: "12", hhss: "0" },
        { name: "27", time: "long", dd: "13", hhss: "11" },
      ],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
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
        .data(this.data)
        .encode("x",(d)=> parseInt(d.dd))
        .encode("y", (d)=> parseInt(d.hhss))
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