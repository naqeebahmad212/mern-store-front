import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./header.css";

import UserOptions from "./userOption";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  addProduct,
  setSearchTerms,
} from "../../redux/productSlice/productSlice";
import { TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

function Header() {
  // const { searchTerms } = useSelector((state) => state.product);
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const searchHandler = (e) => {
    navigate('/search')  
  };

  return (
    <Navbar expand="lg" className="bg-dark w-100 navBar  text-white">
      <Container>
        <Link to={"/"}>
          <Navbar.Brand className="text-light">Ecommerce Shop</Navbar.Brand>
        </Link>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="toggler-btn"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!isAuthenticated && (
              <Nav.Link>
                {" "}
                <Link to={"/login"}>LogIn </Link>
              </Nav.Link>
            )}

            {!isAuthenticated && (
              <Nav.Link>
                {" "}
                <Link to={"/register"}>Register</Link>
              </Nav.Link>
            )}
            <Nav.Link>
              {" "}
              <Link to={"/products"}>Products</Link>
            </Nav.Link>
            {/* <NavDropdown title="Blogs" id="basic-nav-dropdown">
              <NavDropdown.Item >Best Products</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <div className="searchForm">
            <button className="btn text-light" onClick={searchHandler}> <Search /></button>
          
          </div>
        </Navbar.Collapse>
        {isAuthenticated && <UserOptions />}
      </Container>
    </Navbar>
  );
}

export default Header;
