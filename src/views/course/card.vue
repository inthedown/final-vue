<template>
   <el-card :body-style="{  }">
      <!-- <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image"> -->
      <div style="padding: 14px;">
        <span>{{data.courseName}}</span>
        <span>{{data.teacherName}}</span>
        <div class="bottom clearfix">
         开始时间<span class="time">{{ data.startTime }}</span>结束时间<span class="time">{{ data.endTime }}</span>
          <el-button type="text" class="button">查看</el-button>
        </div>
      </div>
    </el-card>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'card',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const state = reactive({
      data: props.data,

    })
    return {
      ...toRefs(state),
    }
  },
  mounted() {
    console.log(JSON.stringify( this.data))
    //对data中的时间进行处理,把2023-03-01T08:00:00.000+00:00zhuang换成2023-03-01 08:00:00
    // this.data.startTime = this.data.startTime.replace('T', ' ')
    // this.data.endTime = this.data.endTime.replace('T', ' ')
    console.log(this.data.startTime);
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