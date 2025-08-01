import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cart, setCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const updateQuantity = async (productId, amount) => {
    const item = cart.find((i) => i.id === productId);
    if (!item) return;
    const newQuantity = Math.max(1, item.quantity + amount);

    try {
      const res = await axios.put(
        `https://mini-ecommerce-project-backend.onrender.com/api/cart/${userId}/${productId}`,
        { quantity: newQuantity },
        { headers: { "auth-token": token } }
      );
      const parsed = Array.isArray(res.data.items)
        ? res.data.items.map((i) => ({
            id: i.productId._id,
            name: i.productId.name,
            image: i.productId.image
              ? `https://mini-ecommerce-project-backend.onrender.com/uploads/${i.productId.image}`
              : "/images/default.jpg",
            price:
              typeof i.productId.price === "number" ? i.productId.price : 0,
            quantity: i.quantity,
          }))
        : [];
      setCart(parsed);
    } catch (err) {
      console.error("Failed to update quantity", err);
    }
  };

  const removeItem = async (productId) => {
    try {
      const res = await axios.delete(
        `https://mini-ecommerce-project-backend.onrender.com/api/cart/${userId}/${productId}`,
        { headers: { "auth-token": token } }
      );
      const parsed = Array.isArray(res.data.items)
        ? res.data.items.map((i) => ({
            id: i.productId._id,
            name: i.productId.name,
            image: i.productId.image
              ? `https://mini-ecommerce-project-backend.onrender.com/uploads/${i.productId.image}`
              : "/images/default.jpg",
            price:
              typeof i.productId.price === "number" ? i.productId.price : 0,
            quantity: i.quantity,
          }))
        : [];
      setCart(parsed);
    } catch (err) {
      console.error("Failed to delete item", err);
    }
  };

  const totalPrice = cart.reduce(
    (sum, item) =>
      typeof item.price === "number" ? sum + item.price * item.quantity : sum,
    0
  );

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center p-5 border border-2 rounded bg-light">
          <h4 className="text-muted">Your cart is empty</h4>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle text-center">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td className="fw-semibold">{item.name}</td>
                    <td>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-thumbnail"
                        style={{ maxWidth: "80px" }}
                      />
                    </td>
                    <td>
                      Rs. {typeof item.price === "number" ? item.price : "0"}
                    </td>
                    <td>
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          −
                        </button>
                        <span className="fw-bold">{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-outline-success"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      Rs.{" "}
                      {typeof item.price === "number"
                        ? item.price * item.quantity
                        : "0"}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeItem(item.id)}
                      >
                        <i className="bi bi-trash-fill me-1"></i>Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="table-info">
                  <td colSpan="6" className="text-end fw-bold">
                    Total Price
                  </td>
                  <td className="fw-bold">Rs. {totalPrice}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <button className="btn btn-warning px-4 py-2" onClick={clearCart}>
              <i className="bi bi-x-circle me-1"></i>Clear Cart
            </button>
            <button
              className="btn btn-primary px-4 py-2"
              onClick={() => navigate("/allproducts")}
            >
              Go to Products
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
