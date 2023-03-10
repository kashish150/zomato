const express = require("express");
const router = express.Router();
const Product = require("../models/product");

//@route get api/ADDRESS

const config = require("config");

router.get("/testingProductAPIs", (req, res) => {
  res.send("ADDRESS USER Running api ");
});

// get all addresses for a specific user

router.get("/getAllProducts", async (req, res) => {
  try {
    // this id should be unique userid
    const address = await AddressItems.find({ user: req.body._id });
    res.send(address);
  } catch (err) {
    console.log(err);
    res.status(400).send("server error");
  }
});

// adding a address

router.post("/addProducts", async (req, res) => {
  console.log(req.body);
  try {
    let products = new Product(req.body);
    await products.save();
    res.send(products);
  } catch (err) {
    console.log(err.message);
    res.status(400).send("server error");
    process.exit(1);
  }
});

// deleting a specific address

router.delete("/deleteProducts", async (req, res) => {
  try {
    const products = await Product.findById(req.body._id);
    if (!products) return res.status(404).send("Post not found");
    await products.remove();
    res.send({ msg: "Address removed" });
  } catch (err) {
    if (err.kind === "ObjectId") return res.status(404).send("Not valid Post");
    console.log(err);
    res.status(500).send(err);
  }
});

router.put("/updateProducts/:id", async (req, res) => {
  try {
    const productId = req.params["id"];
    const update = req.body;
    const query = { _id: productId };
    const productValue = await Product.findOneAndUpdate(query, update);
    console.log("addressvalue" + productValue);
    res.status(200).json({
      success: true,
      message: "PRODUCT has been updated successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

module.exports = router;
