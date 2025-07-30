import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    default: '/images/default.jpg', // Optional fallback
  },
  description: {
    type: String,
    default: 'No description provided',
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    trim: true,
  },
  inStock: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
