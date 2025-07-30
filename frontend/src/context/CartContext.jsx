import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [token, setToken] = useState(localStorage.getItem("token"));

  const formatImage = (img) =>
    img ? `http://localhost:5000/uploads/${img}` : "/images/default.jpg";
  useEffect(() => {
    const syncAuth = () => {
      setUserId(localStorage.getItem("userId"));
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  // Fetch cart items
  const fetchCart = async () => {
    if (!userId || !token) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/cart/${userId}`, {
        headers: { "auth-token": token },
      });

      const parsed = Array.isArray(res.data.items)
        ? res.data.items.map((i) => ({
            id: i.productId._id,
            name: i.productId.name,
            image: formatImage(i.productId.image),
            price:
              typeof i.productId.price === "number" ? i.productId.price : 0,
            quantity: i.quantity,
          }))
        : [];

      setCart(parsed);
    } catch (err) {
      console.error("Cart fetch failed", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId, token]);

  // Add item to cart
  const addToCart = async (product) => {
    if (!userId || !token) {
      toast.error("Please log in to add items to cart.");
      return;
    }

    try {
      const alreadyInCart = cart.some((item) => item.id === product.id);
      if (alreadyInCart) {
        toast.info(`${product.name} is already in cart.`);
        return;
      }

      const res = await axios.post(
        `http://localhost:5000/api/cart/${userId}`,
        { productId: product.id, quantity: 1 },
        { headers: { "auth-token": token } }
      );

      const parsed = Array.isArray(res.data.items)
        ? res.data.items.map((i) => ({
            id: i.productId._id,
            name: i.productId.name,
            image: formatImage(i.productId.image),
            price:
              typeof i.productId.price === "number" ? i.productId.price : 0,
            quantity: i.quantity,
          }))
        : [];

      setCart(parsed);
      toast.success(`${product.name} added to cart!`);
    } catch (err) {
      console.error("Add to cart failed", err);
      toast.error("Failed to add product to cart.");
    }
  };

  // Remove item
  const removeFromCart = async (productId) => {
    if (!userId || !token) {
      toast.error("Please log in to remove items.");
      return;
    }

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/cart/${userId}/${productId}`,
        { headers: { "auth-token": token } }
      );

      const parsed = Array.isArray(res.data.items)
        ? res.data.items.map((i) => ({
            id: i.productId._id,
            name: i.productId.name,
            image: formatImage(i.productId.image),
            price:
              typeof i.productId.price === "number" ? i.productId.price : 0,
            quantity: i.quantity,
          }))
        : [];

      setCart(parsed);
      toast.info("Item removed from cart.");
    } catch (err) {
      console.error("Remove from cart failed", err);
      toast.error("Failed to remove item.");
    }
  };

  // Clear cart
  const clearCart = async () => {
    if (!userId || !token) {
      toast.error("Please log in to clear the cart.");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/cart/${userId}`, {
        headers: { "auth-token": token },
      });
      setCart([]);
      toast.warn("Cart cleared.");
    } catch (err) {
      console.error("Clear cart failed", err);
      toast.error("Failed to clear cart.");
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
