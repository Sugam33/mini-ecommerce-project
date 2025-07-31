import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AddProductModal = ({ onClose, onProductAdded }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    inStock: 0,
    image: '',
    category: 'Electronics',
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const categories = ['Electronics', 'Groceries', 'Clothing'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: ['price', 'inStock'].includes(name) ? parseInt(value) : value,
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0] || null);
  };

  const uploadImage = async () => {
    if (!selectedFile) return '';

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const res = await fetch('https://mini-ecommerce-project-backend.onrender.com/api/products/upload-image', {
        method: 'POST',
        headers: {
          'auth-token': localStorage.getItem('token'),
        },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        return data.filename;
      } else {
        toast.error('❌ Image upload failed');
        return '';
      }
    } catch (err) {
      console.error('Upload error:', err.message);
      toast.error('🚨 Server error while uploading image');
      return '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filename = await uploadImage();

    const payload = { ...newProduct, image: filename };

    try {
      const res = await fetch('https://mini-ecommerce-project-backend.onrender.com/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const saved = await res.json();
        onProductAdded(saved);
        toast.success('Product added');
        onClose();
        setNewProduct({
          name: '',
          description: '',
          price: 0,
          inStock: 0,
          image: '',
          category: 'Electronics'
        });
        setSelectedFile(null);
      } else {
        toast.error('Failed to add product');
      }
    } catch (err) {
      console.error('Error adding product:', err.message);
      toast.error('Server error while adding product');
    }
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content border-0 shadow-sm">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Add Product</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              {['name', 'description', 'price', 'inStock'].map(field => (
                <div className="mb-2" key={field}>
                  <label className="form-label">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    name={field}
                    type={['price', 'inStock'].includes(field) ? 'number' : 'text'}
                    value={newProduct[field]}
                    onChange={handleChange}
                    className="form-control"
                    placeholder={`Enter ${field}`}
                    required
                  />
                </div>
              ))}

              <div className="mb-2">
                <label className="form-label">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="form-control"
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Category</label>
                <select
                  name="category"
                  value={newProduct.category}
                  onChange={handleChange}
                  className="form-control"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button type="submit" className="btn btn-success">Add Product</button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
