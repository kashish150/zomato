const Mongoose = require("mongoose");

// const { ROLES, EMAIL_PROVIDER } = require('../constants');

const { Schema } = Mongoose;

// User Schema
const RestaurentSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  restuarentName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  imgUrl: {
    type: String,
  },
});

module.exports = Mongoose.model("Restaurent", RestaurentSchema);
