import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <section className="d-flex justify-content-center mt-5 mb-5">
      <div className="col-md-4">
        <div className="acc-block">
          <h3 className="mb-4 text-center text-dark">Sign Up</h3>

          <form onSubmit={handleSubmit}>
            <FormInput
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <FormInput
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <FormInput
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>

          <div className="divider">
            <span className="divider-text">Or</span>
          </div>

          {/* Social Login Buttons */}
          <div className="social-login-buttons d-flex justify-content-center gap-2">
            <SocialButton
              platform="facebook"
              url="https://www.facebook.com/login.php/"
            />
            <SocialButton
              platform="google"
              url="https://accounts.google.com/"
            />
            <SocialButton platform="apple" url="https://appleid.apple.com/" />
          </div>

          <p className="signin text-center pt-4">
            Already Have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </section>
  );
};

// ✅ Reusable Input Component
const FormInput = ({ type, name, placeholder, value, onChange, required }) => (
  <input
    type={type}
    name={name}
    className="form-control mb-4"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required={required}
  />
);

// ✅ Reusable Social Login Button
const SocialButton = ({ platform, url }) => {
  const icons = {
    facebook: <i className="fab fa-facebook-f"></i>,
    google: (
      <img
        src="https://img.icons8.com/?size=96&id=17949&format=png"
        alt="google-icon"
        width="18"
        className="mb-1"
      />
    ),
    apple: <i className="fab fa-apple"></i>,
  };

  return (
    <button
      className={`btn btn-${platform}`}
      onClick={() => (window.location.href = url)}
      aria-label={`Login with ${platform}`}
    >
      {icons[platform]}
    </button>
  );
};

export default Registration;
