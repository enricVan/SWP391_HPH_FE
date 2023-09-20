import axios from "axios";
const API_URL = "http://localhost:8888/api/v1/auth/authenticate";
const login = async (userData) => {
  const res = await axios.post(API_URL, userData);
  if (res.data) {
    localStorage.setItem("token", JSON.stringify(res.data.token));
    localStorage.setItem("role", res.data.role);
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
