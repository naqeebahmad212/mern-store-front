import axios from "axios";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addProduct } from "../../redux/productSlice/productSlice";
import ProductCard from "../../components/cards/productCard";
import { server } from "../../redux/store";

const Category = () => {
  const category = useParams();
  const dispatch = useDispatch();

  let link = `${server}/products?&category=${category.category}`;

  useEffect(() => {
    axios.get(link).then((res) => {
      dispatch(addProduct(res.data.products));
    });
  });
  const { products } = useSelector((state) => state.product);

  return (
    <Fragment>
      {products.length > 0 ? (
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
          </div>
        </div>
      ) : (
        <div className="w-100 vh-100 d-flex align-items-center justify-content-center">
          <h3 className="text-dark">No Products in This category</h3>
        </div>
      )}
    </Fragment>
  );
};

export default Category;
