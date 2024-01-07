import React, { Fragment, useEffect, useState } from "react";
import "./singUp.css";
import { MdLock, MdLockClock, MdLockOpen, MdMailOutline } from "react-icons/md";

import axios from "axios";
import { server } from "../../redux/store";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { authenticate, setLoading, setUserInfo } from "../../redux/userSlice/userSlice";
import { useNavigate } from "react-router-dom"


const UpdatePass = () => {
const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword,SetConfirmPassword]=useState('')

  


  const submitHandler = (e) => {
    e.preventDefault();
    if(currentPassword.value !== confirmPassword.value){
        return toast.error('Confirm Password does not match')
    }
    const data={newPassword, currentPassword}
    dispatch(setLoading(true));
    axios
      .put(`${server}/update/password`,data,{withCredentials:true})
      .then((res) => {
        dispatch(setLoading(false));
        toast.success("Password updated successfuly");
        navigate('/profile')
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
            <label className="form-label" htmlFor="">Current Passowrd</label>
          <MdLockOpen />
            <input
              type="password"
              className="form-control"
              placeholder="Current Password"
              name=""
              id=""
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div className="signup-box my-3">
          <label className="form-label" htmlFor="">New Passowrd</label>

            <MdLockOpen />
            <input
              type="password"
              className="form-control"
              placeholder=" New Password"
              name=""
              id=""
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="signup-box ">
          <label className="form-label" htmlFor="">Confirm Passowrd</label>

            <MdLock />
            <input
              type="password"
              className="form-control"
              placeholder=" Confrim Password"
              name=""
              id=""
              value={confirmPassword}
              onChange={(e) => SetConfirmPassword(e.target.value)}
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

export default UpdatePass;
