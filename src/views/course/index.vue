<template>
  <el-header>
    <el-row :gutter="20">
      <el-col :span="6" :offset="18">
        <el-button type="primary" @click="addCourse"> 增加课程 </el-button>
      </el-col>
    </el-row>
  </el-header>
  <el-main>
    <div v-if="items.length == 0">
      <el-alert
        title="暂无课程"
        type="info"
        style=""
        :closable="false"
        show-icon
      >
      </el-alert>
    </div>
    <el-scrollbar v-else class="container">
      <p v-for="item in items" :key="item" class="scrollbar-demo-item">
        <card :data="item"></card>
      </p>
    </el-scrollbar>
  </el-main>
</template>

<script>
import * as course from "@/api/Course";
import { reactive, toRefs, getCurrentInstance } from "vue";
import card from "./card.vue";
import { useUserinfo } from "@/components/Avatar/hooks/useUserinfo";

export default {
  components: { card },
  setup() {
    const { userInfo } = useUserinfo();
    const instance = getCurrentInstance();
    const state = reactive({
      items: [],
      dialogVisible: false,
    });
    const addCourse = () => {
      //跳转到增加课程页面
      instance.proxy.$router.push({ path: "/add" });
    };
    const formatDate = (date) => {
      //格式化时间yyyy-mm-dd hh:mm:ss
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      //不足两位补0
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      hour = hour < 10 ? "0" + hour : hour;
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    };
    return {
      ...toRefs(state),
      addCourse,
      userInfo,
      formatDate,
    };
  },
  mounted() {
    const { proxy } = getCurrentInstance();

    const params = {
      id: proxy.userInfo.id,
      role: proxy.userInfo.role,
    };
    course.getList(params).then((res) => {
      //将数据赋值给items
      var data = res.data.content;
      if (data == null || data.length == 0) {
        data = [];
      } else {
        for (var i = 0; i < data.length; i++) {
          data[i].startTime = proxy.formatDate(new Date(data[i].startTime));
          data[i].endTime = proxy.formatDate(new Date(data[i].endTime));
        }
      }
      this.items = data;
    });
  },
};
</script>

<style scoped>
.container {
  /* 瀑布流布局 */
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  /* 需要指定高度 */
  height: 600px;
}
.title {
  display: flex;
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
}
.scrollbar-demo-item {
  /* 瀑布流卡片样式 */
  width: 90%;
  margin: 0 auto;
  margin-bottom: 20px;
}
</style>
