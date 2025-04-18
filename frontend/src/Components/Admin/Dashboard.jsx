import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { delItem } from "../../redux/action";
const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  // ✅ Remove item from db
  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}api/products/${productId}`,
        {
          method: "DELETE", // ✅ Use POST instead of DELETE
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ productId }), // ✅ Send productId in body
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // ✅ Update UI after removal
      dispatch(delItem(productId)); // ✅ Update Redux store
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}api/products`
        );
        const data = await response.json();
        if (response.ok) {
          setProducts(data);
        } else {
          setErrorMessage(data.message || "Failed to fetch products.");
        }
      } catch (error) {
        setErrorMessage("Error fetching products. Please try again.");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center">Dashboard</h2>
      <p className="text-center">Welcome to the admin panel.</p>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
          <p className="text-red-700 font-medium text-center">{errorMessage}</p>
        </div>
      )}

      <div className="container my-5 table-responsive">
        <h2 className="mb-4">All Products</h2>
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Stock</th>
              <th scope="col">Rating</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-dark h4">
                  No Products Available
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr key={product._id}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <img
                      src={product.image}
                      className="cart_image"
                      alt="Product"
                      style={{ width: "50px", height: "50px" }}
                    />
                    {product.title}
                  </td>
                  <td className="text-dark">${product.price}</td>
                  <td className="text-dark">{product.category}</td>
                  <td className="text-dark">{product.stock}</td>
                  <td className="text-dark">
                    {product.rating.rate} ({product.rating.count} reviews)
                  </td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => handleRemoveFromCart(product._id)}
                    >
                      <i className="fa-solid fa-trash text-danger fs-4"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
