

import { computed } from 'vue'
import { useStore } from 'vuex'

export const useUserinfo = () => {
  const store = useStore()
  const userInfo = computed(() => store.state.account.userinfo)

  return { userInfo }
}
