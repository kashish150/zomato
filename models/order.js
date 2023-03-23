const Mongoose = require("mongoose");
const { Schema } = Mongoose;

// Order Schema
const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Not_processed",
    enum: ["Not_processed", "Processing", "Shipped", "Delivered", "Cancelled"],
  },
  totalAmount: {
    type: String,
    required: true,
  },
  products: [
    {
      productId: { type: String },
      produtName: { type: String },
      productPrice: { type: Number },
      productQuantity: { type: Number },
      productImage: { type: String },
    },
  ],
  restaurent: {
    type: Schema.Types.ObjectId,
    ref: "Restaurent",
  },
});

module.exports = Mongoose.model("Order", OrderSchema);
