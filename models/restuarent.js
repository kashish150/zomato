const Mongoose = require("mongoose");
const { Schema } = Mongoose;

// Restaurent Schema
const RestaurentSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  product: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

module.exports = Mongoose.model("Restaurent", RestaurentSchema);
