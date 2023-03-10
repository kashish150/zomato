const Mongoose = require("mongoose");

// const { CART_ITEM_STATUS } = require("../constants");

const { Schema } = Mongoose;

// Cart Item Schema
const CartItemsSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

module.exports = Mongoose.model("CartItems", CartItemsSchema);

// Cart Schema
const CartSSchema = new Schema({
  cartItems: [CartItemsSchema],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Not_processed",
    enum: ["Not_processed", "Processing", "Shipped", "Delivered", "Cancelled"],
  },
});

module.exports = Mongoose.model("Cart", CartSSchema);
