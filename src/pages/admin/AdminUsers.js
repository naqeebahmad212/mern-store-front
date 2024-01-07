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
  addAdminOrders
} from "../../redux/productSlice/productSlice";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { addAdminUser, deleteAdminUsers, setLoading } from "../../redux/userSlice/userSlice";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    axios
      .get(`${server}/admin/users`, { withCredentials: true })
      .then((res) => {
        dispatch(addAdminUser(res.data.users));
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, [dispatch]);

  const { adminUsers} = useSelector((state) => state.user);

  const deleteUserHandler = (id) => {
    dispatch(deleteAdminUsers(id));
    axios
      .delete(`${server}/admin/user/${id}`,{withCredentials:true})
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 250, flex: 0.5 },

    {
      field: "name",
      headerName: "User Name",
      minWidth: 250,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 250,
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.row.role === "admin" ? "green" : "red";
      },
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
              onClick={() => toggelHandler(params.row.id)}
            >
              <MdEdit />
            </button>

            <button onClick={() => deleteUserHandler(params.row.id)}>
              <MdDelete />
            </button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];
  adminUsers &&
    adminUsers.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        role: item.role,
        email: item.email,
      });
    });

  const cancelHandler = () => {
    setOpen(false);
  };

  const toggelHandler = (id) => {
    open ? setOpen(false) : setOpen(true);
    setUserId(id);
  };
  const submitHandler = () => {
    dispatch(setLoading(true));
    axios
      .put(
        `${server}/admin/user/${userId}`,
        { role: userRole },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(addAdminUser(res.data.users));
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
          <h1 className="text-center my-3">All User</h1>
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
        <DialogTitle>Change User Role</DialogTitle>
        <DialogContent className="submitDialog">
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            name=""
            id=""
            className="order-status-box"
          >
            <option value="">Change Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </DialogContent>
        <DialogActions>
          <button onClick={cancelHandler} className="btn btn-secondary">
            Cancel
          </button>
          <button className="btn btn-primary" onClick={submitHandler}>
            Update
          </button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default AdminUsers;
