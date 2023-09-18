import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./style.css";
import validation from './validationlogin'
export function LoginPage() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    name:'',
    password:''
  })

  function handleChange(e){
    setValues({...values, [e.target.name]: e.target.value})
  }

  const[errors, setError] = useState({})
  
  function handleSubmit(e){
    e.preventDefault();
    setError(validation(values))
  }
  
 useEffect(()=>{
    if(Object.keys(errors).length === 0 && (values.name !== "" && values.password !== "")){
      navigate("/student");
    }
 }, [errors])

  
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="row border rounder-5 p-3 bg-white shadow box-area">
          <div className="col-md-6 left-box rounder-4 d-flex justify-content-center align-items-center flex-column">
            <div className="featured-image mb-3">
              <img
                src="src/assets/image/logo-moi.png"
                className="img-fluid"
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div className="col-md-6 right-box">
            <div className="row justify-content-center">
              <div className="header-text mb-4">
                <h3>Welcome To Dormitory FPTU</h3>
              </div>
              <div className="input-group mb-3 form-control-lg justify-content-center">
                <select className="color-text">
                  <option value={0}>Select Campus:</option>
                  <option value={1}>Hòa Lạc</option>
                  <option value={2}>Hồ Chí Minh</option>
                  <option value={3}>Cần Thơ</option>
                  <option value={4}>Đà Nẵng</option>
                  <option value={5}>Quy Nhơn</option>
                </select>
              </div>
              <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Username"
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                />
              </div>
              {errors.name && <p style={{color:"red",fontSize:"13px"}}>{errors.name}</p>}
              <div className="input-group mb-3">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control form-control-lg bg-light fs-6"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                />
              </div>
              {errors.password && <p style={{color:"red",fontSize:"13px"}}>{errors.password}</p>}
              <div className="input-group mb-3 d-flex justify-content-between">
                <div />
                <div className="forget">
                  <small>
                    <a href="#">Forget Password?</a>
                  </small>
                </div>
              </div>
              <div className="input-group mb-3">
                <button
                  type="submit"
                  className="btn btn-lg login w-100 fs-6 font-text"
                >
                  Login
                </button>
              </div>
              <div className="input-group mb-3">
                <button
                  type="submit"
                  className="btn btn-lg btn-light w-100 fs-6"
                >
                  <img
                    src="src/assets/image/logo-gg.jpg"
                    style={{ width: 20, height: 20}}
                    className="me-2"
                  />
                  <small>Sign In With Google</small>
                </button>
              </div>
              </form>
            </div>
            
            <div className="row">
              <small>
                Do not have account?<a href="#">Sign Up</a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  }
