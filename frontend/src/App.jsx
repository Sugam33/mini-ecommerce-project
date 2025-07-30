import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import Cart from "./pages/Cart";
import AllProducts from "./components/AllProducts";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import UserDashboard from "./pages/UserDashboard";

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <ToastContainer position="top-right" autoClose={2500} />
        <Router>
          <Routes>
            <Route element={<Layout />}>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/allproducts" element={<AllProducts />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/category/:name" element={<CategoryPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Protected Admin and User Route */}
              <Route element={<ProtectedRoute allowedRole="admin" />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>
              <Route element={<ProtectedRoute allowedRole="user" />}>
                <Route path="/user" element={<UserDashboard />} />
              </Route>

            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
