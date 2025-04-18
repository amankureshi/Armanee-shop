import React from "react";
const Footer = () => {
  return (
    <div className="footer shadow-sm" id="footer">
      <div className="container">
        <footer>
          <div className="container p-4">
            <div className="row">
              <div className="col-lg-6 col-md-12 mb-4">
                <h5 className="mb-3">Armanee</h5>
                <p>
                  Your E-commerce Website. All rights reserved. <br />
                  We offer the best products at the best prices. <br />
                  Contact us at support@armanee.com for any inquiries.
                </p>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <h5 className="mb-3">links</h5>
                <ul className="list-unstyled mb-0">
                  <li className="mb-1">
                    <a href="#" className="text-decoration-none text-white">
                      Frequently Asked Questions
                    </a>
                  </li>
                  <li className="mb-1">
                    <a href="#" className="text-decoration-none text-white">
                      Delivery
                    </a>
                  </li>
                  <li className="mb-1">
                    <a href="#" className="text-decoration-none text-white">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-decoration-none text-white">
                      Where we deliver?
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <h5 className="mb-1">opening hours</h5>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Mon - Fri:</td>
                      <td>8am - 9pm</td>
                    </tr>
                    <tr>
                      <td>Sat - Sun:</td>
                      <td>8am - 1am</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="text-center p-3">
            © 2024 Copyright :
            <a
              className="text-white p-1"
              href="https://www.linkedin.com/in/aman-kureshi/"
            >
              amankureshi
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
