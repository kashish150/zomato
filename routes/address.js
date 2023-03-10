const express = require("express");
const router = express.Router();
const AddressItems = require("../models/addresses");

//@route get api/ADDRESS

const config = require("config");

router.get("/testingAddressAPI", (req, res) => {
  res.send("ADDRESS USER Running api ");
});

// get all addresses for a specific user

router.get("/getAllAddress", async (req, res) => {
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

router.post("/addAddress", async (req, res) => {
  console.log(req.body);
  //   const user = req.body._id;
  //   const addresses = req.body.addresses;
  try {
    let addressArray = new AddressItems(req.body);
    await addressArray.save();
    res.send(addressArray);
  } catch (err) {
    console.log(err.message);
    res.status(400).send("server error");
    process.exit(1);
  }
});

// deleting a specific address

router.delete("/delete", async (req, res) => {
  try {
    const address = await AddressItems.findById(req.body._id);
    if (!address) return res.status(404).send("Post not found");
    await address.remove();
    res.send({ msg: "Address removed" });
  } catch (err) {
    if (err.kind === "ObjectId") return res.status(404).send("Not valid Post");
    console.log(err);
    res.status(500).send(err);
  }
});

router.put("/updateAddress/:id", async (req, res) => {
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
