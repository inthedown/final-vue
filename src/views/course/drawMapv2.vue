<template>
  <div id="container">
    <el-dialog
      width="60%"
      height="500px"
      title="增加修改"
      v-model="state.show"
      append-to-body
    >
      <el-form :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="说明">
          <el-input v-model="form.label" />
        </el-form-item>
        <el-form-item label="设定时间">
          <el-date-picker
            v-model="form.date"
            type="datetimerange"
            :shortcuts="shortcuts"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
          />
        </el-form-item>
        <el-divider />
        <el-form-item label="上传附件">
          <el-upload
            v-model:file-list="form.fileList"
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
            :limit="5"
          >
            <el-button type="primary">选取</el-button>
            <template #tip>
              <div class="el-upload__tip">
                jpg/png files with a size less than 500KB.
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <span class="dialog-footer">
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" @click="upload">确认</el-button>
          </span>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import G6 from '@antv/g6'
import {
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  toRefs,

} from '@vue/runtime-core'
import axios from 'axios'

const shortcuts = [
  {
    text: 'Last week',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: 'Last month',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: 'Last 3 months',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]
const instance = getCurrentInstance()
const state = reactive({
  graph: null,
  show: false,
  itemlist: [
    {
      name: 'aaa',
      type: '图片',
    },
    {
      name: 'aaa',
      type: '图片',
    },
  ],

  fileInfo: [
    {
      author: 'aa',
    },
  ],
  message: {
    id: '1',
    name: '数据结构', //标题
    label: '12.31', //说明
    currency: '结束', //日期说明
    fileList: [],
    date: '',
    rate: 0.341, //图形进度
    status: 'B', //进度条颜色
    variableName: '进行中', //状态
    variableValue: 0.341, //数字进度
    variableUp: false, //三角形箭头朝向
    children: [
      {
        id: '11',
        name: '算法', //标题
        label: '12.31', //说明
        fileList: [],
        date: '',
        currency: '结束', //说明
        rate: 0.341, //学习进度
        status: 'B', //进度条颜色
        variableName: '进行中', //说明
        variableValue: 0.341, //说明
        variableUp: false, //三角形箭头朝向
      },
      {
        id: '12',
        name: '算法2', //标题
        label: '12.31', //说明
        fileList: [],
        date: '',
        currency: '结束', //说明
        rate: 0.341, //学习进度
        status: 'B', //进度条颜色
        variableName: '进行中', //说明
        variableValue: 0.341, //说明
        variableUp: false, //三角形箭头朝向
      },
    ],
  },
})

const form = reactive({
  id: 0,
  name: '',
 // region: '',
  label: '',
  date: '',
  fileList: [],
})
const uploadMode = param => {}
const upload = () => {
  var uidList = []
  let fd = new FormData()
  form.fileList.forEach(file => {
    fd.append('fileName', file.raw)
    uidList.push(file.uid)
  })

  fd.append('uidList', uidList)
  axios
    .post('/api/file/upload', fd, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      if (response.data.rspCode === '200') {
        instance.proxy.$message({
          message: '上传成功',
          type: 'success',
        })
        // console.log(state.graph.findById(form.id))
        var node = state.graph.findById(form.id)._cfg.model
        for (var prop in form) {
            node[prop] = form[prop]
        }
        calculateItemProperties(node)
        state.graph.updateItem(state.graph.findById(form.id), node)
        state.graph.render()
        console.log(state.graph.findById(form.id))
        state.show = false
      } else {
        instance.proxy.$message({
          message: '上传失败',
          type: 'error',
        })
      }
      form.fileList = []
    })
}
//关闭弹窗
const handleClose = () => {
  state.show = false
}
//预览图片
const handlePreview = file => {
  instance.proxy.$preview(file)
}
//删除图片
const handleRemove = file => {
  instance.proxy.$message({
    message: '删除了' + file.name,
    type: 'success',
  })
}
//上传成功
const handleSuccess = (response, file) => {
  instance.proxy.$message({
    message: '上传成功',
    type: 'success',
  })
}
const handleChange = (file, fileList) => {
  form.fileList = fileList
}
const calculateItemProperties=(item)=> {
  var now = new Date();
  var startDate = new Date(item.date[0]);
  var endDate = new Date(item.date[1]);

  if (now < startDate) {
    // 未开始
    item.label = formatDate(startDate);
    item.currency = '开始';
    item.variableName = '未开始';
  } else if (now > endDate) {
    // 已结束
    var days = Math.ceil((now - endDate) / (1000 * 60 * 60 * 24));
    item.label = days + '天';
    item.currency = '已结束';
    item.variableName = '已结束';
  } else {
    // 进行中
    item.label = formatDate(endDate);
    item.currency = '结束';
    item.variableName = '进行中';
  }
}

const formatDate=(date)=> {
  var month = date.getMonth() + 1;
  var day = date.getDate();
  return (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
}


onMounted(() => {
  const { message } = toRefs(state)
  // mocked data

  const colors = {
    B: '#5B8FF9',
    R: '#F46649',
    Y: '#EEBC20',
    G: '#5BD8A6',
    DI: '#A7A7A7',
  }

  //  组件props
  const props = {
    data: message.value,
    config: {
      padding: [10, 20],
      defaultLevel: 3,
      defaultZoom: 0.5,
      modes: { default: ['zoom-canvas', 'drag-canvas', 'drag-node'] },
    },
  }
  //减号
  const COLLAPSE_ICON = function COLLAPSE_ICON(x, y, r) {
    return [
      ['M', x - r, y - r],
      ['a', r, r, 0, 1, 0, r * 2, 0],
      ['a', r, r, 0, 1, 0, -r * 2, 0],
      ['M', x + 2 - r, y - r],
      ['L', x + r - 2, y - r],
    ]
  }
  //加号
  const EXPAND_ICON = function EXPAND_ICON(x, y, r) {
    return [
      ['M', x - r, y - r],
      ['a', r, r, 0, 1, 0, r * 2, 0],
      ['a', r, r, 0, 1, 0, -r * 2, 0],
      ['M', x + 2 - r, y - r],
      ['L', x + r - 2, y - r],
      ['M', x, y - 2 * r + 2],
      ['L', x, y - 2],
    ]
  }
  const container = document.getElementById('container')
  const width = container.scrollWidth
  const height = container.scrollHeight || 600

  // 默认配置
  const defaultConfig = {
    width,
    height,
    modes: {
      default: ['zoom-canvas', 'drag-canvas'],
    },
    fitView: true,
    animate: true,
    defaultNode: {
      type: 'flow-rect',
    },
    defaultEdge: {
      type: 'cubic-horizontal',
      style: {
        stroke: '#CED4D9',
      },
    },
    layout: {
      type: 'indented',
      direction: 'LR',
      dropCap: false,
      indent: 300,
      getHeight: () => {
        return 60
      },
    },
  }

  // 自定义节点、边
  const registerFn = () => {
    /**
     * 自定义节点
     */
    G6.registerNode(
      'flow-rect',
      {
        shapeType: 'flow-rect',
        draw(cfg, group) {
          const {
            name = '',
            variableName,
            variableValue,
            variableUp,
            label,
            collapsed,
            currency,
            status,
            rate,
          } = cfg
          const grey = '#CED4D9'
          // 逻辑不应该在这里判断
          const rectConfig = {
            width: 202,
            height: 60,
            lineWidth: 1,
            fontSize: 12,
            fill: '#fff',
            radius: 4,
            stroke: grey,
            opacity: 1,
          }

          const nodeOrigin = {
            x: -rectConfig.width / 2,
            y: -rectConfig.height / 2,
          }

          const textConfig = {
            textAlign: 'left',
            textBaseline: 'bottom',
          }

          const rect = group.addShape('rect', {
            attrs: {
              x: nodeOrigin.x,
              y: nodeOrigin.y,
              ...rectConfig,
            },
          })

          const rectBBox = rect.getBBox()

          // label title
          group.addShape('text', {
            attrs: {
              ...textConfig,
              x: 12 + nodeOrigin.x,
              y: 20 + nodeOrigin.y,
              text: name.length > 28 ? name.substr(0, 28) + '...' : name,
              fontSize: 12,
              opacity: 0.85,
              fill: '#000',
              cursor: 'pointer',
            },
            name: 'name-shape',
          })

          // price
          const price = group.addShape('text', {
            attrs: {
              ...textConfig,
              x: 12 + nodeOrigin.x,
              y: rectBBox.maxY - 12,
              text: label,
              fontSize: 16,
              fill: '#000',
              opacity: 0.85,
            },
          })

          // label currency
          group.addShape('text', {
            attrs: {
              ...textConfig,
              x: price.getBBox().maxX + 5,
              y: rectBBox.maxY - 12,
              text: currency,
              fontSize: 12,
              fill: '#000',
              opacity: 0.75,
            },
          })

          // percentage
          const percentText = group.addShape('text', {
            attrs: {
              ...textConfig,
              x: rectBBox.maxX - 8,
              y: rectBBox.maxY - 12,
              text: `${((variableValue || 0) * 100).toFixed(2)}%`,
              fontSize: 12,
              textAlign: 'right',
              fill: colors[status],
            },
          })

          // percentage triangle
          const symbol = variableUp ? 'triangle' : 'triangle-down'
          const triangle = group.addShape('marker', {
            attrs: {
              ...textConfig,
              x: percentText.getBBox().minX - 10,
              y: rectBBox.maxY - 12 - 6,
              symbol,
              r: 6,
              fill: colors[status],
            },
          })
          const triangleAdd = group.addShape('marker', {
            attrs: {
              ...textConfig,
              x: percentText.getBBox().minX + 20,
              y: rectBBox.maxY + 10,
              r: 4,
              stroke: '#73d13d',
              cursor: 'pointer',
              symbol: EXPAND_ICON,
            },
            name: 'addPoint',
            modelId: cfg.id,
          })
          const triangleDelete = group.addShape('marker', {
            attrs: {
              ...textConfig,
              x: percentText.getBBox().minX + 40,
              y: rectBBox.maxY + 10,
              r: 4,
              stroke: '#ff4d4f',
              cursor: 'pointer',
              symbol: COLLAPSE_ICON,
            },
            name: 'deletePoint',
            modelId: cfg.id,
          })
          const triangleChange = group.addShape('marker', {
            attrs: {
              ...textConfig,
              x: percentText.getBBox().minX,
              y: rectBBox.maxY + 6,
              r: 4,
              stroke: '#ff4d4f',
              cursor: 'pointer',

              fill: '#ff4d4f',
            },
            name: 'changePoint',
            modelId: cfg.id,
          })

          // variable name
          group.addShape('text', {
            attrs: {
              ...textConfig,
              x: triangle.getBBox().minX - 4,
              y: rectBBox.maxY - 12,
              text: variableName,
              fontSize: 12,
              textAlign: 'right',
              fill: '#000',
              opacity: 0.45,
            },
          })

          // bottom line background
          const bottomBackRect = group.addShape('rect', {
            attrs: {
              x: nodeOrigin.x,
              y: rectBBox.maxY - 4,
              width: rectConfig.width,
              height: 4,
              radius: [0, 0, rectConfig.radius, rectConfig.radius],
              fill: '#E0DFE3',
            },
          })

          // bottom percent
          const bottomRect = group.addShape('rect', {
            attrs: {
              x: nodeOrigin.x,
              y: rectBBox.maxY - 4,
              width: rate * rectBBox.width,
              height: 4,
              radius: [0, 0, 0, rectConfig.radius],
              fill: colors[status],
            },
          })

          // collapse rect
          if (cfg.children && cfg.children.length) {
            group.addShape('rect', {
              attrs: {
                x: rectConfig.width / 2 - 8,
                y: -8,
                width: 16,
                height: 16,
                stroke: 'rgba(0, 0, 0, 0.25)',
                cursor: 'pointer',
                fill: '#fff',
              },
              name: 'collapse-back',
              modelId: cfg.id,
            })

            // collpase text
            group.addShape('text', {
              attrs: {
                x: rectConfig.width / 2,
                y: -1,
                textAlign: 'center',
                textBaseline: 'middle',
                text: collapsed ? '+' : '-',
                fontSize: 16,
                cursor: 'pointer',
                fill: 'rgba(0, 0, 0, 0.25)',
              },
              name: 'collapse-text',
              modelId: cfg.id,
            })
          }

          this.drawLinkPoints(cfg, group)
          return rect
        },
        update(cfg, item) {
          const group = item.getContainer()
          this.updateLinkPoints(cfg, group)
        },
        setState(name, value, item) {
          if (name === 'collapse') {
            const group = item.getContainer()
            const collapseText = group.find(
              e => e.get('name') === 'collapse-text'
            )
            if (collapseText) {
              if (!value) {
                collapseText.attr({
                  text: '-',
                })
              } else {
                collapseText.attr({
                  text: '+',
                })
              }
            }
          }
        },
        getAnchorPoints() {
          return [
            [0, 0.5],
            [1, 0.5],
          ]
        },
      },
      'rect'
    )

    G6.registerEdge(
      'flow-cubic',
      {
        getControlPoints(cfg) {
          let controlPoints = cfg.controlPoints // 指定controlPoints
          if (!controlPoints || !controlPoints.length) {
            const { startPoint, endPoint, sourceNode, targetNode } = cfg
            const {
              x: startX,
              y: startY,
              coefficientX,
              coefficientY,
            } = sourceNode ? sourceNode.getModel() : startPoint
            const { x: endX, y: endY } = targetNode
              ? targetNode.getModel()
              : endPoint
            let curveStart = (endX - startX) * coefficientX
            let curveEnd = (endY - startY) * coefficientY
            curveStart = curveStart > 40 ? 40 : curveStart
            curveEnd = curveEnd < -30 ? curveEnd : -30
            controlPoints = [
              { x: startPoint.x + curveStart, y: startPoint.y },
              { x: endPoint.x + curveEnd, y: endPoint.y },
            ]
          }
          return controlPoints
        },
        getPath(points) {
          const path = []
          path.push(['M', points[0].x, points[0].y])
          path.push([
            'C',
            points[1].x,
            points[1].y,
            points[2].x,
            points[2].y,
            points[3].x,
            points[3].y,
          ])
          return path
        },
      },
      'single-line'
    )
  }

  registerFn()

  const { data } = props


  const initGraph = data => {
    if (!data) {
      return
    }
    const { onInit, config } = props
    const tooltip = new G6.Tooltip({
      offsetX: 20,
      offsetY: 30,
      itemTypes: ['node'],
      getContent: e => {
        const outDiv = document.createElement('div')
        const nodeName = e.item.getModel().name
        let formatedNodeName = ''
        for (let i = 0; i < nodeName.length; i++) {
          formatedNodeName = `${formatedNodeName}${nodeName[i]}`
          if (i !== 0 && i % 20 === 0)
            formatedNodeName = `${formatedNodeName}<br/>`
        }
        outDiv.innerHTML = `${formatedNodeName}`
        return outDiv
      },
      shouldBegin: e => {
        if (e.target.get('name') === 'name-shape') return true
        return false
      },
    })
    let graph = null
    graph = new G6.TreeGraph({
      container: 'container',
      ...defaultConfig,
      ...config,
      plugins: [tooltip],
    })
    if (typeof onInit === 'function') {
      onInit(graph)
    }

    graph.zoom(config.defaultZoom || 1)

    const handleCollapse = e => {
      const target = e.target
      const id = target.get('modelId')
      const item = graph.findById(id)
      const nodeModel = item.getModel()
      // console.log(nodeModel)
      nodeModel.collapsed = !nodeModel.collapsed
      graph.layout()
      graph.setItemState(item, 'collapse', nodeModel.collapsed)
    }
    graph.on('collapse-text:click', e => {
      handleCollapse(e)
    })
    graph.on('collapse-back:click', e => {
      handleCollapse(e)
      //console.log('click' + JSON.stringify(data))
    })
    graph.on('node:click', evt => {
      const { item, target } = evt
      const targetType = target.get('type')
      const name = target.get('name')
      // 增加元素
      if (targetType === 'marker') {
        const model = item.getModel()
        //console.log(JSON.stringify(model))
        if (name === 'addPoint') {
          if (!model.children) {
            model.children = []
          }
          model.children.push({
            id: model.id + '-' + model.children.length,
            name: '',
            label: '',
            currency: '',
            date: [],
            fileList: [],
            rate: 0,
            status: 'B',
            variableName: '未进行',
            variableValue: 0,
            variableUp: false,
          })

          graph.updateChild(model, model.id)
        } else if (name === 'deletePoint') {
          graph.removeChild(model.id)
        } else if (name === 'changePoint') {
          // console.log(JSON.stringify(model))

          form.id = model.id
            ? model.id
            : Math.random()
                .toString(16)
                .slice(2)
          for (var prop in form) {
            
            if (form.hasOwnProperty(prop) && model.hasOwnProperty(prop)) {
              form[prop] = model[prop]
            }
          }
          state.show = true
        }
        console.log(JSON.stringify(data));
        instance.proxy.$emit('childClick', data)
      }
    })
    graph.data(data)
    graph.render()
    //graph.fitView()
    state.graph = graph
  }

  initGraph(data)

  // if (typeof window !== 'undefined')
  //   window.onresize = () => {
  //     if (!graph || graph.get('destroyed')) return
  //     if (!container || !container.scrollWidth || !container.scrollHeight)
  //       return
  //     graph.changeSize(container.scrollWidth, container.scrollHeight)
  //   }
})


</script>

<style>
#container {
  text-align: center;
  background-color: azure;
}
</style>
