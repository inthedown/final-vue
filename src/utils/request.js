import axios from "axios";
import { ElMessage } from "element-plus";
import store from "@/store";
import router from "@/router";

const service = axios.create({
  baseURL: "/",
  timeout: 10000,
  withCredentials: true,
});

// 拦截请求
service.interceptors.request.use(
  (config) => {
    const { authorization } = store.state.app;
    if (authorization) {
      config.headers.Authorization = `${authorization.token}`;
    }
    return config;
  },
  (error) => {
    // console.log(error);
    return Promise.reject(error);
  }
);

// 拦截响应
service.interceptors.response.use(async (response) => {
  if (response.data.rspCode === "401") {
    const { authorization } = store.state.app;
    if (!authorization || !authorization.refresh_token) {
      if (router.currentRoute.value.name === "login") {
        return Promise.reject(error);
      }
      const redirect = encodeURIComponent(window.location.href);
      router.push(`/login?redirect=${redirect}`);
      store.dispatch("app/clearToken");
      setTimeout(() => {
        ElMessage.closeAll();
        try {
          ElMessage.error(response.rspMsg);
        } catch (err) {
          ElMessage.error(error.message);
        }
      });
      return Promise.reject(error);
    }
    try {
      const res = await axios({
        method: "PUT",
        url: "/api/authorizations",
        timeout: 10000,
        headers: {
          Authorization: `${authorization.refresh_token}`,
        },
      });
      store.commit("app/setToken", {
        token: res.data.data.token,
      });

      return service(error.config);
    } catch (err) {
      const redirect = encodeURIComponent(window.location.href);
      router.push(`/login?redirect=${redirect}`);
      store.dispatch("app/clearToken");
      return Promise.reject(err);
    }
  }

  return response.data;
});

export default service;
