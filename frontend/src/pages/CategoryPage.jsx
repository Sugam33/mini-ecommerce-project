import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { toast } from "react-toastify";

const CategoryPage = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role"); 

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products/category/${name}`
        );
        setFiltered(res.data);
      } catch (err) {
        console.error("Error fetching category products:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [name]);

  // View product detail
  const handleView = (id) => navigate(`/product/${id}`);

  // Admin-only delete
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: {
          "auth-token": localStorage.getItem("token")
        }
      });
      if (res.data?.message) {
        setFiltered((prev) => prev.filter((p) => p._id !== id));
        toast.success("Product deleted");
      } else {
        toast.error("Failed to delete");
      }
    } catch (err) {
      toast.error("Delete error");
    }
  };

  // Admin-only edit
  const handleEdit = (updated) => {
    setFiltered((prev) =>
      prev.map((item) => (item._id === updated._id ? updated : item))
    );
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">{name} Products</h2>
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate(-1)}
      >
        ← Go Back
      </button>

      {loading ? (
        <p>Loading products...</p>
      ) : filtered.length > 0 ? (
        <div className="row">
          {filtered.map((product) => (
            <div key={product._id} className="col-md-4 mb-4">
              <ProductCard
                product={product}
                onView={handleView}
                onDelete={role === "admin" ? handleDelete : undefined}
                onEdit={role === "admin" ? handleEdit : undefined}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No products found in "{name}" category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
