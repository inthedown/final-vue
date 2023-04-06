<template>
<draw-map :data="id" :teacher="teacher"></draw-map>
</template>

<script>
import { reactive, toRefs, getCurrentInstance, ref, onMounted} from "vue";
import DrawMap from "@/views/course/drawMap.vue";
import * as API from "@/api/Course";
import { useRoute } from 'vue-router'
export default {
  name: "detail",
  components: {
    DrawMap,
  },
  setup() {
     const route = useRoute()
    const state = reactive({
      data:null,
      id:route.query.id,
      teacher:null,
    });
  
  
    onMounted(async()=> {
    const route = useRoute()
    const id = route.query.id
     const instance = getCurrentInstance();
    const res=await API.getDetail({"id":id})
      if (res.rspCode == '200') {
        state.data = res.data; 
        console.log('state'+JSON.stringify(state.data));   
      } else {
        instance.proxy.$message({
          message: res.errMsg,
          type: "error",
        });
      }
  } )
   return {
      ...toRefs(state),
      route
    }; 
  },
 
};
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
  clear: both;
}
</style>