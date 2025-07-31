import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `https://mini-ecommerce-project-backend.onrender.com/api/products/${id}`
        );
        setProduct(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Product not found. Please check the product ID or go back.");
      }
    };

    fetchProduct();
  }, [id]);

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning text-center">
          <h4 className="mb-0">{error}</h4>
        </div>
      </div>
    );
  }

  if (!product) {
    return <p className="text-center py-5">Loading product details...</p>;
  }

  return (
    <div className="container mt-5">
      <div className="card border-0 shadow-sm overflow-hidden">
        {/* Product Image */}
        <div className="w-100 bg-light text-center p-3">
          <img
            src={`https://mini-ecommerce-project-backend.onrender.com/uploads/${product.image}`}
            alt={product.name}
            className="img-fluid"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>

        <div className="card-body">
          <h2 className="card-title mb-3">{product.name}</h2>

          <div className="mb-3">
            <span className="badge bg-secondary me-2">
              Category: {product.category}
            </span>
            <span
              className={`badge ${
                product.inStock > 0 ? "bg-success" : "bg-danger"
              }`}
            >
              {product.inStock > 0
                ? `${product.inStock} item(s) in stock`
                : "Out of Stock"}
            </span>
          </div>

          <p className="mb-3">
            <strong>Description:</strong>
            <br />
            {product.description}
          </p>

          <div className="mb-3">
            <strong>Price:</strong>{" "}
            <span className="text-success fw-bold">Rs {product.price}</span>
          </div>

          {/* <div className="alert alert-info">
            <strong>Need to make changes?</strong> You can return to the
            dashboard to edit or delete this product.
          </div> */}
        </div>

        <div className="card-footer bg-white text-end">
          <button
            className="btn btn-outline-secondary"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
