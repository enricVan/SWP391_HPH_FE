import axios from "./axios";
const API_URL = "v1/auth/authenticate";
const login = async (userData) => {
  const res = await axios.post(API_URL, userData);
  if (res.data) {
    localStorage.setItem("token", JSON.stringify(res.data.access_token));
    localStorage.setItem("role", res.data.user.role.name);
  }
  return res.data.user;
};
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};
const authService = {
  login,
  logout,
};
export default authService;
