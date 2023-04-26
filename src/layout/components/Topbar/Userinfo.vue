

<template>
  <el-dropdown trigger="click">
    <div class="userinfo">
      <template v-if="!userinfo">
        <img v-if="userInfo.role==1" class="avatar" :src="state.adminUrl" />
         <img v-else-if="userInfo.role==2"  class="avatar" :src="state.stuUrl" />
          <img v-else-if="userInfo.role==3"  class="avatar" :src="state.teaUrl" />
        {{ userInfo.name }}
      </template>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>修改密码</el-dropdown-item>
        <lock-modal />
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script>
import { defineComponent ,reactive} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useUserinfo } from '@/components/Avatar/hooks/useUserinfo'
import LockModal from './LockModal.vue'
import adminUrl from '@/assets/img/admin.png';
import stuUrl from '@/assets/img/stu.png';
import teaUrl from '@/assets/img/tea.png';
export default defineComponent({
  components: {
    LockModal,
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const state=reactive({
      adminUrl,
      stuUrl,
      teaUrl
    })
    const { userInfo } = useUserinfo()

    // 退出
    const logout = () => {
      // 清除token
      store.dispatch('app/clearToken')
      router.push('/login')
    }

    return {
      userInfo,
      logout,
      state
    }
  },
})
</script>

<style lang="scss" scoped>
.userinfo {
  padding: 0 16px;
  line-height: 48px;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    background: #f5f5f5;
  }
  .el-icon-user {
    font-size: 20px;
    margin-right: 8px;
  }
  .avatar {
    margin-right: 8px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
}
</style>
