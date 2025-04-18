import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/action/store";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Products from "./Components/Products";
import Product_card from "./Components/Product_card";
import Registration from "./Components/Registration";
import LoginForm from "./Components/LoginForm";
import About from "./Components/About";
import Admin from "./Components/Admin";
import AdminProtectedRoute from "./Components/AdminProtectedRoute";
import Cart from "./Components/Cart";
import Footer from "./Components/Footer";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "./Firebase";
import "./App.css";
import Contact from "./Components/Contact";

// Intract-database with Firebase
const db = getDatabase(app);

function App() {
  const putData = () => {
    set(ref(db, "user/aman"), {
      id: 1,
      name: "Aman kureshi",
      age: 20,
    });
  };
  return (
    <Provider store={store}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Products/:id" element={<Product_card />} />
        <Route path="/Register" element={<Registration />} />
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin/*" element={<Admin />} />
        </Route>
      </Routes>
      <Footer />
      {/* <button onClick={putData}>new</button> */}
    </Provider>
  );
}

export default App;
