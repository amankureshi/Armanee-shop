import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // 🔹 Get role from localStorage
  const token = localStorage.getItem("token"); // 🔹 Get token from localStorage

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}api/auth/logout`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // ✅ Clear Local Storage & Redirect
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}api/cart/items`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const totalItems = data.cart.reduce(
        (total, item) => total + item.quantity,
        0
      );
      setTotalItems(totalItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg py-3 shadow-sm">
        <div className="container">
          <NavLink className="h4 text-decoration-none mt-1" to="/">
            Armanee
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
              {/* 🔹 Show Admin Links Only If Admin is Logged In */}
              {role === "admin" && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/admin/dashboard">
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/admin/products">
                      Add-Products
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/admin/users">
                      Users
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
            <form className="d-flex gap-2">
              {!token && (
                <>
                  <NavLink
                    to="/login"
                    className="btn btn-outline-dark text-white"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="btn btn-outline-dark text-white"
                  >
                    Register
                  </NavLink>
                </>
              )}
              <NavLink to="/cart" className="btn btn-outline-dark text-white">
                Cart({totalItems})
              </NavLink>
              {/* ✅ Logout Button */}
              {token && (
                <button
                  className="btn btn-danger text-white"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
