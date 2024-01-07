import React, { Fragment, useEffect, useState } from "react";
import "../user/singUp.css";
// import Profi "../user/Profile.png";
import {
  MdAccountTree,
  MdAttachMoney,
  MdDescription,
  MdLock,
  MdLockClock,
  MdLockOpen,
  MdMailOutline,
  MdMoney,
  MdSpellcheck,
  MdStorage,
} from "react-icons/md";

import axios from "axios";
import { server } from "../../redux/store";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  authenticate,
  setLoading,
  setUserInfo,
} from "../../redux/userSlice/userSlice";
import { useNavigate } from "react-router-dom";

const CreateProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [files, setFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [description, setDescription] = useState("");

  const profileHandler = (e) => {
    if (e.target.files.length > 0) {
      const imageFiles = Array.from(e.target.files);
      setFiles([]);
      setImagePreview([]);
      imageFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImagePreview((old) => [...old, reader.result]);
            setFiles((old) => [...old, reader.result]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    if(files.length < 1){
        return toast.error('Please upload product images')
    }

    const formData = new FormData();
    formData.set('name',name)
    formData.set('price',price)
    formData.set('stock',stock)
    formData.set('description',description)
    formData.set('category',category)
    files.forEach((file)=>{
        formData.append('files',file)
    })

    dispatch(setLoading(true));
    axios
      .post(`${server}/new/product`, formData, { withCredentials: true })
      .then((res) => {
        dispatch(setLoading(false));
        toast.success("Products added successfuly");
        // navigate('/profile')
      })
      .catch((err) => {
        dispatch(setLoading(false));
        toast.error(err.response.data.message);
      });
  };

  return (
    <Fragment>
      <div className="signup-form mt-1 vh-100 w-100 d-flex justify-content-center ">
        <form className="signup-form" onSubmit={submitHandler}>
          <h5>New Product</h5>
          <div className="signup-box">
            <MdSpellcheck />
            <label className="form-label" htmlFor="Name">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name=""
              id=""
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="signup-box">
            <MdDescription />
            <label className="form-label" htmlFor="Description">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              name=""
              id=""
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="signup-box">
            <MdAttachMoney />
            <label className="form-label" htmlFor="Password">
              Price
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Price"
              name=""
              id=""
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="signup-box">
            <MdStorage />
            <label className="form-label" htmlFor="Stock">
              Stock
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Stock"
              name=""
              id=""
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          <div className="signup-box">
            <label className="form-label" htmlFor="Stock">
              Select category
            </label>
            <MdAccountTree />
            <select onChange={(e) => setCategory(e.target.value)}>
              <option value="">Choose Category</option>
              {categories.map((cate) => (
                <option key={cate} value={cate}>
                  {cate}
                </option>
              ))}
            </select>
          </div>

          <div className="profile-container flex-wrap position-relative">
            {imagePreview && (
              <Fragment>
                {imagePreview.map((image, index) => (
                  <Fragment>
                    <div className="product-image-box mx-1 mt-1">
                      <img key={index} src={image} alt="Product Preview" />
                    </div>{" "}
                    <br />
                  </Fragment>
                ))}
              </Fragment>
            )}
            <input
              className="file-selector-product"
              type="file"
              accept="image/*"
              onChange={profileHandler}
              multiple
              name=""
              id=""
            />
          </div>

          <button className="btn btn-primary mt-3" type="submit">
            Add
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default CreateProducts;
