const http = require("http");
const express = require("express");
const port = 3000;
const cors = require("cors");
const app = express();
// const { Server } = require("socket.io");
var bodyParser = require("body-parser");
// const httpServer = http.createServer();

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

const server = app.listen(port, () => {
  console.log("Server is up & running *3000");
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

app.use("/api/users", require("./routes/user"));
app.use("/api/address", require("./routes/address"));
app.use("/api/restaurent", require("./routes/restaurent"));
app.use("/api/product", require("./routes/product"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/order", require("./routes/order"));

// app.get("/", (req, res) => {
//   res.send("Running api");
// });

io.on("connection", (socket) => {
  app.set("socket", socket);
  console.log("Connected & Socket Id is ", socket.id);
  socket.emit("Data", "first emit");
  socket.on("Realtime", (data) => {
    console.log(Realtime);
  });
});

app.get("/", (req, res) => {
  // io.emit("Temperature", "req.body.temp");
  res.send("call1");
});
