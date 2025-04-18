import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

const Product_card = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch(); // Get the dispatch function

  const addProduct = (product) => {
    dispatch(addCart(product)); // Dispatch the Redux action
  };

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to add items to your cart");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}api/cart/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ Ensure correct token format
          },
          body: JSON.stringify({ productId }),
        }
      );

      const data = await response.json();
      console.log("Cart response:", data);

      if (response.ok) {
        alert("Item added to cart!");
      } else {
        alert(data.message || "Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding item to cart");
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}api/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const Loading = () => (
    <>
      <div className="col-md-6">
        <Skeleton height={400} />
      </div>
      <div className="col-md-6" style={{ lineHeight: 2 }}>
        <Skeleton height={50} width={300} />
        <Skeleton height={70} />
        <Skeleton height={25} width={150} />
        <Skeleton height={150} />
        <div className="d-flex gap-2">
          <Skeleton height={50} width={100} />
        </div>
      </div>
    </>
  );

  const ShowProduct = () => (
    <>
      <div className="row">
        <div className="col-md-6">
          <img
            className="product-image"
            src={product.image}
            alt={product.title}
          />
        </div>
        <div className="col-md-6 col-sm-12 col-lg-6">
          <h4 className="text-uppercase text-black-50">{product.category}</h4>
          <h1 className="display-5">{product.title}</h1>
          <p className="lead">
            Rating {product.rating && product.rating.rate}
            <i className="fa fa-star"></i>
          </p>
          <h3 className="display-6 fw-bold my-4">${product.price}</h3>
          <p className="lead description-lead">{product.description}</p>
          <div className="add_card_btn d-flex gap-3">
            
            <button
              className="btn btn-outline-dark text-white px-4 py-2 product-btn"
              onClick={() => handleAddToCart(product._id)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div>
      <div className="container py-5">
        <div className="row py-5">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
    </div>
  );
};

export default Product_card;
