import React, { useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import EditProductModal from "./EditProductModal";
import { toast } from "react-toastify";

const ProductCard = ({ product, onView, onEdit, onDelete }) => {
  const { addToCart } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  const role = localStorage.getItem("role");

  const handleSave = async (updatedItem) => {
    try {
      const res = await axios.put(
        `https://mini-ecommerce-project-backend.onrender.com/api/products/${product._id}`,
        updatedItem,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data?._id) {
        onEdit(res.data);
        toast.success("Product updated!");
        setShowModal(false);
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      console.error("Error updating product:", err);
      toast.error("Failed to update product");
    }
  };

  const handleCancel = () => setShowModal(false);

  const handleDelete = () => {
    const confirm = window.confirm("Delete this product?");
    if (!confirm) return;
    onDelete(product._id);
  };

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">
          {product.description}
          <br />
          <strong>Category:</strong> {product.category}
          <br />
          <strong>Price:</strong> Rs {product.price}
          <br />
          <strong>Stock:</strong> {product.inStock}
        </p>

        <button
          className="btn btn-outline-primary me-2"
          onClick={() => onView(product._id)}
        >
          View
        </button>

        {role === "admin" && (
          <>
            <button
              className="btn btn-outline-warning me-2"
              onClick={() => setShowModal(true)}
            >
              Edit
            </button>
            <button
              className="btn btn-outline-danger me-2"
              onClick={handleDelete}
            >
              Delete
            </button>
          </>
        )}

        <button
          className="btn btn-warning me-2"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>

        {showModal && (
          <EditProductModal
            product={product}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ProductCard;
