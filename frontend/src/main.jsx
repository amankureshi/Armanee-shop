import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home.jsx";
import Products from "./Components/Products.jsx";
import Footer from "./Components/Footer.jsx";
import { Provider } from "react-redux";
import store from "./redux/action/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/home" element={<Products />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
