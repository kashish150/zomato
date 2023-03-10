const Mongoose = require("mongoose");

// const { ROLES, EMAIL_PROVIDER } = require('../constants');

const { Schema } = Mongoose;

// User Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  avatar: {
    type: String,
  },
});

module.exports = Mongoose.model("User", UserSchema);
