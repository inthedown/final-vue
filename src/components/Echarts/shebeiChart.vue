<template>
  <div id="container"></div>
</template>

<script>
import G6 from "@antv/g6";
import * as VISUAL from "@/api/visual";
export default {
  name: "shebeiChart",
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  methods: {
    initChart() {
      console.log("data", this.data);
      VISUAL.getCircles().then((res) => {
        if (res.rspCode == "200") {
          console.log("res", res.data);
          this.draw(res.data);
        } else {
          this.$message.error("获取数据失败");
        }
      });
    },
    draw(data) {
      console.log("data", data);
      data.edges.forEach((edge) => {
        edge.label = `transfer ${edge.size}`;
      });

      const colors = {
        income: "#61DDAA",
        outcome: "#F08BB4",
        unknown: "#65789B",
      };

      data.nodes.forEach((node) => {
        node.donutColorMap = colors;
        node.size = 0;
        Object.keys(node.donutAttrs).forEach((key) => {
          node.size += node.donutAttrs[key];
        });
        node.size = Math.sqrt(node.size) * 5;
      });
      let fisheye = new G6.Fisheye({
        r: 200,
        showLabel: true,
      });
      const legendData = {
        nodes: [
          {
            id: "Unknown",
            label: "未开始",
            order: 2,
            style: {
              fill: "#65789B",
            },
          },
          {
            id: "income",
            label: "进行中",
            order: 0,
            style: {
              fill: "#61DDAA",
            },
          },
          {
            id: "outcome",
            label: "已完成",
            order: 2,
            style: {
              fill: "#F08BB4",
            },
          },
        ],
      };
      const legend = new G6.Legend({
        data: legendData,
        align: "center",
        layout: "horizontal", // vertical
        position: "bottom-left",
        vertiSep: 12,
        horiSep: 24,
        offsetY: -24,
        padding: [4, 16, 8, 16],
        containerStyle: {
          fill: "#ccc",
          lineWidth: 1,
        },
        title: " ",
        titleConfig: {
          offsetY: -8,
        },
      });

      const width = 700;
      const height = 300;
      const graph = new G6.Graph({
        container: "container",
        width,
        height,
        fitView: true,
        fitCenter: true,
        fitViewPadding: [ 20, 40, 50, 20 ],
        plugins: [legend],
        modes: {
          default: ["drag-canvas", "drag-node", "zoom-canvas"],
        },
        layout: {
          type: "radial",
          focusNode: "li",
          linkDistance: 200,
          unitRadius: 200,
        },
        defaultEdge: {
          style: {
            endArrow: true,
          },
          labelCfg: {
            autoRotate: true,
            style: {
              stroke: "#fff",
              lineWidth: 5,
            },
          },
        },
        defaultNode: {
          type: "donut",
          style: {
            lineWidth: 0,
          },
          labelCfg: {
            position: "bottom",
          },
        },
      });

      graph.data(data);
      graph.render();
      graph.fitView();
      
      graph.on("node:mouseenter", (evt) => {
        const { item } = evt;
        graph.setItemState(item, "active", true);
      });

      graph.on("node:mouseleave", (evt) => {
        const { item } = evt;
        graph.setItemState(item, "active", false);
      });

      graph.on("node:click", (evt) => {
        const { item } = evt;
        graph.setItemState(item, "selected", true);
      });
      graph.on("canvas:click", (evt) => {
        graph.getNodes().forEach((node) => {
          graph.clearItemStates(node);
        });
      });
    },
  },
};
</script>
