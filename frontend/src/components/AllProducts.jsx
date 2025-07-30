import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const handleAddToCart = (product) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Explore All Products</h2>
      <div className="row">
        {products.map(product => (
          <div className="col-md-4 col-sm-6 mb-4" key={product._id}>
            <div className="card shadow-sm h-100">
              <img
                src={
                  product.image
                    ? `http://localhost:5000/uploads/${product.image}`
                    : '/images/default.jpg'
                }
                alt={product.name}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-muted">{product.description}</p>
                <ul className="list-unstyled small mb-3">
                  <li><strong>Price:</strong> Rs. {product.price}</li>
                  <li><strong>Category:</strong> {product.category}</li>
                  <li><strong>Stock:</strong> {product.inStock}</li>
                </ul>
                <div className="mt-auto d-flex justify-content-between">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="btn btn-outline-primary"
                  >
                    Add to Cart
                  </button>
                  <Link to={`/product/${product._id}`} className="btn btn-dark">
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
