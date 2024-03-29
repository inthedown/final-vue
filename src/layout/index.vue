
<template>
  <div class="wrapper" :class="{ fluid: isFluid }">
    <sidebar v-if="isMenusShow && !isHorizontalMenu" />
    <div class="right" :class="{ flex: isTopbarFixed }">
      <div class="top">
        <topbar />
        <menus mode="horizontal" v-if="isMenusShow && isHorizontalMenu" />
        <tagsbar />
        <breadcrumbs
          v-if="isBreadcrumbsShow"
          @on-breadcrumbs-change="handleBreadcrumbsChange"
        />
      </div>
      <div class="main" :class="{ pt0: isBreadcrumbsShow && paddingFlag }">
        <Content />
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, computed } from 'vue'
import Sidebar from './components/Sidebar/index.vue'
import Topbar from './components/Topbar/index.vue'
import Menus from './components/Sidebar/Menus.vue'
import Tagsbar from './components/Tagsbar/index.vue'
import Breadcrumbs from './components/Topbar/Breadcrumbs.vue'
import Content from './components/Content/index.vue'
import { useResizeHandler } from './hooks/useResizeHandler'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'layout',
  components: {
    Sidebar,
    Topbar,
    Menus,
    Tagsbar,
    Breadcrumbs,
    Content,
  },
  setup() {
    useResizeHandler()
    const store = useStore()
    const defaultSettings = computed(() => store.state.layoutSettings)
    const isFluid = computed(() => defaultSettings.value.layout.isFluid)
    const isTopbarFixed = computed(() => defaultSettings.value.topbar.isFixed)
    const isMenusShow = computed(() => defaultSettings.value.menus.isShow)
    const isHorizontalMenu = computed(
      () => defaultSettings.value.menus.mode === 'horizontal'
    )
    const isBreadcrumbsShow = computed(
      () => isHorizontalMenu.value && defaultSettings.value.breadcrumbs.isShow
    )
    const paddingFlag = ref(true)
    const handleBreadcrumbsChange = boo => {
      paddingFlag.value = boo
    }

    return {
      isFluid,
      isTopbarFixed,
      isMenusShow,
      isHorizontalMenu,
      isBreadcrumbsShow,
      paddingFlag,
      handleBreadcrumbsChange,
    }
  },
})
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  margin: 0 auto;
  width: 1440px;
  height: 100%;
  &.fluid {
    width: 100%;
  }

  .right {
    flex: 1;
    overflow: auto;
    &.flex {
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .top {
      background: #fff;
    }
    .main {
      flex: 1;
      background: #f5f5f5;
      padding: 16px;
      overflow: auto;
      &.pt0 {
        padding-top: 0;
      }
    }
  }
}
</style>
