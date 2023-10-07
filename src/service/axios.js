import axios from "axios";
const BASE_URL = "http://localhost:8888/api/";
export default axios.create({
  baseURL: BASE_URL,
});
export const privateAxios = axios.create({
  baseURL: BASE_URL,
});
privateAxios.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("token"));
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);
