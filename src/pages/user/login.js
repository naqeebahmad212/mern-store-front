import React, { Fragment, useEffect, useState } from "react";
import "./singUp.css";
import { MdLock, MdLockOpen, MdMailOutline } from "react-icons/md";

import axios from "axios";
import { server } from "../../redux/store";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  authReducer,
  setLoading,
  setUserInfo,
} from "../../redux/userSlice/userSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";

const UserLogin = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "profile";
  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/${redirect}`);
    }
  }, [isAuthenticated, navigate, redirect]);

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const data = { email, password };
    dispatch(setLoading(true));
    axios
      .post(`${server}/login`, data, { withCredentials: true })
      .then((res) => {
        dispatch(setLoading(false));
        toast.success("login successfuly");
        dispatch(setUserInfo(res.data.user));
        dispatch(authReducer(true));
        navigate("/");
      })
      .catch((err) => {
        dispatch(setLoading(false));
        toast.error(err.response.data.message);
      });
  };

  return (
    <Fragment>
      <div className="signup-form vh-100 w-100 d-flex justify-content-center mt-5">
        <form className="signup-form" onSubmit={submitHandler}>
          <h5 className="text-center">Login Form</h5>

          <div className="signup-box">
            <MdMailOutline />
            <label className="form-label" htmlFor="Email">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name=""
              id=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="signup-box">
            <MdLockOpen />
            <label className="form-label" htmlFor="Password">
              Password
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Password"
              name=""
              id=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="forget-link">
            <Link to={"/forgot/password"}>Forgot password ?</Link>
          </p>

          <button className="btn btn-primary mt-3" type="submit">
            Login
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default UserLogin;
