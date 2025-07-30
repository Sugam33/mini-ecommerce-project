import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const EditProductModal = ({ product, onSave, onCancel }) => {
  const [editData, setEditData] = useState({ ...product });
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    setEditData({ ...product });
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "inStock" ? parseInt(value) : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const key in editData) {
      formData.append(key, editData[key]);
    }
    if (newImage) {
      formData.append("image", newImage);
    }

    onSave(formData);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") handleCancel();
    if (e.key === "Enter") handleSubmit(e);
  };

  const handleCancel = () => {
    toast.info("Edit canceled");
    onCancel();
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      onKeyDown={handleKeyDown}
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content border-0 shadow-sm">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Edit Product</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCancel}
              ></button>
            </div>

            <div className="modal-body">
              <div className="mb-2">
                <label className="form-label">Product Name</label>
                <input
                  name="name"
                  value={editData.name || ""}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Product Name"
                  required
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  value={editData.description || ""}
                  onChange={handleChange}
                  className="form-control"
                  rows="2"
                  placeholder="Description"
                  required
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Category</label>
                <select
                  name="category"
                  value={editData.category}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Clothing">Clothing</option>
                </select>
              </div>

              <div className="mb-2">
                <label className="form-label">Stock</label>
                <input
                  name="inStock"
                  type="number"
                  value={editData.inStock || 0}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Stock"
                  min="0"
                  required
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Price (Rs)</label>
                <input
                  name="price"
                  type="number"
                  value={editData.price || 0}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Price"
                  min="0"
                  required
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Product Image (optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button type="submit" className="btn btn-success">
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
