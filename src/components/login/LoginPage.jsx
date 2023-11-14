import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/authSlice';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
export function LoginPage() {
  const dispatch = useDispatch();
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const schema = yup.object().shape({
    name: yup.string().required(),
    password: yup.string().required(),
  const navigate = useNavigate();

  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  function onSubmit(data) {
    dispatch(login(data));
    reset({ keepValues: true });
  }
  useEffect(() => {
    if (user && user !== "inactive") {
      const path = "/" + user.roleName.toLowerCase();
      navigate(path);
    }
  }, [user, isError, isSuccess, message, dispatch, navigate]);
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center min-vh-100 body-bg">
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
                <h3 className="format-text" style={{ fontWeight: "bold" }}>
                  Welcome To Dormitory FPTU
                </h3>
              </div>
              <div className="input-group mb-3 form-control-lg justify-content-center">
                <h3 className="format-text" style={{ fontWeight: "bold" }}>
                  CAMPUS HOLA
                </h3>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='input-group mb-3'>
                  <input
                    type='text'
                    className='form-control form-control-lg bg-light fs-6'
                    placeholder='Username'
                    {...register('name')}
                  />
                </div>
                {isSubmitted && errors.name && (
                  <p style={{ color: 'red' }}>{errors.name.message}</p>
                )}
                <div className='input-group mb-3'>
                  <input
                    type='password'
                    placeholder='Password'
                    className='form-control form-control-lg bg-light fs-6'
                    {...register('password')}
                  />
                </div>
                {errors.password && (
                  <p style={{ color: 'red' }}>{errors.password.message}</p>
                )}
                {isValid && isSubmitted && isError ? (
                  <p style={{ color: 'red', fontSize: '13px' }}>
                    {'Account not existed!'}
                  </p>
                ) : isValid && isSubmitted && user === 'inactive' ? (
                  <p style={{ color: 'red', fontSize: '13px' }}>
                    {'Account is not allowed!'}

                  </p>
                ) : (
                  ""
                )}
                <div className="input-group mb-3 d-flex justify-content-between">
                  <div></div>
                  <div className="forget">
                    <small>
                      <Link to="/forgetPassword">Forget Password?</Link>
                    </small>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <button
                    type='submit'
                    className='btn btn-lg login w-100 fs-6 font-text'
                    style={{ backgroundColor: 'orangered', color: 'white' }}

                  >
                    Login
                  </button>
                </div>
              </form>
            </div>

            {/* <div
              className="row"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <small>
                Do not have account?<Link to="/signup">Sign Up</Link>
              </small>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
