const express = require("express");
const port = 3000;
const cors = require("cors");
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser());
app.use(cors());

// models
const User = require("./models/user");
// const cart = require("./models/cartItems");
// const address = require("./models/addresses");
// const product = require("./models/product");
const connectDB = require("./config/db");

// routes

//db connection
connectDB();

app.use("/api/users", require("./routes/user"));
app.use("/api/address", require("./routes/address"));
app.use("/api/restaurent", require("./routes/restaurent"));
app.use("/api/product", require("./routes/product"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/order", require("./routes/order"));

app.get("/", (req, res) => {
  res.send("Running api");
});
app.listen(port, () => console.log("server"));
