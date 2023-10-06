import axios from "axios";
const BASE_URL = "http://localhost:8888/api/";
export default axios.create({
  baseURL: BASE_URL,
});
const token = JSON.parse(localStorage.getItem("token"));
export const privateAxios = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${token}` },
});
