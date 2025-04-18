import React from "react";

const About = () => {
  return (
    <div className="container my-4">
      <div className="row d-flex  flex-row-">
        <div className="col-md-6">
          <img
            src="https://shorturl.at/AGOZc"
            className="about-image"
            alt="about-image"
          />
        </div>
        <div className="col-md-6 d-flex flex-column  justify-content-center">
          <h2>Welcome to my shop!</h2>
          <p>
            At TrendHub, we specialize in offering stylish clothing for women
            and men, cutting-edge electronic items, and a variety of
            accessories. Our collections are carefully selected to provide
            high-quality and trendy options for every customer. Whether you're
            updating your wardrobe or looking for the latest gadgets, we have
            something for everyone. Thank you for choosing TrendHub as your
            favorite online shopping destination!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
