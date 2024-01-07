import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./dashboard.css";
import Chart, { CategoryScale } from "chart.js/auto";
import { Doughnut, Line } from "react-chartjs-2";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux'
import { server } from "../../redux/store";
import { addAdminOrders, addAdminProducts } from "../../redux/productSlice/productSlice";

Chart.register(CategoryScale);
const Dashboard = () => {
  const dispatch=useDispatch()
  const [totalProducts, setTotalProducts]=useState(0)
  const [totalOrder, setTotalOrder]=useState(0)
  const [totalUser, setTotalUser]=useState(0)
  const {adminOrders}=useSelector(state=> state.product)
  const {adminProducts}=useSelector(state=> state.product)

  const totalAmountEarned= adminOrders && adminOrders.reduce(
    (acc,order)=> acc + order.totalPrice , 0
  
  )
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: "tomato",
        hoverBackgroundColor: "rgb(197,72,49)",
        data: [0, totalAmountEarned],
      },
    ],
  };


  let outOfStock=0
  adminProducts && adminProducts.forEach(product => {
    if(product.stock === 0){
      outOfStock += 1
    }
  });

  let inStock=0
  adminProducts && adminProducts.forEach(product=>{
    if(product.stock > 0){
      inStock += 1
    }
  })
 
  useEffect(()=>{
    axios.get(`${server}/admin/products`,{withCredentials:true})
    .then((res)=>{
     setTotalProducts(res.data.totalCount)
     dispatch(addAdminProducts(res.data.products))
    })
  },[dispatch])
  useEffect(()=>{
    axios.get(`${server}/admin/users`,{withCredentials:true})
    .then((res)=>{
     setTotalUser(res.data.userCount)
    })
  },[])

  useEffect(()=>{
    axios.get(`${server}/admin/orders`,{withCredentials:true})
    .then((res)=>{
     setTotalOrder(res.data.orderCount)
     dispatch(addAdminOrders(res.data.orders))
    })
  },[dispatch])

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        // label:'Stock',
        backgroundColor: ["#00AB23", "#6B00B4"],
        hoverBackgroundColor: ["#4B45000", "#35014F"],
        data:[outOfStock, inStock]
      },
    ],
  };
  return (
    <div className="container-fluid dashboard-main-container d-flex">
      <div className="dashboard-sidebar ">
        <Sidebar />
      </div>
      <div className="dashboard w-75">
        <h3>Dashboard</h3>

        <div className="total-amount-container ">
          {" "}
          <h5>Total Amount : {Math.floor(totalAmountEarned)}</h5>
        </div>

        <div className="info-circels w-100">
          <div className="product-box">
            {" "}
            <h5> {totalProducts} Products</h5>
          </div>
          <div className="user-box">
            {" "}
            <h5> {totalUser} Users</h5>{" "}
          </div>
          <div className="order-box">
            {" "}
            <h5>{totalOrder} Orders</h5>{" "}
          </div>
        </div>

        <div className="line-chart text-center">
          <Line data={lineState} />
          <i className="w-100">Amount Details</i>

        </div>
        <div className="doughnutChart text-center">
            <Doughnut data={doughnutState} />
            <i className="">Stock Details</i>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
