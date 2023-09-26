import { useState } from "react";
import "./ForgetPassword.css";
import imagelogo from "./imagelogo/FrogFind.png";
import axios from "axios";
export default function ForgetPassword() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setErrorMessage('');
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrorMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put('http://localhost:8888/api/v1/auth/forgetPassword', {
        username,
        email
      });

      console.log('Password change successful:', response.data);
      setErrorMessage('Password change successful.');
    } catch (error) {
      console.error('Password change failed:', error);

      if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid username or email.');
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 body-bg">
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
        <form onSubmit={handleSubmit}>
          <div className="col-md-6 right-box">
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <div className="row justify-content-center">
              <div className="header-text mb-4" style={{ color: "orangered" }}>
                <h3>Forget Password?</h3>
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Your username"
                  name="username"
                  autoComplete="off"
                  onChange={handleUsernameChange}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="email"
                  placeholder="Your email"
                  className="form-control form-control-lg bg-light fs-6"
                  name="email"
                  onChange={handleEmailChange}
                />
              </div>
            </div>
            <div className="input-group mb-3">
              <button
                type="submit"
                className="btn btn-lg login w-100 fs-6 font-text"
                style={{ backgroundColor: "orangered", color: "white" }}
              >
                Send New Password
              </button>
            </div>
          </div>
        </form>
        {/* <div className="input-group mb-3">
            <button type="submit" className="btn btn-lg btn-light w-100 fs-6">
              <img
                src={imagelogogg}
                style={{ width: 20, height: 20 }}
                className="me-2"
              />
              <small>Send new password to Gmail</small>
            </button>
          </div> */}

      </div>
    </div >
  );
}