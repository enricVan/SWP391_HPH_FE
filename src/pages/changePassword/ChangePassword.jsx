import { useEffect, useState } from "react";
import "./ChangePassword.css";
import imagelogo from "./imagelogo/FrogFind.png";
import axios, { privateAxios } from "../../service/axios";
import { Link } from "react-router-dom";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
export default function ChangePassword() {
  const user = JSON.parse(localStorage.getItem('user'));
  const userid = user.id;
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmNew, setconfirmNew] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOldPasswordChange = (event) => {
    setoldPassword(event.target.value);
    setErrorMessage("");
  };

  const handleNewPasswordChange = (event) => {
    setnewPassword(event.target.value);
    setErrorMessage("");
  };

  const handleConfirmNewChange = (event) => {
    setconfirmNew(event.target.value);
    setErrorMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(newPassword != confirmNew){
      setErrorMessage("Your New Password and Confirm isn't match");
      setoldPassword("");
      setnewPassword("");
      setconfirmNew("");
      return;
    }

    try {
      const response = privateAxios.put("change-password", {
        userid,
        oldPassword,
        newPassword,
      });

      console.log("Password change successful:", response.data);
      setErrorMessage("Password change successful.");
    } catch (error) {
      console.error("Password change failed:", error);

      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid username or email.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };
  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ marginTop: "20vh" }}
    >
      <div className="row border rounder-5 p-3 bg-white shadow box-area">
        <div className="col-md-6 left-box rounder-4 d-flex justify-content-center align-items-center flex-column">
          <div className="featured-image mb-3">
            <img
              src={imagelogo}
              className="img-fluid"
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="right-box">
              <div className="row justify-content-center">
                <div
                  className="header-text mb-4"
                  style={{ color: "orangered", fontWeight: "bold" }}
                >
                  <h3 style={{ fontWeight: "bold" }}>Change Password?</h3>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Your old password"
                    name="oldPassword"
                    autoComplete="off"
                    onChange={handleOldPasswordChange}
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    placeholder="Your new password"
                    className="form-control form-control-lg bg-light fs-6"
                    name="newPassword"
                    onChange={handleNewPasswordChange}
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    placeholder="Confirm your new password"
                    className="form-control form-control-lg bg-light fs-6"
                    name="confirmNew"
                    onChange={handleConfirmNewChange}
                  />
                </div>
              </div>
              {errorMessage && (
                <div style={{ color: "red" }}>{errorMessage}</div>
              )}
              <div className="input-group mb-3">
                <button
                  type="submit"
                  className="btn btn-lg login w-100 fs-6 font-text"
                  style={{ backgroundColor: "orangered", color: "white" }}
                >
                  Change Password
                </button>
                <div
                  className="col-md-12"
                  style={{
                    marginTop: "30px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Link to="../home">
                    <button
                      type="submit"
                      className="btn btn-lg login w-100 fs-6 font-text"
                      style={{ backgroundColor: "orangered", color: "white" }}
                    >
                      Back to Dashboard <KeyboardReturnIcon />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
