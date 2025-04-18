import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";
import Product_card from "./Product_card";
import "react-loading-skeleton/dist/skeleton.css";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}api/products`
      );
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
        console.log(response);
      }
      return () => {
        componentMounted = false;
      };
    };
    getProducts();
  }, []);
  // console.log(data);

  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };

  const filterProduct = (res) => {
    const updatedList = data.filter((x) => x.category === res);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    const [filter, setFilter] = useState(data);
    const [activeFilter, setActiveFilter] = useState("All");

    const handleFilter = (category) => {
      setActiveFilter(category);
      if (category === "All") {
        setFilter(data);
      } else {
        const filtered = data.filter(
          (product) => product.category === category
        );
        setFilter(filtered);
      }
    };
    return (
      <>
        <div className="top-tabs d-flex justify-content-center pb-4 mb-4">
          {[
            "All",
            "men's clothing",
            "women's clothing",
            "jewelery",
            "electronics",
          ].map((category) => (
            <button
              key={category}
              className={`me-2 tab-btn ${
                activeFilter === category ? "active" : "css"
              }`}
              onClick={() => handleFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        {filter.map((products) => {
          return (
            <div key={products._id} className="col-md-3 mb-4 col-lg-3 col-sm-6">
              <div className="card h-100 text-center py-4">
                <img
                  src={products.image}
                  className="card-img-top"
                  alt={products.title}
                />
                <div className="card-body">
                  <h5 className="card-title mb-0">
                    {products.title.substring(0, 12)}...
                  </h5>
                  <p className="card-text">${products.price}</p>
                  <NavLink
                    to={`/products/${products._id}`}
                    className="btn btn-light"
                  >
                    Buy Now
                  </NavLink>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <div className="container my-3 py-3" id="products">
        <div className="row">
          <div className="col-12 mb-4">
            <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
};
export default Products;
