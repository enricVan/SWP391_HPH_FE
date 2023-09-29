import axios from "./axios";
const API_URL = "v1/auth/authenticate";
const login = async (userData) => {
  const res = await axios.post(API_URL, userData);
  if (res.data) {
    localStorage.setItem("token", JSON.stringify(res.data.token));
    localStorage.setItem("role", res.data.role);
    localStorage.setItem("username", res.data.username);
  }
  return res.data;
};
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
};
const authService = {
  login,
  logout,
};
export default authService;
