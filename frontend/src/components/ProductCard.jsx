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
    if (window.confirm("Delete this product?")) {
      onDelete(product._id);
    }
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
    <div className="product-card-wrapper">
      <div className="card shadow-sm h-100">
        <img
          src={
            product.image
              ? `https://mini-ecommerce-project-backend.onrender.com/uploads/${product.image}`
              : "/images/default.jpg"
          }
          alt={product.name}
          className="card-img-top"
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text mb-2">{product.description}</p>
          <ul className="list-unstyled small mb-3">
            <li><strong>Category:</strong> {product.category}</li>
            <li><strong>Price:</strong> Rs {product.price}</li>
            <li><strong>Stock:</strong> {product.inStock}</li>
          </ul>
          <div className="mt-auto d-flex flex-wrap gap-2">
            <button className="btn btn-outline-primary" onClick={() => onView(product._id)}>
              View
            </button>
            {role === "admin" && (
              <>
                <button className="btn btn-outline-warning" onClick={() => setShowModal(true)}>
                  Edit
                </button>
                <button className="btn btn-outline-danger" onClick={handleDelete}>
                  Delete
                </button>
              </>
            )}
            <button className="btn btn-warning" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>

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
