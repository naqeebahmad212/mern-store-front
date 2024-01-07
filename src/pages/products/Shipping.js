import React, { Fragment, useEffect, useState } from "react";
import "../user/singUp.css";
import { MdLock, MdLockOpen, MdMailOutline } from "react-icons/md";
import { Country, State } from "country-state-city";

import axios from "axios";
import { server } from "../../redux/store";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  authenticate,
  setLoading,
  setUserInfo,
} from "../../redux/userSlice/userSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Call, Home, LocationCity, PinDrop, Public, TransferWithinAStation } from "@mui/icons-material";
import "./shipping.css";
import { setShippingInfo } from "../../redux/productSlice/productSlice";
import CheckoutSteps from "../../components/cheOutStepts";

const Shipping = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const dispatch = useDispatch();
  const {shippingInformation}=useSelector(state=> state.product)
console.log(shippingInformation)
  const [address, setAddress] = useState(shippingInformation.address);
  const [city, setCity] = useState(shippingInformation.city);
  const [pinCode, setPinCode] = useState(shippingInformation.pinCode);
  const [country, setCountry] = useState(shippingInformation.country);
  const [state, setState] = useState(shippingInformation.state);
  const [phoneNum, setPhoneNum] = useState(shippingInformation.phoneNo);

  //   axios.get(`${server}/frgot/password`,)

  const submitHandler = (e) => {
 
    const shippingInfo={
        address,city,state,pinCode,country,phoneNo:phoneNum
    }
    dispatch(setShippingInfo(shippingInfo))

    navigate('/confirm/order')
  };

  return (
    <Fragment>
        <CheckoutSteps activeStep={0} />
      <div className="signup-form vh-100 w-100 d-flex justify-content-center mt-5 shipping-container">
        <div className="signdiv" >
          <h5 className="text-center">Shipping Info</h5>

          <div className="signup-box">
            <Home />
            <label className="form-label" htmlFor="Address">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              name=""
              id=""
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="signup-box">
            <LocationCity />
            <label className="form-label" htmlFor="City">
              City
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="City"
              name=""
              id=""
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="signup-box">
            <PinDrop />
            <label className="form-label" htmlFor="pinCode">
              pin Code
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="pin Code"
              name=""
              id=""
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
          </div>

          <div className="signup-box">
            <Call />
            <label className="form-label" htmlFor="PhoneNumber">
              Phone Number
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Phone Number"
              name=""
              id=""
              value={phoneNum}
              onChange={(e) => setPhoneNum(e.target.value)}
            />
          </div>

          <div className="signup-box">
            <Public />
            <label className="form-label" htmlFor="Country">
              Countery
            </label>
            <select
              type="number"
              className="form-control py-2"
              name=""
              id=""
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Select Country</option>

              {Country &&
                Country.getAllCountries().map((item) => (
                  <option value={item.isoCode} key={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>

          {country && (
            <div className="signup-box py-2">
              <TransferWithinAStation />
              <label className="form-label" htmlFor="State">
                State
              </label>
              <select
                type="number"
                className="form-control py-2"
                name=""
                id=""
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">Select State</option>

                {State &&
                  State.getStatesOfCountry(country).map((item) => (
                    <option value={item.isoCode} key={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          )}

          <button onClick={submitHandler} className="btn btn-primary mt-3" type="submit">
            Next
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
