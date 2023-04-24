<template>
<div class="container">
   <iframe :src="url" frameborder="0" width="100%" height="500px"></iframe> 
</div>

</template>

<script>

import { reactive, toRefs } from 'vue'

export default {
    name: 'ResourcePage',
    props: {
        url: {
            type: String,
            default: ''
        }
    },
  setup (props) {
    const state = reactive({
        url: props.url
    })
    return {
      ...toRefs(state)
    }
  }
}

</script>

<style lang='less' scoped>
.ciontainer {
    width: 100%;
    height: 300px;
}
</style>
