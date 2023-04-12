<template>
  <div id="container"></div>
</template>

<script>
import G6 from '@antv/g6';

export default {

  name: 'shebeiChart',
  data() {
    return {
      data:{
        nodes: [{id:'数据库原理',
        label:'数据库原理',
        donutAttrs: {
          income: 4,
          outcome: 12,
          unknown: 22
        }},{id:'范式',
        label:'范式',
        donutAttrs: {
          income: 4,
          outcome: 32,
          unknown: 12
        }},{id:'mysql',
        label:'mysql',
        donutAttrs: {
          income: 12,
          outcome: 22,
          unknown: 2
        }},{id:'关系型数据库',
        label:'关系型数据库',
        donutAttrs: {
          income: 12,
          outcome: 12,
          unknown: 22
        }},{id:'非关系型数据库',
        label:'非关系型数据库',
        donutAttrs: {
          income: 14,
          outcome: 2,
          unknown: 22
        }}],
        edges: [
    {source: '数据库原理', target: '范式', size: 10},
    {source: '范式', target: 'mysql', size: 5},
    {source: '范式', target: '关系型数据库', size: 20},
    {source: '关系型数据库', target: '非关系型数据库', size: 5}
  ]
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  methods: {
    initChart() {
      const data={
        nodes: [{id:'数据库原理',
        label:'数据库原理',
        donutAttrs: {
          income: 4,
          outcome: 12,
          unknown: 22
        }},{id:'范式',
        label:'范式',
        donutAttrs: {
          income: 4,
          outcome: 32,
          unknown: 12
        }},{id:'mysql',
        label:'mysql',
        donutAttrs: {
          income: 12,
          outcome: 22,
          unknown: 2
        }},{id:'关系型数据库',
        label:'关系型数据库',
        donutAttrs: {
          income: 12,
          outcome: 12,
          unknown: 22
        }},{id:'非关系型数据库',
        label:'非关系型数据库',
        donutAttrs: {
          income: 14,
          outcome: 2,
          unknown: 22
        }}],
        edges: [
    {source: '数据库原理', target: '范式', size: 10},
    {source: '范式', target: 'mysql', size: 5},
    {source: '范式', target: '关系型数据库', size: 20},
    {source: '关系型数据库', target: '非关系型数据库', size: 5}
  ]
      };
      data.edges.forEach(edge=> {
  edge.label = `transfer ${edge.size}`
})

const colors = {
  'income': '#61DDAA',
  'outcome': '#F08BB4',
  'unknown': '#65789B'
}

data.nodes.forEach(node => {
  node.donutColorMap = colors;
  node.size = 0;
  Object.keys(node.donutAttrs).forEach(key => {
    node.size += node.donutAttrs[key];
  })
  node.size = Math.sqrt(node.size) * 5
})


const legendData = {
  nodes: [{
    id: 'income',
    label: '已完成',
    order: 0,
    style: {
      fill: '#61DDAA',
    }
  }, {
    id: 'outcome',
    label: '未完成',
    order: 2,
    style: {
      fill: '#F08BB4',
    }
  }, {
    id: 'Unknown',
    label: '进行中',
    order: 2,
    style: {
      fill: '#65789B',
    }
  }]
}
const legend = new G6.Legend({
  data: legendData,
  align: 'center',
  layout: 'horizontal', // vertical
  position: 'bottom-left',
  vertiSep: 12,
  horiSep: 24,
  offsetY: -24,
  padding: [4, 16, 8, 16],
  containerStyle: {
    fill: '#ccc',
    lineWidth: 1
  },
  title: ' ',
  titleConfig: {
    offsetY: -8,
  },
});


const width = 700;
const height = 300;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  // translate the graph to align the canvas's center, support by v3.5.1
  fitCenter: true,
  plugins: [legend],
  modes: {
    default: ['drag-canvas', 'drag-node', 'zoom-canvas'],
  },
  layout: {
    type: 'radial',
    focusNode: 'li',
    linkDistance: 200,
    unitRadius: 200
  },
  defaultEdge: {
    style: {
      endArrow: true
    },
    labelCfg: {
      autoRotate: true,
      style: {
        stroke: "#fff",
        lineWidth: 5
      }
    }
  },
  defaultNode: {
    type: 'donut',
    style: {
      lineWidth: 0,
    },
    labelCfg: {
      position: 'bottom',
    },
  },
});

graph.data(data);
graph.render();
graph.fitView();
graph.on('node:mouseenter', (evt) => {
  const { item } = evt;
  graph.setItemState(item, 'active', true);
});

graph.on('node:mouseleave', (evt) => {
  const { item } = evt;
  graph.setItemState(item, 'active', false);
});

graph.on('node:click', (evt) => {
  const { item } = evt;
  graph.setItemState(item, 'selected', true);
});
graph.on('canvas:click', (evt) => {
  graph.getNodes().forEach((node) => {
    graph.clearItemStates(node);
  });
});

    }
  }
}
</script>
