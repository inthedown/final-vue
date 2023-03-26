<template>
  <el-form
    class="form"
    :model="model"
    :rules="rules"
    ref="form"
    label-width="88px"
  >
    <el-form-item label="计划名称" prop="planName">
      <el-input
        placeholder="请输入计划名称"
        v-model.trim="model.planName"
        clearable
      />
    </el-form-item>
    <el-form-item label="缩略图" prop="image">
      <el-input placeholder="图片上传" v-model.trim="model.image" clearable />
    </el-form-item>
    <el-form-item label="作者" prop="author">
      <el-input
        placeholder="请输入作者"
        v-model.trim="model.author"
        clearable
      />
    </el-form-item>
    <el-form-item label="计划状态" prop="state">
      <el-select
        style="width: 100%"
        placeholder="请选择计划状态"
        v-model="model.state"
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
    <el-form-item>
      <el-button type="primary" @click="submit">
        提交
      </el-button>
    </el-form-item>
  </el-form>
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
import * as API from '@/api/plan'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'


export default defineComponent({
  name: 'planEdit',
  setup() {
    const { ctx } = getCurrentInstance()
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const form = ref(null)

    const state = reactive({
      model: {
        planName: '',
        image: '',
        author: '',
        state: '',
      },
      rules: {
        planName: [
          {
            required: true,
            message: '请输入计划名称',
            trigger: 'blur',
          },
          {
            min: 2,
            max: 20,
            message: '计划名称长度为2~20位',
            trigger: 'blur',
          },
        ],
        image: [
          {
            required: true,
            message: '请上传图片',
            trigger: 'blur',
          },
        ],
        author: [
          {
            required: true,
            message: '请输入作者',
            trigger: 'blur',
          },
        ],
        state: [
          {
            required: true,
            message: '请选择计划状态',
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
      if (route.params.id) {
        const { code, data } = await API.getPlanInfo(route.params.id)
        if (+code === 200) {
          state.model = data
        }
      }
    })

    const submit = () => {
      form.value.validate(async valid => {
        if (valid) {
          const { code, msg } = await API[
            route.params.id ? 'editPlan' : 'addPlan'
          ](state.model)
          if (+code === 200) {
            ctx.$message.success(msg)
            // 关闭当前页面
            store.dispatch('tags/delTag', route)
            // 返回用户列表，带上一个时间戳参数，让页面刷新
            router.push('/plan/plan?t=' + Date.now())
          }
        }
      })
    }

    return {
      ...toRefs(state),
      form,
      submit,
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

