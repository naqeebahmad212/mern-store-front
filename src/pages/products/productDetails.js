import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { server } from "../../redux/store";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Carousel from "react-material-ui-carousel";
import "./productDetails.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductDetails,
  addToCart,
} from "../../redux/productSlice/productSlice";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating } from "@mui/material";
import ReviewCard from "../../components/cards/ReviewCard";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const { product } = useSelector((state) => state.product);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState();
  const [comment, setComment]=useState()
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
  
    axios
      .get(`${server}/product/${id}`)
      .then((res) => {
        dispatch(addProductDetails(res.data.product));
      })
      .catch((err) => {
        toast.error(err.message);
      });
      if(product.stock ===0 ){
        setQuantity(0)
      }
  }, [id, dispatch,product]);

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const increaseQuantity = () => {
    if (quantity >= product.stock) {
      return toast.error("Opps seems like no more Stock");
    }
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity <= 1) {
      return;
    }
    setQuantity(quantity - 1);
  };

  const addToCartHandler = () => {
    if(product.stock===0){
      return
    }
    const cartItems = {
      product: product._id,
      quantity,
      name: product.name,
      stock: product.stock,
      price: product.price,
      image: product.images[0].url,
    };
    dispatch(addToCart(cartItems));

    toast.success("Product Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };


  const reviewSubmitHandler=()=>{
    const data={rating,comment,id}
    axios.post(`${server}/new/review`,data,{withCredentials:true})
    .then((res)=>{
      dispatch(addProductDetails(res.data.product))
      toast.success('Review Added fro the Current product')
      submitReviewToggle()
    })
    .catch((err)=>{
      toast.error(err.message)
    })
  }

  return (
    <Fragment>
      <div className="product-details-container container-fuild d-flex ">
        <div className="product-preview">
          <div className="carousel-container">
            <Carousel className="w-100 h-100">
              {product &&
                product.images &&
                product.images.map((image, i) => (
                  <div className="carousel-img-div">
                    <img
                      className="carousel-image w-100"
                      key={i}
                      src={image.url}
                      alt={`${i} Slide`}
                    />
                  </div>
                ))}
            </Carousel>
          </div>
        </div>

        <div className="product-details mt-4">
          <div className="product-details-block-1">
            <h3 className="my-3">{product && product.name}</h3>
            <h5>Pkr. {product.price}</h5>
            <h6
              className="my-3"
              style={{
                color: product && product.stock > 0 ? "green" : "tomato",
              }}
            >
              {product && product.stock > 0 ? "InStock" : "OutOfStock"}
            </h6>

            <div className="rating-container d-flex justify-content-center justify-content-lg-start ">
              <Rating {...options} />(
              {product && product.totalReview})
            </div>
            <p>ProductId : {product && product._id}</p>
          </div>
          <div className="product-details-block-2 ">
            <div className="div-quantity">
              <button onClick={decreaseQuantity} className="quantity-btn">
                -
              </button>
              <input type="number" readOnly value={quantity} />
              <button onClick={increaseQuantity} className="quantity-btn">
                +
              </button>
            </div>
            <div className="addTocart">
              <button onClick={addToCartHandler} className="add-cart">
                ADD TO CART
              </button>
            </div>
            <div className="submit-review">
              <button
                onClick={submitReviewToggle}
                className="btn submit-review-btn mt-5"
              >
                Submit review
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="product-details-block-3 container d-flex justify-content-center align-items-center mb-5">
        <h4 className="mb-2"> Description : </h4>{" "}
        <p className="m-0 mx-2"> {product && product.description}</p>
      </div>

      <Dialog
        aria-label="simple-dialog-title"
        open={open}
        onClose={submitReviewToggle}
      >
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent className="submitDialog">
          <Rating
            onChange={(e) => setRating(e.target.value)}
            value={rating}
            size="large"
          />
          <textarea
            className="submitDialogTextArea"
            cols="30"
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitReviewToggle} color="secondary">
            Cancel
          </Button>
          <Button color="primary" onClick={reviewSubmitHandler}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <div className="review-container container d-flex mb-3">

        {product && product.reviews &&
        
        product.reviews.map(review => ( 
          
          <ReviewCard review={review} />
        ))
        
        }
        
      </div>
    </Fragment>
  );
};

export default ProductDetails;
