import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { delItem } from "../redux/action";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();

  // ✅ Fetch cart items from backend
  const fetchCart = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}api/cart/items`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ Send JWT token
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCart(data.cart || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // ✅ Remove item from cart
  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}api/cart/remove`,
        {
          method: "POST", // ✅ Use POST instead of DELETE
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
      setCart(cart.filter((item) => item.productId._id !== productId));
      dispatch(delItem(productId)); // ✅ Update Redux store
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // ✅ Fetch cart data on page load
  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="container my-5 table-responsive">
      <h2 className="mb-4">Your Cart</h2>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th scope="col">No</th>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center text-dark h4">
                Your Cart is Empty
              </td>
            </tr>
          ) : (
            cart.map((item, index) => (
              <tr key={item.productId._id}>
                <th scope="row">{index + 1}</th>
                <td>
                  <img
                    src={item.productId.image}
                    className="cart_image"
                    alt="Product"
                  />
                </td>
                <td className="text-dark">${item.productId.price}</td>
                <td className="text-dark">{item.quantity}</td>
                <td className="text-dark">
                  ${(item.productId.price * item.quantity).toFixed(2)}
                </td>
                <td>
                  <button
                    className="btn"
                    onClick={() => handleRemoveFromCart(item.productId._id)}
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
  );
};

export default Cart;
