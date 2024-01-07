import React, { Fragment, useEffect, useState } from "react";
import "./singUp.css";
import { MdLock, MdLockOpen, MdMailOutline } from "react-icons/md";

import axios from "axios";
import { server } from "../../redux/store";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { authenticate, setLoading, setUserInfo } from "../../redux/userSlice/userSlice";
import { Link, useNavigate } from "react-router-dom"


const ForgotPassword = () => {
const navigate = useNavigate();

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");


  
//   axios.get(`${server}/frgot/password`,)


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const formData=new FormData()
    formData.set('email',email)
    axios
      .post(`${server}/forgot/password`,formData)
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
      console.log(email)
  };

  return (
    <Fragment>
    
      <div className="signup-form vh-100 w-100 d-flex justify-content-center mt-5">
        <form className="signup-form" onSubmit={submitHandler}>
          <h5 className="text-center">Reset Passowrd</h5>

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

         

          <button className="btn btn-primary mt-3" type="submit">
            Next
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
