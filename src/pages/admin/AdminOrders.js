import axios from "axios";
import { Button } from "bootstrap";
import React, { Fragment, useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { server } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Sidebar from "../../components/sidebar/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import "./adminProducts.css";
import {
  addAdminOrders,
  deleteAdminOrders,
} from "../../redux/productSlice/productSlice";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { setLoading } from "../../redux/userSlice/userSlice";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  useEffect(() => {
    axios
      .get(`${server}/admin/orders`, { withCredentials: true })
      .then((res) => {
        dispatch(addAdminOrders(res.data.orders));
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [dispatch]);

  const { adminOrders } = useSelector((state) => state.product);

  const deleteProductHandler = (id) => {
    dispatch(deleteAdminOrders(id));
    axios
      .delete(`${server}/admin/order/${id}`)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 250, flex: 0.5 },

    {
      field: "productName",
      headerName: "Product Name",
      minWidth: 250,
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      minWidth: 250,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "green" : "red";
      },
    },

    {
      field: "price",
      headerName: "Total Price",
      type: "number",
      minWidth: 170,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <button
              disabled={params.row.status === "Delivered" ? true : false}
              onClick={() => toggelHandler(params.row.id)}
            >
              <MdEdit />
            </button>

            <button onClick={() => deleteProductHandler(params.row.id)}>
              <MdDelete />
            </button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];
  adminOrders &&
    adminOrders.forEach((item) => {
      rows.push({
        id: item._id,
        productName: item.orderItem[0].name,
        status: item.orderStatus,
        price: item.itemsPrice,
        address: `${item.shippingInfo.address}, ${item.shippingInfo.city}, ${item.shippingInfo.state}`,
      });
    });

  const cancelHandler = () => {
    setOpen(false);
  };

  const toggelHandler = (id) => {
    open ? setOpen(false) : setOpen(true);
    setOrderId(id);
  };
  const submitHandler = () => {
    dispatch(setLoading(true));
    axios
      .put(
        `${server}/admin/order/${orderId}`,
        { status: orderStatus },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(addAdminOrders(res.data.orders));
        toast.success(res.data.message);
        dispatch(setLoading(false));
        setOpen(false);
      })
      .catch((err) => {
        toast.error(err.message);
        dispatch(setLoading(false));
        setOpen(false);
      });
  };

  return (
    <Fragment>
      <div className="container-fluid dashboard-main-container d-flex">
        <div className="dashboard-sidebar vh-100 ">
          <Sidebar />
        </div>
        <div className="all-products-admin text-center ">
          <h1 className="text-center my-3">All Products</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>

      <Dialog aria-label="simple-dialog-title" open={open}>
        <DialogTitle>Change Order Status</DialogTitle>
        <DialogContent className="submitDialog">
          <select
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            name=""
            id=""
            className="order-status-box"
          >
            <option value="">Change Status</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </DialogContent>
        <DialogActions>
          <button onClick={cancelHandler} className="btn btn-secondary">
            Cancel
          </button>
          <button className="btn btn-primary" onClick={submitHandler}>
            Submit
          </button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default AdminOrders;
