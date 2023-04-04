<template>
<draw-map :data="data"></draw-map>
</template>

<script>
import { reactive, toRefs, getCurrentInstance ,ref} from "vue";
import * as API from "@/api/Course";
import { useRoute } from 'vue-router'
export default {
  name: "detail",

  setup() {
     const route = useRoute()
    const state = ref({
      data:[],
      id:route.query.id,
    });

    return {
      ...toRefs(state),
      route,
    };
  },
  mounted() {
    const route = useRoute()
    const id = route.query.id
     const instance = getCurrentInstance();
    API.getDetail({"id":id}).then((res) => {
      console.log(res);
      if (res.rspCode == '200') {
        console.log(state);
         state.value.data = res.data;
      } else {
        instance.proxy.$message({
          message: res.errMsg,
          type: "error",
        });
      }
    });
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