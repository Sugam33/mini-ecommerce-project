import express from "express";
import Cart from "../models/Cart.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Helper function to populate full product details
const populateCart = async (userId) => {
  return await Cart.findOne({ userId })
    .populate("items.productId", "name price image");
};

// Get Cart
router.get("/:userId", verifyToken, async (req, res) => {
  try {
    const cart = await populateCart(req.params.userId);
    if (!cart) {
      return res.json({ userId: req.params.userId, items: [] });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// Add or Update Item
router.post("/:userId", verifyToken, async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) cart = new Cart({ userId: req.params.userId, items: [] });

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    const updatedCart = await populateCart(req.params.userId);
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: "Failed to add/update cart item" });
  }
});

// Edit Quantity
router.put("/:userId/:productId", verifyToken, async (req, res) => {
  const { quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const item = cart.items.find(
      (i) => i.productId.toString() === req.params.productId
    );
    if (!item) return res.status(404).json({ error: "Item not in cart" });

    item.quantity = quantity;
    await cart.save();
    const updatedCart = await populateCart(req.params.userId);
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: "Failed to edit cart item" });
  }
});

// Remove Item
router.delete("/:userId/:productId", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== req.params.productId
    );
    await cart.save();
    const updatedCart = await populateCart(req.params.userId);
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete item from cart" });
  }
});

// Clear Cart
router.delete("/:userId", verifyToken, async (req, res) => {
  try {
    const deleted = await Cart.findOneAndDelete({ userId: req.params.userId });
    if (!deleted) return res.status(404).json({ error: "Cart not found" });
    res.json({ message: "Cart cleared successfully", items: [] });
  } catch (err) {
    res.status(500).json({ error: "Failed to clear cart" });
  }
});

export default router;
