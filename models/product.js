const Mongoose = require("mongoose");
const { Schema } = Mongoose;

// Product Schema

const ProductSchema = new Schema({
  restaurent: {
    type: Schema.Types.ObjectId,
    ref: "Restaurent",
  },
  name: {
    type: String,
    enum: ["Pizza", "Pasta", "Burger", "Shakes", "Drinks"],
  },
  imageUrl: {
    type: String,
  },
  description: {
    type: String,
  },
  quantityAvailable: {
    type: Number,
  },
  pricePerQuantity: {
    type: Number,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Mongoose.model("Product", ProductSchema);
