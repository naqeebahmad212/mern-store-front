import { Fragment } from "react";
import { useSelector } from "react-redux";
// import MetaData from "../../components/layouts/MetaData";
// import CheckoutSteps from "./CheckoutSteps";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./ConfirmOrder.css";
import CheckoutSteps from "../../components/cheOutStepts";

const ConfirmOrder = () => {

    const { shippingInformation, cartItems }=useSelector((state)=>state.product)
    const { user }=useSelector((state)=> state.user)
    const navigate=useNavigate()

    const address=`${shippingInformation.address}, ${shippingInformation.city},${shippingInformation.state} ,
    ${shippingInformation.pinCode},${shippingInformation.country}.`
    const subtotal=cartItems.reduce((acc,item)=> acc+ item.price * item.quantity,0 )
    const shippingCharges= subtotal > 1000 ? 0 : 200
    const tax=subtotal * 0.18
    const totalPrice= subtotal + shippingCharges +  tax


    const proceedToPayment=()=>{
        const data={
            subtotal,
            shippingCharges,
            tax,
            totalPrice
        };
        sessionStorage.setItem('orderInfo',JSON.stringify(data))
        navigate('/process/payment')
    }
    

    return ( 
        <Fragment>
            {/* <MetaData title={ 'Confirm Order'}/> */}
            <CheckoutSteps activeStep={1}/>

            <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <p>{ user && user.name}</p>
              </div>
              <div>
                <p>Phone:</p>
                <p>{shippingInformation.phoneNum}</p>
              </div>
              <div>
                <p>Address:</p>
                <p>{address}</p>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link className="text-dark" to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X Pkr.{item.price} ={" "}
                      <b>Pkr. {item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>Pkr. {subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>Pkr. {shippingCharges}</span>
              </div>
              <div>
                <p>Tax</p>
                <span>Pkr. {tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>Pkr. {totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
        </Fragment>
     );
}
 
export default ConfirmOrder;