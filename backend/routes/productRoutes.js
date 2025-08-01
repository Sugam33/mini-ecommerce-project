import express from 'express';
import Product from '../models/Product.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js'; 
import upload from '../middleware/upload.js'; 

const router = express.Router();

// Search products
router.get("/search", async (req, res) => {
  const rawQuery = req.query.q || "";
  const query = rawQuery.trim().toLowerCase();

  if (!query) return res.status(400).json({ message: "Search query missing" });

  try {
    const results = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } }
      ]
    });

    res.json(results);
  } catch (err) {
    console.error("Search error:", err.message);
    res.status(500).json({ message: "Search failed", error: err.message });
  }
});


//Image Upload Route (Admin only)
router.post('/upload-image', verifyToken, verifyAdmin, upload.single('image'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    res.status(200).json({ filename: req.file.filename });
  } catch (err) {
    res.status(500).json({ error: 'Image upload failed' });
  }
});

// Get All Products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get Products by Category
router.get('/category/:name', async (req, res) => {
  try {
    const category = req.params.name.trim().toLowerCase();
    const products = await Product.find({
      category: { $regex: category, $options: 'i' },
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch category products' });
  }
});

// Get Product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create New Product (Admin only)
router.post('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update Product (Admin only)
router.put('/:id', verifyToken, verifyAdmin, upload.single('image'), async (req, res) => {
  try {
    const updateData = req.body;

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Product (Admin only)
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
