import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      primary: {
        type: String,
        required: true,
      },
      secondary: {
        type: String,
        required: false,
      },
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    required: false,
    default: 0,
  },
  discountedPercentage: {
    type: Number,
    required: false,
    default: 0,
  },
  stock: {
    type: Number,
    required: true,
  },
  vendor: {
    type: String,
    required: false,
  },
  sku: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: true,
    enum: ["Decors", "Chairs", "Sofas", "Tables", "Lighting"],
  },
});

const Product = models.Product || model("Product", productSchema);

export default Product;
