<template>
   <el-card >
      <!-- <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image"> -->
      <div style="padding: 14px;">
        <span>{{data.courseName}}</span>
        <span>{{data.teacherName}}</span>
        <div class="bottom clearfix">
         开始时间<span class="time">{{ data.startTime }}</span>结束时间<span class="time">{{ data.endTime }}</span>
          <el-button type="text" class="button" @click="find">查看</el-button>
        </div>
      </div>
    </el-card>
</template>

<script>
import { reactive, toRefs ,getCurrentInstance} from 'vue'
export default {
  name: 'card',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const instance = getCurrentInstance()
    const state = reactive({
      data: props.data,

    })
    const find = () => {
      state.data.startTime=transDate(state.data.startTime)
      state.data.endTime=transDate(state.data.endTime)

       instance.proxy.$router.push({ path: '/detail', query: { id: state.data.id,data:JSON.stringify(state.data)} })
    }
     const transDate = (obj) => {
      // 创建一个日期对象，传入要转换的日期时间字符串作为参数
      const dateTime = new Date(obj);

      // 使用日期对象的方法获取年、月、日、小时、分钟和秒数
      const year = dateTime.getFullYear();
      const month = ("0" + (dateTime.getMonth() + 1)).slice(-2);
      const day = ("0" + dateTime.getDate()).slice(-2);
      const hour = ("0" + dateTime.getHours()).slice(-2);
      const minute = ("0" + dateTime.getMinutes()).slice(-2);
      const second = ("0" + dateTime.getSeconds()).slice(-2);

      // 将年、月、日、小时、分钟和秒数组合成所需的格式
      const formattedDateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

      return formattedDateTime;
    };
    return {
      ...toRefs(state),
      find,
      transDate,
    }
  },
  mounted() {
    
  }
}
</script>

<style>
 .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>