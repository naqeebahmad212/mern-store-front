import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Hamburger from "hamburger-react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import {
  Add,
  Dashboard,
  ExpandMore,
  ImportExport,
  ListAlt,
  People,
  PostAdd,
  RateReview,
} from "@mui/icons-material";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

function Sidebar() {
  return (
    <>
      <div className="sidebar ">
        <div className="dashboard-links">

          <div className="brand-link admin-penal">
            
              <h5>Admin Penal</h5>
           
          </div>

          <div className="brand-link my-5">
            <Link to={"/"}>
              <h3>Eccommerce Store</h3>
            </Link>
          </div>

          <Link to={"/admin/dashboard"}>
            <p className="m-0">
              <Dashboard />
              Dashboard
            </p>
          </Link>

          <Link to={"/admin/products"}>
            <div className="treeview">
              <TreeView
                defaultCollapseIcon={<ExpandMore />}
                defaultExpandIcon={<ImportExport />}
              >
                <TreeItem nodeId="1" label="Products">
                  <Link to="/admin/products">
                    <TreeItem nodeId="2" label="All" icon={<PostAdd />} />
                  </Link>

                  <Link to="/admin/product/new">
                    <TreeItem nodeId="3" label="Create" icon={<Add />} />
                  </Link>
                </TreeItem>
              </TreeView>
            </div>
          </Link>

          <Link to={"/admin/orders"}>
            <p>
              <ListAlt />
              Orders
            </p>
          </Link>

          <Link to={"/admin/users"}>
            <p>
              <People />
              Users
            </p>
          </Link>

          <Link to={"/admin/reviews"}>
            <p>
              <RateReview />
              Reviews
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
