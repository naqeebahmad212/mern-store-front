import React, { Fragment, useEffect, useState } from "react";
import "./singUp.css";
import { MdLock, MdLockOpen, MdMailOutline } from "react-icons/md";

import axios from "axios";
import { server } from "../../redux/store";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { authenticate, setLoading, setUserInfo } from "../../redux/userSlice/userSlice";
import { Link, useNavigate, useParams } from "react-router-dom"


const ResetPassword = () => {
const navigate = useNavigate();
const {token}=useParams()

  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  
//   axios.get(`${server}/frgot/password`,)


  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
        return toast.error('Confirm password does not match')
    }
    dispatch(setLoading(true));
    const formData=new FormData()
    formData.set('password',password)
    
    axios
      .put(`${server}/password/reset/${token}`,formData)
      .then((res) => {
        dispatch(setLoading(false));
        console.log(res)
        toast.success(res.data.message);
        // navigate('/')
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
          <h5 className="text-center">Set Passowrd</h5>

          <div className="signup-box">
            <MdMailOutline />
            <label className="form-label" htmlFor="New Password">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="New Password"
              name=""
              id=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="signup-box">
            <MdMailOutline />
            <label className="form-label" htmlFor="Confirm Password">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              name=""
              id=""
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

         

          <button className="btn btn-primary mt-3" type="submit">
            Update
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default ResetPassword;
