import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      alert(data.message);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        message: "",
      });
    } catch (error) {
      alert("Error sending message. Please try again.");
    }
  };

  return (
    <div>
      <section class="about products-sec">
        <div class="container">
          <div class="text-center mb-5">
            <h3 class="ttl mb-5 mt-4">Say Hello</h3>
            <p>
              We hate being all business, despite running one. So whether you
              had a good experience, a bad one or just want a tea suggestion, do
              contact us. Or if you'd rather go through our FAQ and save time,
              please do..
            </p>
          </div>

          <div class="row">
            <div class="col-md-8">
              <form class="row" onSubmit={handleSubmit}>
                <div class="col-md-6 mb-4">
                  <input
                    type="text"
                    name="firstName"
                    class="form-control bg-light"
                    placeholder="Enter First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div class="col-md-6 mb-4">
                  <input
                    type="text"
                    class="form-control bg-light"
                    placeholder="Enter Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div class="col-md-6 mb-4">
                  <input
                    type="email"
                    class="form-control bg-light"
                    placeholder="Enter Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div class="col-md-6 mb-4">
                  <input
                    type="text"
                    class="form-control bg-light"
                    placeholder="Enter Mobile Number"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div class="col-md-12 mb-4">
                  <textarea
                    class="form-control bg-light"
                    placeholder="Enter Message"
                    rows="6"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button
                  class="btn btn-success w-auto message-btn mx-2 mb-4 "
                  type="submit"
                >
                  Send Message
                </button>
              </form>
            </div>
            <div class="col-md-1"></div>
            <div class="col-md-3">
              <h2>CONTACTS INFO</h2>
              <br />
              <p>
                <b>Shop Address:</b>
                <br />
                Armanee Shop Agol, At. &, Dist. Mehsana, INDIA
              </p>

              <p></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
