import axios from "axios";
const API_URL = "https://dummyjson.com/auth/";
const login = async (userData) => {
  const res = await axios.post(API_URL + "login", userData);
  if (res.data) {
    localStorage.setItem("token", JSON.stringify(res.data.token));
    localStorage.setItem("role", JSON.stringify(res.data.role));
  }
  return res.data;
};
const logout = () => {
  localStorage.removeItem("token");
};
const authService = {
  login,
  logout,
};
export default authService;
