import React, { Fragment, useState } from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
// import SpeedDial from '@mui/material/SpeedDial'
import { Backdrop } from "@mui/material";
import Profile from "./Profile.png";
import {
  MdDashboard,
  MdHome,
  MdLogout,
 
  MdShoppingCart,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { server } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { authReducer, removeUserInfo } from "../../redux/userSlice/userSlice";
import axios from "axios";
const UserOptions = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    axios.get(`${server}/logout`, { withCredentials: true }).then((res) => {
      // localStorage.removeItem('user')
      dispatch(removeUserInfo());
      dispatch(authReducer(false))
      navigate("/");
    });
  };
  return (
    <Fragment>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="speedDail basic example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        className="speedDial"
        style={{ zIndex: 9 }}
        icon={
          <img
            style={{ width: "100%" }}
            src={user && user.image ? user.image.url : Profile}
            alt="Profile"
          />
        }
      >

        {user && user.role === 'admin' &&(
                  <SpeedDialAction
                  key={"khan"}
                  icon={<MdDashboard />}
                  tooltipTitle={"Dashboard"}
                  onClick={() => navigate("/admin/dashboard")}
                />
        )}

        <SpeedDialAction
          key={"home"}
          icon={<MdHome />}
          tooltipTitle={"Home"}
          onClick={() => navigate("/")}
        />

        <SpeedDialAction
          key={"cart"}
          icon={<MdShoppingCart />}
          tooltipTitle={cartItems && cartItems.length > 0 ? `Cart (${cartItems.length})` : 'Cart'}
          onClick={()=> navigate('/cart')}
        />

        <SpeedDialAction
          key={"logout"}
          icon={<MdLogout />}
          tooltipTitle={"Logout"}
          onClick={logoutHandler}
        />
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
