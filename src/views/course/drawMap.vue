<template>
  <div id="sc">
    <el-descriptions
      ref="desc"
      class="margin-top"
      direction="vertical"
      border
      :column="3"
      :size="mini"
    >
      <el-descriptions-item label="课程名称">{{
        data.courseName
      }}</el-descriptions-item>
      <el-descriptions-item label="开课时间">{{
        data.startTime
      }}</el-descriptions-item>
      <el-descriptions-item label="结课时间">{{
        data.endTime
      }}</el-descriptions-item>
      <el-descriptions-item label="任课教师">
        <el-tag size="small">{{ data.teacherName }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="分数占比"
        >江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item
      >
    </el-descriptions>
    <div id="container"></div>
    <el-form
      style="
        margin-top: 10px;
        background-color: rgb(255, 255, 255);
        padding: 10px 5px;
      "
    >
      <el-form-item label="反馈节点">
        <el-input
          v-model="state.select.name"
          :disabled="true"
          style="width: 80%"
        ></el-input>
        <el-button type="primary" @click="seeFeedback" style="float: right"
          >反馈</el-button
        >
      </el-form-item>
      <el-form-item label="资源列表">
        <div style="width: 100%">
          <el-table :data="state.resourceList" style="width: 100%">
            <el-table-column prop="name" label="名称" key="slot">
              <template #default="scope">
                <span>{{ scope.row.name.split(".")[0] }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="类型"> </el-table-column>
            <el-table-column prop="size" label="大小"> </el-table-column>
            <el-table-column prop="updateTime" label="上传时间" key="slot">
              <!-- 格式化 -->
              <template #default="scope">
                <span>{{ scope.row.updateTime.split("T")[0] }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="percentage" label="进度"
              ><template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="url" label="浏览" key="slot">
              <template #default="scope">
                <el-button type="primary" @click="seeResource(scope.row.url)" >浏览</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form-item>
    </el-form>

    <el-dialog
      title="反馈列表"
      v-model="dialogVisible"
      width="80%"
      :before-close="dialogBeforeClose"
    >
    <el-form>
      <el-form-item>
         <el-table
        :data="state.form"
        style="width: 100%"
        height="250">
    <el-table-column
      fixed
      prop="userFromName"
      label="发信人"
width="120"
      >
    </el-table-column>
    <el-table-column
      prop="userToName"
      label="收信人"
      width="120"
      >
    </el-table-column>
    <el-table-column
      prop="content"
      label="内容"

    >
    </el-table-column>
    <el-table-column
      prop="time"
      label="发送时间"
    width="150"
     >

    </el-table-column>
  </el-table>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model="state.content" :rows="4"></el-input>
      </el-form-item>
    </el-form>
       

      <div slot="footer" style="text-align: center;">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendFeedBack">发送</el-button>
      </div>
    </el-dialog>
    <el-dialog title="资源浏览" v-model="state.resDialogVisible"  
    after-open="setTime" after-close="clearTime" 
>
      <iframe :src="state.url" class="myIframe"></iframe>
      <div slot="footer" style="text-align: center;">
        <el-button @click="state.resDialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, getCurrentInstance, watch, computed } from "vue";
import G6 from "@antv/g6";
import axios from "axios";
import * as API from "@/api/Course";
import * as FeedBack from "@/api/feedback";
// 声明接收父组件传递的属性
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});
const instance = getCurrentInstance();
const state = reactive({
  graph: null,
  dialogVisible: false,
  form: [],
  resourceList: [],
  select: {},
  data: JSON.parse(props.data),
  content: "",
  resDialogVisible: false,
  url:'about:blank',
});
const dialogVisible = ref(false);
const data = ref(JSON.parse(props.data));
const form = ref(null);


const seeFeedback = async () => {
  if (state.select.sid == undefined) {
    instance.proxy.$message({
      message: "请选择反馈节点",
      type: "error",
    });
    return;
  }
  var params = {
    sessionId: state.select.sid,
    type:"节点",
  };
  const res = await FeedBack.getList(params);
  if (res.rspCode == "200") {
    
    state.form = res.data;
    state.form.forEach(element => {
      element.time=transDate(element.time)
    });
    dialogVisible.value = true;
  } else {
    instance.proxy.$message({
      message: res.errMsg,
      type: "error",
    });
  }
};
const transDate = (obj) => {
      const dateTime = new Date(obj);
      const year = dateTime.getFullYear();
      const month = ("0" + (dateTime.getMonth() + 1)).slice(-2);
      const day = ("0" + dateTime.getDate()).slice(-2);
      const hour = ("0" + dateTime.getHours()).slice(-2);
      const minute = ("0" + dateTime.getMinutes()).slice(-2);
      const second = ("0" + dateTime.getSeconds()).slice(-2);
      const formattedDateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      return formattedDateTime;
    };
const sendFeedBack=async ()=>{
  console.log('data',data.value.teacherId);
  var params={
    "sid":state.select.sid,
    "content":state.content,
    "userToId":data.value.teacherId,
    "userFromId":19,
  };
  const res = await FeedBack.add(params);
  if (res.rspCode === "200") {
    instance.proxy.$message({
      message: "发送成功",
      type: "success",
    });
    reloadForm();
  } else {
    alert(res.errMsg);
    instance.proxy.$message({
      message: res.errMsg,
      type: "error",
    });
  }

}
const reloadForm=async ()=>{
  const res = await FeedBack.getList({ id: state.select.sid });
  if (res.rspCode == "200") {
    state.form = res.data;
    state.form.forEach(element => {
      element.time=transDate(element.time)
    });
  } else {
    instance.proxy.$message({
      message: res.errMsg,
      type: "error",
    });
  }
}
const seeResource=(url)=>{
  if(url!==null){
    state.url=url;
  }
  state.resDialogVisible=true;
}

onMounted(async () => {
  //获取iframe
  const colors = {
    B: "#5B8FF9",
    R: "#F46649",
    Y: "#EEBC20",
    G: "#5BD8A6",
    DI: "#A7A7A7",
  };
  console.log(state.data);
  const res = await API.getDetail({ id: props.id });
  if (res.rspCode == "200") {
    state.data = res.data;
  } else {
    instance.proxy.$message({
      message: res.errMsg,
      type: "error",
    });
  }
  //  组件props
  const props1 = {
    data: res.data[0],
    config: {
      padding: [10, 10],
      defaultLevel: 3,
      defaultZoom: 0.5,
      modes: { default: ["zoom-canvas", "drag-canvas"] },
    },
  };
  //减号
  const COLLAPSE_ICON = function COLLAPSE_ICON(x, y, r) {
    return [
      ["M", x - r, y - r],
      ["a", r, r, 0, 1, 0, r * 2, 0],
      ["a", r, r, 0, 1, 0, -r * 2, 0],
      ["M", x + 2 - r, y - r],
      ["L", x + r - 2, y - r],
    ];
  };
  //加号
  const EXPAND_ICON = function EXPAND_ICON(x, y, r) {
    return [
      ["M", x - r, y - r],
      ["a", r, r, 0, 1, 0, r * 2, 0],
      ["a", r, r, 0, 1, 0, -r * 2, 0],
      ["M", x + 2 - r, y - r],
      ["L", x + r - 2, y - r],
      ["M", x, y - 2 * r + 2],
      ["L", x, y - 2],
    ];
  };
  const container = document.getElementById("container");
  const width = container.scrollWidth;
  const height = container.scrollHeight || 500;

  // 默认配置
  const defaultConfig = {
    width,
    height,
    modes: {
      default: ["zoom-canvas"],
    },
    fitView: true,
    animate: true,
    defaultNode: {
      type: "flow-rect",
    },
    defaultEdge: {
      type: "cubic-horizontal",
      style: {
        stroke: "#CED4D9",
      },
    },
    layout: {
      type: "indented",
      direction: "LR",
      dropCap: false,
      indent: 300,
      getHeight: () => {
        return 60;
      },
    },
  };

  // 自定义节点、边
  const registerFn = () => {
    /**
     * 自定义节点
     */
    G6.registerNode(
      "flow-rect",
      {
        shapeType: "flow-rect",
        draw(cfg, group) {
          const {
            name = "",
            variableName,
            variableValue,
            variableUp,
            label,
            collapsed,
            currency,
            status,
            rate,
          } = cfg;
          const grey = "#CED4D9";
          // 逻辑不应该在这里判断
          const rectConfig = {
            width: 202,
            height: 60,
            lineWidth: 1,
            fontSize: 12,
            fill: "#fff",
            radius: 4,
            stroke: grey,
            opacity: 1,
          };

          const nodeOrigin = {
            x: -rectConfig.width / 2,
            y: -rectConfig.height / 2,
          };

          const textConfig = {
            textAlign: "left",
            textBaseline: "bottom",
          };

          const rect = group.addShape("rect", {
            attrs: {
              x: nodeOrigin.x,
              y: nodeOrigin.y,
              ...rectConfig,
            },
          });

          const rectBBox = rect.getBBox();

          // label title
          group.addShape("text", {
            attrs: {
              ...textConfig,
              x: 12 + nodeOrigin.x,
              y: 20 + nodeOrigin.y,
              text: name.length > 28 ? name.substr(0, 28) + "..." : name,
              fontSize: 12,
              opacity: 0.85,
              fill: "#000",
              cursor: "pointer",
            },
            name: "name-shape",
          });

          // price
          const price = group.addShape("text", {
            attrs: {
              ...textConfig,
              x: 12 + nodeOrigin.x,
              y: rectBBox.maxY - 12,
              text: label,
              fontSize: 16,
              fill: "#000",
              opacity: 0.85,
            },
          });

          // label currency
          group.addShape("text", {
            attrs: {
              ...textConfig,
              x: price.getBBox().maxX + 5,
              y: rectBBox.maxY - 12,
              text: currency,
              fontSize: 12,
              fill: "#000",
              opacity: 0.75,
            },
          });

          // percentage
          const percentText = group.addShape("text", {
            attrs: {
              ...textConfig,
              x: rectBBox.maxX - 8,
              y: rectBBox.maxY - 12,
              text: `${((variableValue || 0) * 100).toFixed(2)}%`,
              fontSize: 12,
              textAlign: "right",
              fill: colors[status],
            },
          });

          // percentage triangle
          const symbol = variableUp ? "triangle" : "triangle-down";
          const triangle = group.addShape("marker", {
            attrs: {
              ...textConfig,
              x: percentText.getBBox().minX - 10,
              y: rectBBox.maxY - 12 - 6,
              symbol,
              r: 6,
              fill: colors[status],
            },
          });
          // const triangleAdd = group.addShape('marker', {
          //   attrs: {
          //     ...textConfig,
          //     x: percentText.getBBox().minX + 20,
          //     y: rectBBox.maxY + 10,
          //     r: 4,
          //     stroke: '#73d13d',
          //     cursor: 'pointer',
          //     symbol: EXPAND_ICON,
          //   },
          //   name: 'addPoint',
          //   modelId: cfg.id,
          // })
          // const triangleDelete = group.addShape('marker', {
          //   attrs: {
          //     ...textConfig,
          //     x: percentText.getBBox().minX + 40,
          //     y: rectBBox.maxY + 10,
          //     r: 4,
          //     stroke: '#ff4d4f',
          //     cursor: 'pointer',
          //     symbol: COLLAPSE_ICON,
          //   },
          //   name: 'deletePoint',
          //   modelId: cfg.id,
          // })
          const triangleChange = group.addShape("marker", {
            attrs: {
              ...textConfig,
              x: percentText.getBBox().minX + 30,
              y: rectBBox.maxY + 6,
              r: 4,
              stroke: "#ff4d4f",
              cursor: "pointer",

              fill: "#ff4d4f",
            },
            name: "changePoint",
            modelId: cfg.id,
          });

          // variable name
          group.addShape("text", {
            attrs: {
              ...textConfig,
              x: triangle.getBBox().minX - 4,
              y: rectBBox.maxY - 12,
              text: variableName,
              fontSize: 12,
              textAlign: "right",
              fill: "#000",
              opacity: 0.45,
            },
          });

          // bottom line background
          const bottomBackRect = group.addShape("rect", {
            attrs: {
              x: nodeOrigin.x,
              y: rectBBox.maxY - 4,
              width: rectConfig.width,
              height: 4,
              radius: [0, 0, rectConfig.radius, rectConfig.radius],
              fill: "#E0DFE3",
            },
          });

          // bottom percent
          const bottomRect = group.addShape("rect", {
            attrs: {
              x: nodeOrigin.x,
              y: rectBBox.maxY - 4,
              width: rate * rectBBox.width,
              height: 4,
              radius: [0, 0, 0, rectConfig.radius],
              fill: colors[status],
            },
          });

          // collapse rect
          if (cfg.children && cfg.children.length) {
            group.addShape("rect", {
              attrs: {
                x: rectConfig.width / 2 - 8,
                y: -8,
                width: 16,
                height: 16,
                stroke: "rgba(0, 0, 0, 0.25)",
                cursor: "pointer",
                fill: "#fff",
              },
              name: "collapse-back",
              modelId: cfg.id,
            });

            // collpase text
            group.addShape("text", {
              attrs: {
                x: rectConfig.width / 2,
                y: -1,
                textAlign: "center",
                textBaseline: "middle",
                text: collapsed ? "+" : "-",
                fontSize: 16,
                cursor: "pointer",
                fill: "rgba(0, 0, 0, 0.25)",
              },
              name: "collapse-text",
              modelId: cfg.id,
            });
          }

          this.drawLinkPoints(cfg, group);
          return rect;
        },
        update(cfg, item) {
          const group = item.getContainer();
          this.updateLinkPoints(cfg, group);
        },
        setState(name, value, item) {
          if (name === "collapse") {
            const group = item.getContainer();
            const collapseText = group.find(
              (e) => e.get("name") === "collapse-text"
            );
            if (collapseText) {
              if (!value) {
                collapseText.attr({
                  text: "-",
                });
              } else {
                collapseText.attr({
                  text: "+",
                });
              }
            }
          }
        },
        getAnchorPoints() {
          return [
            [0, 0.5],
            [1, 0.5],
          ];
        },
      },
      "rect"
    );

    G6.registerEdge(
      "flow-cubic",
      {
        getControlPoints(cfg) {
          let controlPoints = cfg.controlPoints; // 指定controlPoints
          if (!controlPoints || !controlPoints.length) {
            const { startPoint, endPoint, sourceNode, targetNode } = cfg;
            const {
              x: startX,
              y: startY,
              coefficientX,
              coefficientY,
            } = sourceNode ? sourceNode.getModel() : startPoint;
            const { x: endX, y: endY } = targetNode
              ? targetNode.getModel()
              : endPoint;
            let curveStart = (endX - startX) * coefficientX;
            let curveEnd = (endY - startY) * coefficientY;
            curveStart = curveStart > 40 ? 40 : curveStart;
            curveEnd = curveEnd < -30 ? curveEnd : -30;
            controlPoints = [
              { x: startPoint.x + curveStart, y: startPoint.y },
              { x: endPoint.x + curveEnd, y: endPoint.y },
            ];
          }
          return controlPoints;
        },
        getPath(points) {
          const path = [];
          path.push(["M", points[0].x, points[0].y]);
          path.push([
            "C",
            points[1].x,
            points[1].y,
            points[2].x,
            points[2].y,
            points[3].x,
            points[3].y,
          ]);
          return path;
        },
      },
      "single-line"
    );
  };

  registerFn();

  const { data } = props1;
  const scrollToBottom = () => {
    const el = document.getElementById("container");
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const initGraph = (data) => {
    if (!data) {
      return;
    }

    const { onInit, config } = props1;
    const tooltip = new G6.Tooltip({
      offsetX: 20,
      offsetY: 30,
      itemTypes: ["node"],
      getContent: (e) => {
        const outDiv = document.createElement("div");
        const nodeName = e.item.getModel().name;
        let formatedNodeName = "";
        for (let i = 0; i < nodeName.length; i++) {
          formatedNodeName = `${formatedNodeName}${nodeName[i]}`;
          if (i !== 0 && i % 20 === 0)
            formatedNodeName = `${formatedNodeName}<br/>`;
        }
        outDiv.innerHTML = `${formatedNodeName}`;
        return outDiv;
      },
      shouldBegin: (e) => {
        if (e.target.get("name") === "name-shape") return true;
        return false;
      },
    });
    const minimap = new G6.Minimap({
      size: [200, 100],
      className: "minimap",
      type: "delegate",
    });
    let graph = null;
    graph = new G6.TreeGraph({
      container: "container",
      ...defaultConfig,
      ...config,
      plugins: [tooltip, minimap],
    });
    if (typeof onInit === "function") {
      onInit(graph);
    }

    graph.zoom(config.defaultZoom || 1);

    const handleCollapse = (e) => {
      const target = e.target;
      const id = target.get("modelId");
      const item = graph.findById(id);
      const nodeModel = item.getModel();
      nodeModel.collapsed = !nodeModel.collapsed;
      graph.layout();
      graph.setItemState(item, "collapse", nodeModel.collapsed);
    };
    graph.on("collapse-text:click", (e) => {
      handleCollapse(e);
    });
    graph.on("collapse-back:click", (e) => {
      handleCollapse(e);
      //console.log('click' + JSON.stringify(data))
    });
    graph.on("node:click", (evt) => {
      const { item, target } = evt;
      const targetType = target.get("type");
      const name = target.get("name");

      // 增加元素
      if (targetType === "marker") {
        const model = item.getModel();
        if (name === "changePoint") {
          state.select = model;
          state.resourceList = model.fileList;
          scrollToBottom();
        }
      }
    });
    graph.data(data);
    graph.render();
    //graph.fitView()
    state.graph = graph;
  };
  initGraph(data);
  
});
</script>

<style>
#container {
  margin-top: 10px;
  text-align: center;
  background-color: rgb(255, 255, 255);
}
.margin-top {
  background-color: rgb(231, 208, 208);
  padding: 4px;
}
.myIframe {

  height: 500px;
  /* 自适应缩放 */
  width: 300px;
  margin: 0 auto;
  text-align: center;
  border: none;
}
</style>
