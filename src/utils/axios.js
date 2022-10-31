import axios from "axios";

const instance = axios.create({
  baseURL: "http://91.231.182.50/api",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");

  return config;
});

export default instance;
