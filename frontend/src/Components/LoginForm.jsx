import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        // console.log("Role:", data.role);

        alert("Login successful!");

        // Redirect based on role
        if (data.role === "admin") {
          // ✅ Fixed here
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("Login failed");
    }
  };

  return (
    <section className="about account mt-3 mb-3">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="acc-block">
              <h3 className="mb-4 text-center text-dark">Login</h3>
              {error && <p className="text-danger text-center">{error}</p>}
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  className="form-control mb-4"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className="form-control mb-4"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ backgroundColor: "#1D1D1D", border: "none" }}
                >
                  Login
                </button>
              </form>
              <p className="signin text-center pt-4">
                Don't Have an account? <a href="/register">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
