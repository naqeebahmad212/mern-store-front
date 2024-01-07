import { Fragment, useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";
import "./payment.css";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { MdCreditCard, MdEvent, MdVpnKey } from "react-icons/md";
import CheckoutSteps from "../../components/cheOutStepts";
import { loadStripe, StripeElements } from "@stripe/stripe-js";
import Stripe from "stripe";
import { setLoading } from "../../redux/userSlice/userSlice";
import { clearCartItems } from "../../redux/productSlice/productSlice";
import { server } from "../../redux/store";
// import Stripe from "stripe";

const Payment = () => {
  const { isLoading } = useSelector((state) => state.user);
  const { shippingInformation, cartItems } = useSelector(
    (state) => state.product
  );

  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const stripe = useStripe();
  const elements = useElements();

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const payBtn = useRef(null);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo: shippingInformation,
    orderItem: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    totalPrice: orderInfo.totalPrice,
    shippingPrice: orderInfo.shippingCharges,
  };

  // creating order

  const placeOrder = () => {
    axios
      .post(`${server}/new/order`, order, {
        withCredentials: true,
      })
      .then((res) => {
        sessionStorage.setItem('orderCofirmed','this stored for order')
        toast.success(res.data.message)
        dispatch(clearCartItems())
        navigate("/success");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // payBtn.current.disabled=true
    try {
      dispatch(setLoading(true));
      const { data } = await axios.post(
        `${server}/payment/procces`,
        paymentData,
        {
          withCredentials: true,
        }
      );

      const client_secret = data.client_secret;
      if (!stripe || !elements) {
        return;
      }
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInformation.address,
              city: shippingInformation.city,
              state: shippingInformation.state,
              postal_code: shippingInformation.pinCode,
              country: shippingInformation.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result.error.message);
        dispatch(setLoading(false));
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          placeOrder();
        } else {
          toast.error("There seems to be some issue");
        }
        dispatch(setLoading(false));
      }
    } catch (err) {
      payBtn.current.disabled = false;
      toast.error(err.response.data.message);
      dispatch(setLoading(false));
    }
  };

  return (
    <Fragment>
      {/* <MetaData title={"Payment"} /> */}
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={submitHandler}>
          <Typography>Card Info</Typography>
          <div>
            <MdCreditCard />
            <CardNumberElement className="paymentInput" />
          </div>

          <div>
            <MdEvent />
            <CardExpiryElement className="paymentInput" />
          </div>

          <div>
            <MdVpnKey />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={
              isLoading
                ? "Processing..."
                : ` Pay - Pkr ${orderInfo && orderInfo.totalPrice}`
            }
            ref={payBtn}
            className="paymentFormBtn"
            name=""
            id=""
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;

// stripe
//   .confirmCardPayment('{PAYMENT_INTENT_CLIENT_SECRET}', {
//     payment_method: {
//       card: cardElement,
//       billing_details: {
//         name: 'Jenny Rosen',
//       },
//     },
//   })
//   .then(function(result) {
//     // Handle result.error or result.paymentIntent
//   });
