<template>
  <el-form
    class="form"
    :model="model"
    :rules="rules"
    ref="form"
    label-width="88px"
  >
    <el-form-item label="节目名称" prop="name">
      <el-input
        placeholder="请输入节目名称"
        v-model.trim="model.name"
        clearable
      />
    </el-form-item>
    <el-form-item label="节目时长" prop="showTime">
      <el-input
        placeholder="请输入节目时长"
        v-model.trim="model.showTime"
        clearable
      />
    </el-form-item>

    <el-form-item label="节目状态" prop="status">
      <el-select
        style="width: 100%"
        placeholder="请选择状态"
        v-model="model.status"
        clearable
      >
        <el-option
          v-for="item in roles"
          :key="item.value"
          :value="item.value"
          :label="item.name"
        />
      </el-select>
    </el-form-item>
  </el-form>
  <material-list @select="selectId"></material-list>
  <el-button type="primary" @click="submit">
    提交
  </el-button>
</template>

<script>
import {
  defineComponent,
  getCurrentInstance,
  onBeforeMount,
  reactive,
  ref,
  toRefs,
} from 'vue'
import * as API from '@/api/program'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import materialList from './materialList.vue'

export default defineComponent({
  components: { materialList },
  name: 'programEdit',
  setup() {
    const { ctx } = getCurrentInstance()
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const form = ref(null)

    const state = reactive({
      model: {
        name: '',
        showTime: '',
        status: '',
        author: 'aaaa',
        fileList: [],
      },
      rules: {
        programName: [
          {
            required: true,
            message: '请输入节目名称',
            trigger: 'blur',
          },
          {
            min: 2,
            max: 20,
            message: '用户名长度为2~20位',
            trigger: 'blur',
          },
        ],
        duration: [
          {
            required: true,
            message: '请选择状态',
            trigger: 'blur',
          },
        ],
      },
      roles: [],
    })

    onBeforeMount(async () => {
      // 获取角色列表
      const { code, data } = await API.getRoleList()
      if (+code === 200) {
        state.roles = data
      }

      // 获取用户信息
      console.log(route.params)
      if (route.params.id) {
        const { code, data } = await API.getProgramInfo(route.params.id)
        if (+code === 200) {
          state.model = data
        }
      }
    })

    const submit = () => {
      form.value.validate(async valid => {
        if (valid) {
          const { rspCode, msg } = await API.addProgram(state.model)
          if (rspCode === '200') {
            ctx.$message.success(msg)
            // 关闭当前页面
            store.dispatch('tags/delTag', route)
            // 返回用户列表，带上一个时间戳参数，让页面刷新
            router.push('/program/program?t=' + Date.now())
          }
        }
      })
    }
    // eslint-disable-next-line no-unused-vars
    const selectId = e => {
      state.model.fileList = e
    }
    return {
      ...toRefs(state),
      form,
      submit,
      selectId,
    }
  },
})
</script>
<style lang="scss" scoped>
.form {
  max-width: 640px;
  margin: 32px auto 0;
}
</style>
