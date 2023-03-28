const express = require("express");
const app = express();
const router = express.Router();
const Product = require("../models/product");
const Cart = require("../models/cart");
const order = require("../models/order");
const auth = require("../middleware/restaurentauth");
const cors = require("cors");
app.use(cors());
// const config = require("config");
// const http = require("http");
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

// const server = app.listen(9000, () => {
//   console.log("Server is up & running *6000");
// });

const io = require("socket.io")(9000, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  app.set("socket", socket);
  console.log("Connected & Socket Id111 is ", socket.id);
  socket.emit("Data", "first emit");
  socket.on("Realtime", (data) => {
    console.log(Realtime);
  });
});

router.get("/testingOrderAPIs", (req, res) => {
  res.send("ORDER Running api ");
});

router.get("/getAllOrder/:id", async (req, res) => {
  const userId = req.params["id"];
  const Orders = await order.find({ user: userId });
  res.send(Orders);
});

router.get("/getRestaurentOrders", auth, async (req, res) => {
  try {
    const restaurentId = req.restaurent.id;
    console.log(restaurentId);
    const Orders = await order.find({ restaurent: restaurentId });
    res.send(Orders);
  } catch (err) {
    console.log(err.message);
    res.status(400).send("server error");
    process.exit(1);
  }
});

router.post("/placeorder", async (req, res) => {
  try {
    const cartValue = await Cart.findOne({ user: req.body.user });
    let cartItems = cartValue.cartItems;
    let products = [];
    io.emit("Data", "emit");
    var sumAmount = 0;
    console.log("cartItems");
    console.log(cartItems);
    let restaurent;
    for (let cartElement in cartItems) {
      var cart = cartItems[cartElement];
      console.log(cart);
      var pro = await Product.findOne({ _id: cart.product });
      restaurent = pro.restaurent;
      console.log(cart.product);
      console.log(pro);
      var newElemet = {
        productId: cart.product,
        produtName: pro.name,
        productQuantity: cart.quantity,
        productPrice: pro.pricePerQuantity,
        productImage: pro.image,
      };
      console.log(newElemet);
      products.push(newElemet);
    }
    let orderObject = new order({
      user: req.body.user,
      products: products,
      totalAmount: sumAmount,
      restaurent: restaurent,
    });
    await orderObject.save();
    io.emit("status", "ererge");
    console.log("data emitted");
    res.send(orderObject);
  } catch (err) {
    console.log(err.message);
    res.status(400).send("server error");
    process.exit(1);
  }
});

// update order status by restaurent

router.post("/updateStatus", auth, async (req, res) => {
  try {
    console.log(req.body);
    const orderId = req.body.orderId;
    const restaurentId = req.restaurent.id;
    const query = { _id: orderId, restaurent: restaurentId };
    console.log(orderId + " orderId");
    console.log(restaurentId) + " restaurentId";
    const OrdersttausUpdation = await order.findOneAndUpdate(
      query,
      { $set: { status: req.body.status } },
      {
        new: true,
      }
    );
    console.log(OrdersttausUpdation);
    console.log(req.body.status);
    io.emit("orderId", OrdersttausUpdation);
    res.send(OrdersttausUpdation);
  } catch (err) {
    console.log(err.message);
    res.status(400).send("server error");
    process.exit(1);
  }
});

module.exports = router;
