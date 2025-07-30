import React, { useEffect, useState } from "react";
import AddProductModal from "../components/AddProductModal";
import ProductList from "./ProductList";
import axios from "axios";

const AdminDashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        if (Array.isArray(res.data)) {
          setProductCount(res.data.length);
          setProductList(res.data);
        }
      } catch (err) {
        console.error("Error fetching products:", err.message);
      }
    };

    fetchProducts();
  }, []);

  const handleAdd = (newProduct) => {
    setProductList((prev) => [...prev, newProduct]);
    setProductCount((prev) => prev + 1);
  };

  const handleEdit = (updatedProduct) => {
    setProductList((prev) =>
      prev.map((item) =>
        item._id === updatedProduct._id ? updatedProduct : item
      )
    );
  };

  const handleDelete = (idToDelete) => {
    setProductList((prev) => prev.filter((item) => item._id !== idToDelete));
    setProductCount((prev) => prev - 1);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Admin Dashboard</h2>

      {/* Product Counter Card */}
      <div className="card bg-light border-0 shadow-sm mb-4">
        <div className="card-body text-center">
          <h5 className="card-title">📦 Total Products</h5>
          <h2 className="display-6">{productCount}</h2>
        </div>
      </div>

      {/*Add Product Button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="mb-0">Add new products to your store:</p>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          + Add Product
        </button>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onProductAdded={handleAdd}
        />
      )}

      <hr className="my-5" />

      {/* Product List */}
      <ProductList
        productList={productList}
        onProductEdited={handleEdit}
        onProductDeleted={handleDelete}
      />
    </div>
  );
};

export default AdminDashboard;
