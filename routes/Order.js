const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Cart = require("../models/cart");
const order = require("../models/order");

//@route get api/ADDRESS

const config = require("config");
const user = require("../models/user");

router.get("/testingOrderAPIs", (req, res) => {
  res.send("ORDER Running api ");
});

router.get("/getAllOrder", async (req, res) => {
  const Orders = await order.find({ user: req.body.user });
  res.send(Orders);
});

router.post("/placeorder", async (req, res) => {
  try {
    const cartValue = await Cart.findOne({ user: req.body.user });
    let cartItems = cartValue.cartItems;
    let products = [];
    var sumAmount = 0;
    console.log("cartItems");
    console.log(cartItems);

    for (let cart in cartItems) {
      var pro = await Product.findOne({ product: cart.product });
      //   console.log(pro.pricePerQuantity);
      //   if (pro.pricePerQuantity) sumAmount = sumAmount + pro.pricePerQuantity;
      //   console.log(cart);
      var newElemet = {
        productId: cart.product,
        produtName: "pro.name",
        productQuantity: 5,
        // cart.quantity,
        productPrice: 10,
        // pro.pricePerQuantity,
        productImage: "pro.image",
      };

      //   console.log(changed);
      console.log("cart");
      console.log(cart);
      products.push(newElemet);
    }

    console.log("products");
    console.log(products);

    let orderObject = new order({
      user: req.body.user,
      products: products,
      totalAmount: sumAmount,
    });
    await orderObject.save();
    res.send(orderObject);
  } catch (err) {
    console.log(err.message);
    res.status(400).send("server error");
    process.exit(1);
  }
});

// update order status

module.exports = router;
