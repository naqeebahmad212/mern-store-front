import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "./redux/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingUp from "./pages/user/singUp";
import "./bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserLogin from "./pages/user/login";
import Header from "./components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./components/loader";
import Profile from "./pages/user/profile";
import ProtectedRoutes from "./components/ProtectedRoutes";
import EditUser from "./pages/user/EditUser";
import UpdatePass from "./pages/user/updatePass";
import ForgotPassword from "./pages/user/forgotPassword";
import ResetPassword from "./pages/user/resetPassword";
import Home from "./pages/main/Home";
import { authReducer, removeUserInfo } from "./redux/userSlice/userSlice";
import CreateProducts from "./pages/products/createProducts";
import ProductDetails from "./pages/products/productDetails";
import Cart from "./pages/products/Cart";
import Shipping from "./pages/products/Shipping";
import ConfirmOrder from "./pages/products/confirmOrder";
import Payment from "./pages/payment/ProcessPayment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Success from "./pages/payment/success";
import Dashboard from "./pages/admin/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import UpdateProduct from "./pages/admin/UpdateProduct";
import AdminUsers from "./pages/admin/AdminUsers";
import Products from "./pages/main/Products";
import Search from "./pages/search";
import Category from "./pages/categoryPage/Category";
// import { ConfirmOrder } from "./pages/products/confirmOrder";

function App() {
  const { isLoading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const [stripeApiKey, setStripeApiKey] = useState();
  const key =
    "pk_test_51OMPm9DNqlqfLOXGoGha2k7F8TmuERiX8Nb4ahYihUZgLx6ul80FSNpF0ejjOoRBlvlacaiIc2xkhGegj6KOYGqS00FTZJ8SwB";

  useEffect(() => {
    axios
      .get(`${server}/me`, { withCredentials: true })
      .then((res) => {
        dispatch(authReducer(true));
      })
      .catch((err) => {
        if (err) {
          dispatch(authReducer(false));
        }
      });
  }, [dispatch]);

  useEffect(() => {
    axios
      .get(`${server}/stripeapikey`, {
        withCredentials: true,
      })
      .then((res) => {
        setStripeApiKey(res.data.stripe_api_key);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setStripeApiKey]);

  return (
    <Router>
      <ToastContainer />
      {isLoading === true && <Loader />}
      <Header />
      <Routes>
        <Route path="/register" element={<SingUp />} />
        <Route path="/login" element={<UserLogin />} />

        {/* login user routes */}
        <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/user/:id" element={<EditUser />} />
          <Route path="/update/password" element={<UpdatePass />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/confirm/order" element={<ConfirmOrder />} />
          <Route
            path="/process/payment"
            element={
              stripeApiKey && (
                <Elements stripe={loadStripe(key)}>
                  <Payment />
                </Elements>
              )
            }
          />
          <Route path="/success" element={<Success />} />
          <Route path="/cart" element={<Cart />} />
        </Route>

        {/* not login user */}
        <Route path="/forgot/password" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="category/:category" element={<Category />} />

        {/* admin routes */}
        <Route
          element={
            <ProtectedRoutes
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user && user.role === "admin" ? true : false}
            />
          }
        >
          <Route path="admin/product/new" element={<CreateProducts />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/product/edit/:id" element={<UpdateProduct />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
