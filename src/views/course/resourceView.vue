<template>
  <!--浏览资源组件  -->
  <div class="resource">
    <iframe
      :src="state.url"
      frameborder="0"
      width="100%"
    ></iframe>
      <el-button type="primary" @click="see">11</el-button>
  </div>

</template>

<script>
export default {
  //接收父组件传递的参数
  props: {
    url: {
      type: String,
      default: "about:blank",
    },
  },
  setup(props) {
    const route = useRoute();
    const state = reactive({
      url: props.url,
    });
    const see = () => {
      console.log(state.url);
    };
    return {
      ...toRefs(state),
      route,
        see,
    };
  },
};
</script>

<style>
.resource {
  width: 100%;
  height: 100%;
}
</style>