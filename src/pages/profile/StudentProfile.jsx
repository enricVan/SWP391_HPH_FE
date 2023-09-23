import "./studentProfile.css";
import avatar from "../../assets/image/avatar.jpeg";
export default function StudentProfile() {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 body-bg">
      <div className="row border rounder-5 p-3 bg-white shadow box-area">
        <div className="col-md-6 left-box rounder-4 d-flex justify-content-center align-items-center flex-column">
          <div className="featured-image mb-3">
            <img src={avatar} className="edit-img" />
          </div>
        </div>
        <div className="col-md-6 right-box">
          <div className="row justify-content-center">
            <div className="header-text mb-4">
              <h3>My Profile</h3>
            </div>
            <div className="input-group mb-3 form-control-lg justify-content-center">
              <div className="row">
                <div className="col-md-4">
                  <h5>FullName:</h5>
                  <h5>DOB:</h5>
                  <h5>Gender:</h5>
                  <h5>Bed:</h5>
                  <h5>Email:</h5>
                </div>
                <div className="col-md-8">
                  <h5>Vũ Hoàng Long</h5>
                  <h5>10/08/2003</h5>
                  <h5>Male</h5>
                  <h5>F412L-NO.7</h5>
                  <h5>longvhhe172863@fpt.edu.vn</h5>
                </div>
              </div>
            </div>
            <div className="input-group mb-3 form-control-lg justify-content-center"></div>
          </div>
          <div className="input-group mb-3" />
          <div className="input-group mb-3 d-flex justify-content-between"></div>
          <div className="input-group mb-3" />
        </div>
      </div>
    </div>
  );
}
