const express = require("express");
const router = express.Router();
const Restaurent = require("../models/restaurent");

//@route get api/ADDRESS

const config = require("config");

router.get("/testingProductAPIs", (req, res) => {
  res.send("RESTAURENT USER Running api ");
});

// get all addresses for a specific user

router.get("/getAllRestaurent", async (req, res) => {
  try {
    // this id should be unique userid
    const restaurent = await Restaurent.find({});
    res.send(restaurent);
  } catch (err) {
    console.log(err);
    res.status(400).send("server error");
  }
});

// adding a address

router.post("/addRestaurent", async (req, res) => {
  console.log(req.body);
  //   const user = req.body._id;
  //   const addresses = req.body.addresses;
  try {
    const cartValue = await Product.findOneAndUpdate(query, update);
    let restaurent = new Restaurent(req.body);
    await restaurent.save();
    res.send(restaurent);
  } catch (err) {
    console.log(err.message);
    res.status(400).send("server error");
    process.exit(1);
  }
});

// deleting a specific address

router.delete("/deleteProducts", async (req, res) => {
  try {
    const restaurent = await Restaurent.findById(req.body._id);
    if (!restaurent) return res.status(404).send("Restaurent not found");
    await restaurent.remove();
    res.send({ msg: "Restaurent removed" });
  } catch (err) {
    if (err.kind === "ObjectId")
      return res.status(404).send("Not valid Restaurent");
    console.log(err);
    res.status(500).send(err);
  }
});

router.put("/updateProducts/:id", async (req, res) => {
  try {
    const addressId = req.params["id"];
    const update = req.body;
    console.log(addressId);
    console.log(update);
    const query = { _id: addressId };
    console.log(query);
    console.log("check1");
    const addressvalue = await AddressItems.findOneAndUpdate(query, update);
    console.log("addressvalue" + addressvalue);
    res.status(200).json({
      success: true,
      message: "Address has been updated successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

module.exports = router;
