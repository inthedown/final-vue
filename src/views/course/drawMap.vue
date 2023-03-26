<template>
  <div id="container"></div>
  <el-dialog
    v-model="state.uploadVisible"
    title="上传素材"
    width="fit-content"
    :before-close="handleClose"
  >
    <el-upload
      v-model:file-list="fileList"
      class="upload-demo"
      action=""
      multiple
      auto-upload="false"
      :http-request="uploadMode"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :before-remove="beforeRemove"
      :before-upload="beforeUpload"
      :on-change="handleChange"
      :on-progress="handleProgress"
      :on-exceed="handleExceed"
      :limit="3"
    >
      <el-button type="primary">选取</el-button>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500KB.
        </div>
      </template>
    </el-upload>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">
          取消
        </el-button>
        <el-button type="primary" @click="uploadFile">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-main></el-main>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import G6 from '@antv/g6'
import axios from 'axios'
const state = reactive({
  rawData: [],
  uploadVisible: false,
  uploadUrl: '/api/uploadFile',
})
onMounted(() => {
  init()
})
const init = () => {
  const rawData = {
    label: '程序设计入门——C语言',
    id: '0',
    startTime: '',
    isOpen: 1,
    children: [
      {
        label: '程序设计与C语言',
        id: '0-1',
        color: '#5AD8A6',
        children: [
          {
            label: ' 计算机和编程语言',
            id: '0-1-1',
            startTime: '2001-03-23',
            isOpen: 1,
            children: [
              {
                label: 'c语言',
                id: '0-1-1-1',
                startTime: '2001-03-25',
                isOpen: 1,
                children: [],
              },
              {
                label: '第一个程序',
                id: '0-1-1-2',
                startTime: '2001-03-25',
                isOpen: 1,
              },
            ],
          },
        ],
      },
      {
        label: '计算',
        id: '0-2',
        startTime: '2001-03-23',
        isOpen: 1,
        color: '#F6BD16',
        children: [
          {
            label: '变量',
            id: '0-2-1',
            children: [],
          },
          {
            label: '数据类型',
            id: '0-2-2',
            children: [],
          },
          {
            label: '表达式',
            id: '0-2-3',
            children: [],
          },
        ],
      },
      {
        label: '判断与循环',
        id: '0-3',
        color: '#5AD8A6',
        children: [
          {
            label: '判断',
            id: '0-3-1',
            children: [],
          },
          {
            label: '循环',
            id: '0-3-2',
            children: [],
          },
        ],
      },
      {
        label: '循环控制',
        id: '0-4',
        color: '#5AD8A6',
        children: [
          {
            label: '循环控制',
            id: '0-4-1',
            children: [],
          },
          {
            label: '多重循环',
            id: '0-4-2',
            children: [],
          },
          {
            label: '循环应用',
            id: '0-4-3',
            children: [],
          },
        ],
      },
      {
        label: '数组与函数',
        id: '0-5',
        color: '#5AD8A6',
        children: [
          {
            label: '数组',
            id: '0-5-1',
            children: [],
          },
          {
            label: '函数的定义及使用',
            id: '0-5-2',
            children: [],
          },
          {
            label: '函数的参数和变量',
            id: '0-5-3',
            children: [],
          },
          {
            label: '二维数组',
            id: '0-5-4',
            children: [],
          },
        ],
      },
      {
        label: '指针与字符串',
        id: '0-6',
        color: '#5AD8A6',
        children: [
          {
            label: '指针',
            id: '0-6-1',
            children: [],
          },
          {
            label: '字符类型',
            id: '0-6-2',
            children: [],
          },
          {
            label: '字符串',
            id: '0-6-3',
            children: [],
          },
        ],
      },
    ],
  }
  G6.registerNode('card-node', {
    draw: function drawShape(cfg, group) {
      const r = 2
      const color = '#5B8FF9'
      const w = cfg.size[0]
      const h = cfg.size[1]
      const shape = group.addShape('rect', {
        attrs: {
          x: -w / 2,
          y: -h / 2,
          width: w, //200,
          height: h, // 60
          stroke: color,
          radius: r,
          fill: '#fff',
        },
        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
        name: 'main-box',
        draggable: true,
      })

      group.addShape('rect', {
        attrs: {
          x: -w / 2,
          y: -h / 2,
          width: w, //200,
          height: h / 2, // 60
          fill: color,
          radius: [r, r, 0, 0],
        },
        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
        name: 'title-box',
        draggable: true,
      })

      // title text
      group.addShape('text', {
        attrs: {
          textBaseline: 'top',
          x: -w / 2 + 8,
          y: -h / 2 + 2,
          lineHeight: 20,
          text: cfg.id,
          fill: '#fff',
        },
        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
        name: 'title',
      })
      cfg.children &&
        group.addShape('marker', {
          attrs: {
            x: w / 2,
            y: 0,
            r: 6,
            cursor: 'pointer',
            symbol: cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse,
            stroke: '#666',
            lineWidth: 1,
            fill: '#fff',
          },
          // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
          name: 'collapse-icon',
        })
      group.addShape('text', {
        attrs: {
          textBaseline: 'top',
          x: -w / 2 + 8,
          y: -h / 2 + 24,
          lineHeight: 20,
          text: 'description',
          fill: 'rgba(0,0,0, 1)',
        },
        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
        name: `description`,
      })
      return shape
    },
    setState(name, value, item) {
      if (name === 'collapsed') {
        const marker = item
          .get('group')
          .find(ele => ele.get('name') === 'collapse-icon')
        const icon = value ? G6.Marker.expand : G6.Marker.collapse
        marker.attr('symbol', icon)
      }
    },
  })

  const data = {
    id: 'A',
    children: [
      {
        id: 'A1',
        children: [{ id: 'A11' }, { id: 'A12' }, { id: 'A13' }, { id: 'A14' }],
      },
      {
        id: 'A2',
        children: [
          {
            id: 'A21',
            children: [{ id: 'A211' }, { id: 'A212' }],
          },
          {
            id: 'A22',
          },
        ],
      },
    ],
  }

  const container = document.getElementById('container')
  const width = container.scrollWidth
  const height = container.scrollHeight || 500

  const graph = new G6.TreeGraph({
    container: 'container',
    width,
    height,
    modes: {
      default: ['drag-canvas'],
    },
    defaultNode: {
      type: 'card-node',
      size: [100, 40],
    },
    defaultEdge: {
      type: 'cubic-horizontal',
      style: {
        endArrow: true,
      },
    },
    layout: {
      type: 'indented',
      direction: 'LR',
      dropCap: false,
      indent: 200,
      getHeight: () => {
        return 60
      },
    },
  })

  graph.data(data)
  graph.render()
  graph.fitView()
  graph.on('node:click', e => {
    if (e.target.get('name') === 'collapse-icon') {
      e.item.getModel().collapsed = !e.item.getModel().collapsed
      graph.setItemState(e.item, 'collapsed', e.item.getModel().collapsed)
      graph.layout()
    }
  })

  if (typeof window !== 'undefined')
    window.onresize = () => {
      if (!graph || graph.get('destroyed')) return
      if (!container || !container.scrollWidth || !container.scrollHeight)
        return
      graph.changeSize(container.scrollWidth, container.scrollHeight)
    }
}
function uploadFile() {
  let fd = new FormData()
  this.fileList.forEach(file => {
    console.log(file)
    fd.append('fileName', file.raw)
  })
  fd.append('author', 'asd')

  axios
    .post('api/file/upload', fd, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      console.log(response.data.rspCode)
      if (response.data.rspCode === '200') {
        this.$message({
          message: '上传成功',
          type: 'success',
        })
        this.uploadVisible = false
      } else {
        this.$message({
          message: '上传失败',
          type: 'error',
        })
      }
      this.fileList = []
    })
}
//关闭弹窗
function handleClose() {
  if (state.uploadVisible) {
    state.uploadVisible = false
  }
}
//预览图片
function handlePreview(file) {
  this.$preview(file)
}
//删除图片
function handleRemove(file) {
  this.$message({
    message: '删除了' + file.name,
    type: 'success',
  })
}
//上传成功
function handleSuccess(response, file) {
  console.log(response)
  console.log(file)
  this.$message({
    message: '上传成功',
    type: 'success',
  })
}
function handleChange(file, fileList) {
  console.log(file, fileList)
  this.fileList = fileList
  console.log(this.fileList)
}
function changeShow() {
  this.show = !this.show
}
</script>

<style>
#container {
  overflow: hidden;
}
.g6-tooltip {
  padding: 10px 6px;
  color: #444;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #e2e2e2;
  border-radius: 4px;
}
</style>
