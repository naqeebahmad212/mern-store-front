import axios from "axios";
import { Button } from "bootstrap";
import React, { Fragment, useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { server } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addAdminProducts, deleteAdminProduct } from "../../redux/productSlice/productSlice";
import { toast } from "react-toastify";
import Sidebar from "../../components/sidebar/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import './adminProducts.css'

const AdminProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${server}/admin/products`, { withCredentials: true })
      .then((res) => {
        dispatch(addAdminProducts(res.data.products));
      })
      .catch((err) => {
        toast.error(err.message);
      });
  },[dispatch]);

  const { adminProducts } = useSelector((state) => state.product);

  const deleteProductHandler = (id) => {
    dispatch(deleteAdminProduct(id))
    axios.delete(`${server}/admin/product/${id}`,{withCredentials:true})
    .then((res)=>{
      console.log(res)
      toast.success(res.data.message)
    })
    .catch((err)=>{
      toast.error(err.message)

    })
  };

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 250,
      flex: 1,
    },
    {
      field: "by",
      headerName: "By",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
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
            <Link to={`/admin/product/edit/${params.row.id}`}>
              <MdEdit />
            </Link>

            <button onClick={() => deleteProductHandler(params.row.id)}>
              <MdDelete />
            </button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];
  // adminProducts &&
  if (adminProducts) {
    adminProducts.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
        by:item.user.name
      });
    });
  }

  return (
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
  );
};

export default AdminProducts;
