<template>
  <el-form label-width="90px">
    <el-form-item label="课程名称">
      <el-input v-model="name" />
    </el-form-item>
    <el-form-item>
      <draw-mapv-2
        ref="drawMapv2"
        @childClick="handleChildClick"
        v-model="id"
      ></draw-mapv-2>
    </el-form-item>
    <el-form-item style="text-align: center">
      <el-button>取消</el-button>
      <el-button type="primary" @click="submit">确认</el-button>
    
    </el-form-item>
  </el-form>
</template>

<script >
import { reactive, toRefs, getCurrentInstance, watch } from "vue";

import drawMapv2 from "./drawMapv2.vue";
import { useUserinfo } from "@/components/Avatar/hooks/useUserinfo";
import * as COURSE from "@/api/Course";
import { useRoute } from "vue-router";
export default {
  components: { drawMapv2 },
  setup() {
    const route = useRoute();
    const { userInfo } = useUserinfo();
    const state = reactive({
      id:route.query.id,
      name: "",
      classes: "",
      teacherId: userInfo.value.id,
      data: [],
    });
    const instance=getCurrentInstance();
    const handleChildClick = (param) => {
      state.data = param;
    };

    //过滤data属性
    const filterObject = (obj) => {
      if (typeof obj !== "object" || obj === null) {
        return obj;
      }

      if (Array.isArray(obj)) {
        return obj.map(filterObject);
      }

      const filteredObj = {};
      const allowedKeys = [
        "id",
        "name",
        "label",
        "fileList",
        "date",
        "children",
        "percentage",
        "size",
        "raw",
        "uid",
      ];

      for (const [key, value] of Object.entries(obj)) {
        if (allowedKeys.includes(key)) {
          if (key === "children") {
            filteredObj[key] = value.map(filterObject);
          } else if (key === "date") {
            //若date为空数组，则不传给后端
            if (value == "") {
              filteredObj[key] = [];
            } else {
              filteredObj[key] = value;
            }
          } else {
            filteredObj[key] = filterObject(value);
          }
        }
      }

      return filteredObj;
    };

    const submit = () => {

      if(state.id!==null){
        const data = {
          name: state.name,
          teacherId: state.teacherId,
          data: filterObject(state.data),
        };
        COURSE.update(data).then((res)=>{
          if (res.rspCode === "200") {
            instance.proxy.$message({
              message: "课程修改成功",
              type: "success",
            });
            instance.proxy.$router.push("/course");
          } else {
            instance.proxy.$message({
              message: res.rspMsg,
              type: "error",
            });
          }
        })
      }else{
       if (state.data.length === 0) {
        instance.proxy.$message({
          message: "请添加课程章节",
          type: "error",
        });
      } else {
        const data = {
          name: state.name,
          teacherId: state.teacherId,
          data: filterObject(state.data),
        };
        COURSE.add(data).then((res) => {
          if (res.rspCode === "200") {
            instance.proxy.$message({
              message: "课程创建成功",
              type: "success",
            });
            instance.proxy.$router.push("/course");
          } else {
            instance.proxy.$message({
              message: res.rspMsg,
              type: "error",
            });
          }
        });
      }
      }
     
    };

    return {
      ...toRefs(state),
      handleChildClick,
      submit,
      userInfo,
      filterObject,
      instance,route,

    };
  },
  mounted(){
    const { proxy } = getCurrentInstance();
    if(useRoute().query.id!==null){
       COURSE.getDetail({id: useRoute().query.id}).then((res)=>{
      if(res.rspCode==200){
        proxy.name=res.data.name
      }

    })
    }
   
  }

};
</script>



<style scoped>
</style>
