import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { toast } from "react-toastify";

const ProductList = ({ productList, onProductEdited, onProductDeleted }) => {
  const navigate = useNavigate();

  const handleView = (id) => navigate(`/product/${id}`);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (res.ok) {
        onProductDeleted(id);
        toast.success("Product deleted");
      } else {
        toast.error("Failed to delete product");
      }
    } catch (err) {
      toast.error("Server error during delete");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Available Products</h2>
      {productList.length > 0 ? (
        <div className="row">
          {productList.map((product) => (
            <div className="col-md-4 mb-4" key={product._id}>
              <ProductCard
                product={product}
                onView={() => handleView(product._id)}
                onEdit={onProductEdited} 
                onDelete={() => handleDelete(product._id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">No products found.</p>
      )}
    </div>
  );
};

export default ProductList;
