import React, { useState, useContext, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import { toast } from "react-toastify";

const ProductForm = () => {
  const { products, setProducts } = useContext(ProductContext);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    inStock: "",
    price: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit form and add product
  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      ...formData,
      id: Date.now(),
      inStock: parseInt(formData.inStock),
      price: parseInt(formData.price),
    };

    setProducts((prev) => [...prev, newProduct]);
    toast.success("Product added successfully! ");

    setFormData({
      name: "",
      description: "",
      category: "",
      inStock: "",
      price: "",
    });
  };

  //  Log product list whenever it updates
  useEffect(() => {
    console.log("Product list updated:", products);
  }, [products]);

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="2"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            name="category"
            className="form-select"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Groceries">Groceries</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input
            type="number"
            name="inStock"
            className="form-control"
            value={formData.inStock}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price (Rs)</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
