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
      console.log('查看')
      console.log(state.data.id);
       instance.proxy.$router.push({ path: '/detail', query: { id: state.data.id } })
    }
    return {
      ...toRefs(state),
      find,
    }
  },
  mounted() {
    console.log(JSON.stringify( this.data))
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