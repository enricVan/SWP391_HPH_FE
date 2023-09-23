import "./ChangePassword.css";
import imagelogo from "./imagelogo/FrogFind.png";
export default function ChangePassword() {
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
        <div className="col-md-6 right-box">
          <div className="row justify-content-center">
            <div className="header-text mb-4" style={{ color: "orangered" }}>
              <h3>Change Password?</h3>
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control form-control-lg bg-light fs-6"
                placeholder="Old Password"
                name="username"
                autoComplete="off"
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                placeholder="New Password"
                className="form-control form-control-lg bg-light fs-6"
                name="password"
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                placeholder="Confirm New Password"
                className="form-control form-control-lg bg-light fs-6"
                name="passwordconfirm"
              />
            </div>
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
      </div>
    </div>
  );
}
