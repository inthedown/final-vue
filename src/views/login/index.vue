<template>
  <div class="ve_container">
    <el-form class="form" :model="model" :rules="rules" ref="loginForm">
      <h3>Hello!</h3>
      <h2>欢迎登陆</h2>
      <h1 class="title">BOE画屏发布系统</h1>
      <el-form-item prop="userName">
        <el-input
          class="text"
          v-model="model.userName"
          prefix-icon="el-icon-user-solid"
          clearable
          placeholder="用户名"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          class="text"
          v-model="model.password"
          prefix-icon="el-icon-lock"
          show-password
          clearable
          placeholder="密码"
        />
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="model.role">
          <el-radio label="教师" model-value="3" />
          <el-radio label="学生" model-value="2" />
          <el-radio label="管理员" model-value="1" />
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          round
          class="btn"
          @click="submit"
        >
          {{ btnText }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="zuo">
    <img src="/src/assets/img/denglu.png" class="fengmian" />
    <div class="bottom">"Copyright © 2022 臭华子团队 版权所有"</div>
  </div>
</template>

<script>
import {
  defineComponent,
  getCurrentInstance,
  reactive,
  toRefs,
  ref,
  computed,
} from "vue";
import { Login } from "@/api/login";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { encryptNoKey } from "@/utils/encrypt";

export default defineComponent({
  name: "login",
  setup() {
    const { proxy: ctx } = getCurrentInstance(); // 可以把ctx当成vue2中的this
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const state = reactive({
      model: {
        userName: "admin",
        password: "123456",
        role: "",
      },
      roleMap: [
        { key: 1, value: "管理员" },
        { key: 2, value: "学生" },
        { key: 3, value: "教师" },
      ],
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
      loading: false,
      btnText: computed(() => (state.loading ? "登录中..." : "登录")),
      loginForm: ref(null),
      submit: () => {
        if (state.loading) {
          return;
        }
        state.loginForm.validate(async (valid) => {
          if (valid) {
            state.loading = true;
            //加密
            var model = { ...state.model };
            if (!model.role) {
              ctx.$message.error("请选择角色");
              return;
            }
            model.role = state.roleMap.find(
              (item) => item.value == model.role
            ).key;
            model.userName = encryptNoKey(model.userName);
            model.password = encryptNoKey(model.password);
            // const { code, data, message } = await Login(  model, {headers: {from: 'web'}})
            // if (+code === 200) {
            //   ctx.$message.success({
            //     message: '登录成功',
            //     duration: 1000,
            //   })
            //   const targetPath = decodeURIComponent(route.query.redirect)
            //   if (targetPath.startsWith('http')) {
            //     // 如果是一个url地址
            //     window.location.href = targetPath
            //   } else if (targetPath.startsWith('/')) {
            //     // 如果是内部路由地址
            //     router.push(targetPath)
            //   } else {
            //     router.push('/')
            //   }
            //   state.loading = false
            //   store.dispatch('app/setToken', data)
            // } else {
            //   ctx.$message.error(message)
            //   state.loading = false
            // }
            Login(model, { headers: { from: "web" } })
              .then((response) => {
                const { code, data, message } = response;
                if (+code === 200) {
                  ctx.$message.success({
                    message: "登录成功",
                    duration: 1000,
                  });
                  const targetPath = decodeURIComponent(route.query.redirect);
                  if (targetPath.startsWith("http")) {
                    // 如果是一个url地址
                    window.location.href = targetPath;
                  } else if (targetPath.startsWith("/")) {
                    // 如果是内部路由地址
                    router.push(targetPath);
                  } else {
                    router.push("/");
                  }
                  state.loading = false;
                  store.dispatch("app/setToken", data);
                } else {
                  ctx.$message.error(message);
                  state.loading = false;
                }
              })
              .catch((error) => {
                console.error(error);
                ctx.$message.error("登录失败");
                state.loading = false;
              });
          }
        });
      },
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
.ve_container {
  position: absolute;
  z-index: 1;
  width: 450px;
  top: 40%;
  right: 150px;
  transform: translateY(-50%);
  transition: all 1s;
  min-height: 700px;

  h1 {
    font-size: 24px;
    transition: all 1s;
    font-weight: bold;
    margin-bottom: 36px;
    color: #1890ff;
  }
  h3 {
    color: #16171c;
    font-size: 60px;
    margin: 0;
  }

  .form {
    width: 520px;
    max-width: 100%;
    padding: 0 24px;
    box-sizing: border-box;
    margin: 160px auto 0;
    .title {
      font-size: 24px;
      transition: all 1s;
      // font-weight: bold;
      margin-bottom: 36px;
      color: #1890ff;
    }
    .text {
      font-size: 16px;

      :deep(.el-input__inner) {
        border: 1px solid rgba(31, 20, 20, 0.1);
        background: rgba(158, 153, 153, 0.1);
        color: #16171c;
        height: 48px;
        line-height: 48px;
        border-radius: 80px;
        &::placeholder {
          color: rgba(255, 255, 255, 0.2);
        }
      }
    }
    .btn {
      width: 60%;
    }
  }
}

.zuo {
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  .bottom {
    font-size: 15px;
    bottom: 2rem;
    color: #5e6875;
    position: relative;
    margin-left: 700px;
    width: 100%;
  }
  .fengmian {
    width: 100%;
  }
}
</style>
