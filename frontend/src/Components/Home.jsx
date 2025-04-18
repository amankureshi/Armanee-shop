import React from "react";
import Products from "./Products";
const Home = () => {
  return (
    <>
      <div className="hero-section" id="home">
        <div className="bg-dark text-white bg-image">
          <img
            src="https://img.freepik.com/premium-photo/cute-girl-posing-shopping-mall_355000-3755.jpg?w=826"
            className="hero-image"
            alt="..."
          />
          <div className="card-img-overlay d-flex flex-column justify-content-center container">
            <div className="container card-manage">
              <h2 className="card-title display-3 fw-bolder mb-0">
                E-commerce
              </h2>
              <p className="card-text">
                Welcome to Armaneee, your one-stop shop for quality and value.
                Discover our curated collections and take advantage of
                limited-time offers. Shop now and experience convenience like
                never before!.
              </p>
              <p className="card-text">
                Unlock exceptional value and discover top-rated products with
                ease.
              </p>
            </div>
          </div>
        </div>
        <Products />
      </div>
    </>
  );
};

export default Home;
