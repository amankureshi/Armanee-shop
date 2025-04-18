import React, { useState } from "react";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: "",
    rating: {
      rate: "",
      count: "",
    },
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("rating.")) {
      const ratingField = name.split(".")[1];
      setProduct((prevProduct) => ({
        ...prevProduct,
        rating: {
          ...prevProduct.rating,
          [ratingField]: value,
        },
      }));
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("No token found. Please log in.");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(product),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("✅ Product added successfully!");
        setProduct({
          title: "",
          description: "",
          price: "",
          image: "",
          category: "",
          stock: "",
          rating: {
            rate: "",
            count: "",
          },
        });
      } else {
        setErrorMessage(data.message || "❌ Failed to add product.");
      }
    } catch (error) {
      setErrorMessage("❌ Error adding product. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-extrabold text-gray-900  mb-2">
            Add New Product
          </h2>
          <p className="text-gray-500  mb-6">
            Fill in the product details carefully
          </p>

          {successMessage && (
            <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200">
              <p className="text-green-700 font-medium text-center">
                {successMessage}
              </p>
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
              <p className="text-red-700 font-medium text-center">
                {errorMessage}
              </p>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="p-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Title
                    </label>
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      name="title"
                      placeholder="e.g., Premium Wireless Headphones"
                      value={product.title}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                  </td>
                  <td className="p-2">
                    <textarea
                      name="description"
                      placeholder="Detailed product description..."
                      value={product.description}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all h-32"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price ($)
                    </label>
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      name="price"
                      placeholder="0.00"
                      value={product.price}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock Quantity
                    </label>
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      name="stock"
                      placeholder="0"
                      value={product.stock}
                      onChange={handleChange}
                      required
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      name="category"
                      placeholder="e.g., Electronics"
                      value={product.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image URL
                    </label>
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      name="image"
                      placeholder="https://example.com/image.jpg"
                      value={product.image}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating (0-5)
                    </label>
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      name="rating.rate"
                      placeholder="4.5"
                      value={product.rating.rate}
                      onChange={handleChange}
                      required
                      min="0"
                      max="5"
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Review Count
                    </label>
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      name="rating.count"
                      placeholder="120"
                      value={product.rating.count}
                      onChange={handleChange}
                      required
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" className="p-2 text-center">
                    <button
                      type="submit"
                      className="btn btn-outline-dark text-white"
                    >
                      Add Product
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
