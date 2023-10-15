import axios from "./axios";
const API_URL = "v1/auth/authenticate";
const login = async (userData) => {
  const res = await axios.post(API_URL, userData);
  if (res.data) {
    localStorage.setItem("token", JSON.stringify(res.data.access_token));
  }
  return res.data.access_token;
};
const logout = () => {
  localStorage.removeItem("token");
};
const authService = {
  login,
  logout,
};
export default authService;
