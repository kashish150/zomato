const express = require("express");
const router = express.Router();
const Restaurent = require("../models/restaurent");
const auth = require("../middleware/restaurentauth");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

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
  try {
    let restaurent = new Restaurent(req.body);
    await restaurent.save();
    res.send(restaurent);
  } catch (err) {
    console.log(err.message);
    res.status(400).send("server error");
    process.exit(1);
  }
});

// router.post("/login", auth, async (req, res) => {

// });

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

router.post(
  "/newrestaurent",
  [
    check("restuarentName", "Name is required").not().isEmpty(),
    check("email", "please include a valid email").isEmail(),
    check("password", "please include a password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    const { restuarentName, email, password } = req.body;
    try {
      //   unique user check.
      let restaurent = await Restaurent.findOne({ email });
      if (restaurent) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Restaurent already exist" }] });
      }
      restaurent = new Restaurent({ restuarentName, email, password });
      const salt = await bcrypt.genSalt(10);
      restaurent.password = await bcrypt.hash(password, salt);
      // user details save
      await restaurent.save();
      const payload = {
        restaurent: {
          id: restaurent._id,
        },
      };
      jwt.sign(
        payload,
        // get jwt token from config
        config.get("jwtSecret"),
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) {
            console.log("check function 5");
            throw err;
          }
          console.log(token);
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
      process.exit(1);
    }
  }
);

router.post(
  "/login",
  [
    check("email", "please include a valid email").isEmail(),
    check("password", "please include a password").exists(),
  ],
  async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    try {
      let restaurent = await Restaurent.findOne({ email });
      console.log(restaurent);
      if (!restaurent) {
        return res
          .status(400)
          .json({ errors: [{ msg: "restaurent not exist" }] });
      }
      console.log("check2");
      console.log(restaurent);
      const isMatch = await bcrypt.compare(password, restaurent.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }
      console.log(restaurent);
      const payload = {
        restaurent: {
          id: restaurent.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;

          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
      process.exit(1);
    }
  }
);

module.exports = router;
