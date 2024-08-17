import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const CartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      productTitle: {
        type: String,
        ref: "Product",
        required: true,
      },
      productImage: {
        type: String,
        ref: "Product",
        required: true,
      },
      productPrice: {
        type: Number,
        ref: "Product",
        required: true,
      },
      productDiscountedPrice: {
        type: Number,
        ref: "Product",
        required: true,
      },
      productStock: {
        type: Number,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
});

const Cart = models.Cart || model("Cart", CartSchema);

export default Cart;
