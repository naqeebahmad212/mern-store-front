import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { server } from "../../redux/store";
import { toast } from "react-toastify";
import ProfileImg from "./Profile.png";
import "./profile.css";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authReducer } from "../../redux/userSlice/userSlice";
// import ModalCard from "../../components/modal/modal";

const Profile = () => {
  const [user, setUser] = useState();
  const dispatch=useDispatch()
  useEffect(() => {
    axios
      .get(`${server}/me`, { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        toast.error(err.message);
        dispatch(authReducer(false))
      });
  }, [dispatch]);


  
  return (
    <Fragment>
      <div className="profile-container mt-5">
        <div className="container d-flex flex-column flex-lg-row ">
          <div className="profile-section ">
            <div className="w-100 profile">
              <div className="profile-image">
                <img
                  className="w-100"
                  src={
                    user && user.image && user.image.url
                      ? user.image.url
                      : ProfileImg
                  }
                  alt=""
                />
              </div>
            </div>
           
              <button  className="btn btn-secondary"> <Link to={user && `/user/${user._id}`}>Edit</Link> </button>
           
          </div>
          <div className="user-details-section flex-column flex-lg-row">
            <div className="details">
              <h3>Name : {user && user.name}</h3>
              <p> Email: {user && user.email}</p>
              <p className="my-2"> Joined on : {user && new Date(user.createdAt).toDateString()}</p>
            <Link to={`/update/password`} className="btn btn-secondary w-100">Upadate Passowrd</Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
