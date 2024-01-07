import React, { Fragment, useState } from "react";
import './singUp.css'
import { MdLock, MdLockOpen, MdMailOutline, MdPerson } from 'react-icons/md';
import Profile from './Profile.png'
import axios from "axios";
import { server } from "../../redux/store";
import { toast } from "react-toastify";
import Loader from "../../components/loader";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/userSlice/userSlice";
import { useNavigate } from "react-router-dom";
const SingUp = () => {

    const dispatch=useDispatch() 
    const navigate=useNavigate()

    const {isLoading}=useSelector((state)=> state.user)
    const [name, setName]=useState('')
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [confirmPassword, setConfirmPassword]=useState('')
    const [file, setFile]=useState('')
    const [imagePreview, setImagePreview]=useState('')




    const profileHandler=(e)=>{
        if(e.target.files.length>0){
            const reader=new FileReader()
            reader.onload=()=>{
                if(reader.readyState===2){
                    setImagePreview(reader.result)
                    setFile(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }



    const submitHandler=(e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
            toast.error('Confirm password does not match')
        }else{
            const formData=new FormData()
            formData.set('name', name)
            formData.set('email', email)
            formData.set('password', password)
            formData.set('confirmPassword', confirmPassword)
            formData.set('file',file)

            dispatch(setLoading(true))
            axios.post(`${server}/register`,formData)
            .then((res)=>{
                dispatch(setLoading(false))
                toast.success('Account created successfuly')
                navigate('/login')
                
            })
            .catch((err)=>{
                dispatch(setLoading(false))
                toast.error(err.response.data.message)
            })
        }

        
    }




    

  return (
    <Fragment>
     
      <div className="signup-form vh-100 w-100 d-flex justify-content-center ">
        <form className="signup-form" onSubmit={submitHandler}>

            <div className="profile-container position-relative">
            <div className="profile-box">
                <img accept="image/*" src={imagePreview ? imagePreview : Profile} alt="Profile" />
            </div>
                <input className="file-selector" type="file" onChange={profileHandler} name="" id="" />
            </div>

            <h5>Regostration Form</h5>
          <div className="signup-box">
            <MdPerson/>
            <label className="form-label" htmlFor="Name">Name</label>
            <input type="text"
             className="form-control"
              placeholder="Name" name="" id=""
              value={name}
              onChange={(e)=> setName(e.target.value)}
              />
          </div>

          <div className="signup-box">
            <MdMailOutline/>
            <label className="form-label" htmlFor="Email">Email</label>
            <input type="email"
             className="form-control" 
             placeholder="Email" name="" id="" 
             value={email}
             onChange={(e)=> setEmail(e.target.value)}
             />
          </div>

          <div className="signup-box">
            <MdLockOpen/>
            <label className="form-label" htmlFor="Password">Password</label>
            <input type="text"
             className="form-control" 
             placeholder="Password" name="" id=""
             value={password}
             onChange={(e)=> setPassword(e.target.value)}
              />
          </div>

          <div className="signup-box">
            <MdLock/>
            <label className="form-label" htmlFor="Confirm Password">Confirm Password</label>
            <input type="text"
             className="form-control" 
             placeholder="Confirm Password" name="" id=""
             value={confirmPassword}
             onChange={(e)=> setConfirmPassword(e.target.value)}
              />
          </div>


          <button className="btn btn-primary mt-3" type="submit">Register</button>
        </form>
      </div>
    </Fragment>
  );
};

export default SingUp;
