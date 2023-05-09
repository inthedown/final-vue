<template>
<draw-map :id="id" :data="data"></draw-map>
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
      data:route.query.data,
      id:route.query.id,
  
    });
  
  
    onMounted(async()=> {
    const route = useRoute()
    const id = route.query.id
     const instance = getCurrentInstance();
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