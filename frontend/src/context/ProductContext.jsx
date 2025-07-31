import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState('');

  useEffect(() => {
    axios.get('https://mini-ecommerce-project-backend.onrender.com/api/products')
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch products:', err.message);
        setLoadingError('Failed to load products');
        setLoading(false);
      });
  }, []);

  const updateProduct = (updatedItem) => {
    setProducts(prev =>
      prev.map(product =>
        product._id === updatedItem._id ? { ...product, ...updatedItem } : product
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(product => product._id !== id));
  };

  return (
    <ProductContext.Provider value={{
      products,
      setProducts,
      updateProduct,
      deleteProduct,
      loading,
      loadingError
    }}>
      {children}
    </ProductContext.Provider>
  );
};
