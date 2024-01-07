import React, { Fragment, useEffect, useState } from "react";
import './singUp.css'
import { MdMailOutline, MdPerson } from 'react-icons/md';
import Profile from './Profile.png'
import axios from "axios";
import { server } from "../../redux/store";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUserInfo } from "../../redux/userSlice/userSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {

    const dispatch=useDispatch() 
    const navigate=useNavigate()
    const {id}=useParams()
    
    useEffect(()=>{
        axios.get(`${server}/me`,{withCredentials:true})
        .then((res)=>{
            setName(res.data.user.name)
            setEmail(res.data.user.email)
            setImagePreview(res.data.user.image.url)

        })
        .catch((err)=>{
            toast.error(err.meesage)
        })
    },[])
   
    const [name, setName]=useState('')
    const [email, setEmail]=useState('')
    const [file, setFile]=useState('')
    const [imagePreview, setImagePreview]=useState('' )







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



    const updateHandler=(e)=>{
        e.preventDefault()
      
            const formData=new FormData()
            formData.set('name', name)
            formData.set('email', email)
            formData.set('file',file)

            dispatch(setLoading(true))
            axios.put(`${server}/update/me/${id}`,formData,{withCredentials:true})
            .then((res)=>{
                
                dispatch(setLoading(false))
                toast.success('Profile Updated successfuly')
                navigate('/login')
                
            })
            .catch((err)=>{
                dispatch(setLoading(false))
                toast.error(err.response.data.message)
            })
        

        
    }




    

  return (
    <Fragment>
     
      <div className="signup-form vh-100 w-100 d-flex justify-content-center ">
        <form className="signup-form" onSubmit={updateHandler}>

            <div className="profile-container position-relative">
            <div className="profile-box">
                <img accept="image/*" src={imagePreview ? imagePreview : Profile} alt="Profile" />
            </div>
                <input className="file-selector" type="file" onChange={profileHandler} name="" id="" />
            </div>

            <h5>Edit Profile</h5>
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






          <button className="btn btn-primary mt-3" type="submit">Update</button>
        </form>
      </div>
    </Fragment>
  );
};

export default EditUser;
