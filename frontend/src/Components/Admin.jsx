import { Routes, Route, NavLink } from "react-router-dom";
import Users from "./Admin/Users";
import Dashboard from "./Admin/Dashboard";
import Products from "./Admin/AddProduct";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 h-screen p-5">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
    </div>
  );
};

const Admin = () => {
  return (
    <div>
      <Sidebar />
      <div>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
