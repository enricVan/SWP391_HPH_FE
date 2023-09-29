import { Link } from "react-router-dom";
import axios from "../../service/axios";
import "./ChangePassword.css";
import imagelogo from "./imagelogo/FrogFind.png";
import { useState } from "react";

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    username: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if new password and confirm new password match
    if (formData.newPassword !== formData.confirmNewPassword) {
      setError("New password and confirm new password do not match.");
      return;
    }

    // Send a request to the backend to change the password using Axios
    axios
      .put("v1/auth/changePassword", {
        username: localStorage.getItem("username"),
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      })
      .then((response) => {
        console.log("Password change success:", response.data);
        alert("Password successfully changed!");
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
        setError(error.response ? error.response.data : error.message);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 body-bg">
      <div className="row border rounder-5 p-3 bg-white shadow box-area">
        <Link to="/student" style={{ width: "100%" }}>
          <button
            type="submit"
            className="btn btn-lg login w-100 fs-6 font-text"
            style={{ backgroundColor: "orangered", color: "white" }}
          >
            Back to dashboard
          </button>
        </Link>
        <form onSubmit={handleSubmit}>
          <div className="col-md-6 left-box rounder-4 d-flex justify-content-center align-items-center flex-column">
            <div className="featured-image mb-3">
              <img
                src={imagelogo}
                className="img-fluid"
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div className="col-md-6 right-box">
            <div className="row justify-content-center">
              <div className="header-text mb-4" style={{ color: "orangered" }}>
                <h3>Change Password?</h3>
              </div>

              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Old Password"
                  autoComplete="off"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  placeholder="New Password"
                  className="form-control form-control-lg bg-light fs-6"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="form-control form-control-lg bg-light fs-6"
                  name="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={handleInputChange}
                />
              </div>
              {error && <div style={{ color: "red" }}>{error}</div>}
            </div>
            <div className="input-group mb-3">
              <button
                type="submit"
                className="btn btn-lg login w-100 fs-6 font-text"
                style={{ backgroundColor: "orangered", color: "white" }}
              >
                Change Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
