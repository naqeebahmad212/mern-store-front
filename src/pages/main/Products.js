import React, { Fragment, useEffect, useState } from "react";
import "./Home.css";
import "./product.css";
import { MdFrontHand, MdMouse } from "react-icons/md";
import ProductCard from "../../components/cards/productCard";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/productSlice/productSlice";
import { toast } from "react-toastify";
import { Pagination, Slider, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";

const Products = () => {
  const dispatch = useDispatch();
  const [productPerPage, setProductPerPage] = useState();
  const [totalProducts, setTotalProducts] = useState();
  const [page, setPage] = useState(1);
  const requiredPage = Math.ceil(totalProducts / productPerPage);
  const [price, setPrice] = useState([0, 25000]);
  const [ratings, setRatings] = useState(0);

  const [category, setCategory] = useState();
  let { keyword } = useParams();

  const { searchTerms } = useSelector((state) => state.product);
  if (searchTerms !== "" && searchTerms === undefined) {
    keyword = searchTerms;
  }
  let link = keyword
    ? `${server}/products?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
    : `${server}/products?page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

  if (category) {
    link = keyword
      ? `${server}/products?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`
      : `${server}/products?page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
  }
  useEffect(() => {
    axios
      .get(link)
      .then((res) => {
        dispatch(addProduct(res.data.products));
        setProductPerPage(res.data.perPage);
        setTotalProducts(res.data.totalCount);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [dispatch, page, link]);

  const { products } = useSelector((state) => state.product);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };
  const ratingHandler = (e, newRating) => {
    setRatings(newRating);
  };

  const pageHandler = (e, p) => {
    setPage(p);
  };

  return (
    <Fragment>
      <div className="container-fuild">
        <div className="product-main-container">
          <div className="product-query">
            <div className="priceFilter w-100">
              <Typography>Price Filter</Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={25000}
              />
            </div>
            <div className="priceFilter w-100">
              <Typography>Rating Filter</Typography>
              <Slider
                value={ratings}
                onChange={ratingHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={5}
              />
            </div>
            <div className="categoryFilter">
              <Typography>Categories</Typography>
              <ul className="categoryBox">
                {categories.map((category) => (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="products-slider">
            <Carousel className=" ">
              <img
                src="https://icms-image.slatic.net/images/ims-web/b655aa4c-169a-4717-bb1d-6d94894cf282.jpg"
                alt=""
              />
              <img
                src="https://icms-image.slatic.net/images/ims-web/cb90f677-bd92-444a-bf31-258779705293.jpg"
                alt=""
              />
              <img
                src="https://icms-image.slatic.net/images/ims-web/a00baeab-18e6-4f8a-bffb-2f169925a84a.jpg"
                alt=""
              />
            </Carousel>
          </div>
        </div>

        <div className="container">
          <div className="product-title">
            <h3 className="text-center mt-4">Feature Products</h3>{" "}
            <hr className="w-50" />
          </div>
          <div
            id="product-container"
            className="product-container d-flex flex-wrap mt-5 justify-content-center"
          >
            {products &&
              products.map((product) => (
                <Link
                  to={`/product/${product._id}`}
                  key={product._id}
                  className="text-dark"
                >
                  <ProductCard product={product} />
                </Link>
              ))}

            <div className="w-100 d-flex justify-content-center mt-3">
              {page <= requiredPage && (
                <Pagination
                  count={requiredPage}
                  onChange={pageHandler}
                  page={page}
                />
              )}
            </div>
          </div>
        </div>

        <div className="w-100 vh-100"></div>
      </div>
    </Fragment>
  );
};

export default Products;
