import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./cart.css";
import axios from "axios";
import { server } from "../../redux/store";
import {
  addToCart,
  removeCartItem,
} from "../../redux/productSlice/productSlice";
import { setLoading } from "../../redux/userSlice/userSlice";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const increaseQuantity = (id, stock, quantity) => {
    if (quantity >= stock) {
      return;
    }
    dispatch(setLoading(true));
    let newQyt = quantity + 1;
    axios
      .get(`${server}/product/${id}`)
      .then((res) => {
        const product = res.data.product;
        const cartItems = {
          product: product._id,
          quantity: newQyt,
          name: product.name,
          stock: product.stock,
          price: product.price,
          image: product.images[0].url,
        };
        dispatch(addToCart(cartItems));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const decreaseQuantity = (id, stock, quantity) => {
    if (quantity === 1) {
      return;
    }

    dispatch(setLoading(true));
    let newQyt = quantity - 1;
    axios
      .get(`${server}/product/${id}`)
      .then((res) => {
        const product = res.data.product;
        const cartItems = {
          product: product._id,
          quantity: newQyt,
          name: product.name,
          stock: product.stock,
          price: product.price,
          image: product.images[0].url,
        };
        dispatch(addToCart(cartItems));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const removeHandler = (id) => {
    dispatch(removeCartItem(id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.18;
  const shippingCharges = subtotal > 1000 ? 0 : 100;
  const total = subtotal + tax + shippingCharges;

  const checkOutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <Fragment>
      {cartItems.length > 0 ? (
        <div className="container-fluid">
          <div className="cart-main-container m-3 d-flex py-4">
            <div className="cart-items w-75">
              {cartItems &&
                cartItems.map((item) => (
                  <div className="cartItems d-flex product-details-block-2">
                    <img src={item.image} alt="ProductImage" />
                    <div onClick={() => removeHandler(item.product)}>
                      {" "}
                      <Delete className="cart-remove-btn" />{" "}
                    </div>
                    <p>{item.name}</p>
                    <p className="text-success">
                      Pkr. {item.price * item.quantity}
                    </p>
                    <div className="div-quantity">
                      <button
                        onClick={() =>
                          decreaseQuantity(
                            item.product,
                            item.stock,
                            item.quantity
                          )
                        }
                        className="quantity-btn"
                      >
                        -
                      </button>
                      <input type="number" readOnly value={item.quantity > 0 ? item.quantity : 0} />
                      <button
                        onClick={() =>
                          increaseQuantity(
                            item.product,
                            item.stock,
                            item.quantity
                          )
                        }
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            <div className="check-out h-25 mt-3 mx-4 ml-5 w-50">
              <div className="check-out-title">
                <h6>Order Summery</h6>
                <div className="  subtotal d-flex justify-content-between">
                  <p className="">
                    Subtotal: ({cartItems && cartItems.length} Item)
                  </p>
                  <p>Price. {subtotal}</p>
                </div>
                <div className="shipping d-flex justify-content-between">
                  <p>Shipping Charges</p>
                  <p> {shippingCharges}</p>
                </div>

                <div className="tax d-flex justify-content-between">
                  <p>Tax</p>
                  <p>{tax}</p>
                </div>
                <div className="gross-total d-flex justify-content-between">
                  <p>Total Amount</p>
                  <p>{total}</p>
                </div>
                <div className="checkout-btn-container w-100 d-flex justify-content-center">
                  <button onClick={checkOutHandler} className="checkout-btn">
                    Check Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mt-5 text-center vh-75 d-flex justify-content-center align-items-center">
          {" "}
          <div className="border border-1 p-4">
          <h2>No Items In cart</h2>
          <button className="btn btn-dark mt-3" onClick={()=> navigate('/')}>Go to Products</button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Cart;
