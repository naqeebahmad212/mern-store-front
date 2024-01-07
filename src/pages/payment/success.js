import { CheckCircle } from "@mui/icons-material";
import React from "react";
import "./success.css";
import { useNavigate } from "react-router-dom";

const Success = () => {
    
    const navigate=useNavigate()

   const isOrderedSomething= sessionStorage.getItem('orderCofirmed') 

   if(!isOrderedSomething){
    navigate('/me/orders')
   }

  return (
    <div className="container success-container">
      <div className="suuccess-box">
        <div className="success-icon text-center ">
          {" "}
          <CheckCircle />{" "}
        </div>
        <h5 className="text-center my-3">
          Your Order Has Been Placed Successfully
        </h5>
        <div className="d-flex justify-content-center">
          {" "}
          <button onClick={()=> navigate('/me/orders')} className="btn view-order-btn ">View Orders</button>
        </div>
      </div>
    </div>
  );
};

export default Success;
