import axios from "axios";
const BASE_URL = "http://localhost:8888/api/v1/";
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
// privateAxios.interceptors.response.use(
//   function (response) {
//     console.log(response);
//     return response;
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     console.log(error.message);
//     if (error) return error;
//     return Promise.reject(error);
//   }
// );
