const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");

const config = require("config");
const CartItems = require("../models/cart");

router.get("/", (req, res) => {
  res.send("ADDRESS USER Running api ");
});

// USING WHOLE FRONTEND SIDE VALUE UPDATION ALSO

router.post("/updateCart", async (req, res) => {
  const userId = req.body.userId;
  try {
    const cartValue = await Cart.find({ user: userId });
    if (cartValue) {
      const query = { user: userId };
      const cartValue = await Cart.findOneAndUpdate(query, req.body);
    } else {
      let cart = new Cart(req.body);
      await cart.save();
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).send("server error");
    process.exit(1);
  }
});

router.post("/updateCartBackend", async (req, res) => {
  const userId = req.body.user;
  //   console.log(userId);
  try {
    const cartValue = await Cart.findOne({ user: userId });
    // console.log(cartValue);
    console.log("user");
    if (cartValue) {
      //   console.log("check1");
      const query = { user: userId };
      let product = req.body.newProduct.product;
      let quantityUpdate = req.body.newProduct.quantity;
      let products = cartValue.cartItems;
      console.log("check3");
      console.log(req.body);
      console.log(product);
      console.log(products);
      let checkProductIdIsThereOrNot = products.find(
        (p) => p.product == product
      );

      console.log("check2");
      console.log(checkProductIdIsThereOrNot);

      if (checkProductIdIsThereOrNot !== undefined) {
        console.log("productpresent");
        var foundItem = products.find((p) => p.product == product);
        foundItem.quantity = foundItem.quantity + quantityUpdate;
        products = products.filter((p) => p.quantity !== 0);
        console.log(products);
        console.log(cartValue);
        cartValue.cartItems = products;
        const cartValueReturn = await Cart.findOneAndUpdate(query, cartValue, {
          new: true,
        });
        res.send(cartValueReturn);
      } else {
        console.log("productpresentnot");
        const updateCartValue = await Cart.updateOne(query, {
          $push: { cartItems: req.body.newProduct },
        });
        res.send(updateCartValue);
      }
    } else {
      console.log("checkfailed");
      let cart = new Cart(req.body);
      await cart.save();
      res.send(cart);
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).send("server error");
    process.exit(1);
  }
});

module.exports = router;
