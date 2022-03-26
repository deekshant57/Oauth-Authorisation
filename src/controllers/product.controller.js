const express = require("express");

const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const Product = require("../models/product.model");
const authorise = require("../middlewares/authorise");

router.post(
  "",
  authenticate,
  authorise(["seller", "admin"]),
  async (req, res) => {
    req.body.user_id = req.userID;
    // console.log(req.userID);
    try {
      const product = await Product.create(req.body);
      return res.status(200).send(product);
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  }
);

router.patch(
  "/:id",
  authenticate,
  authorise(["seller", "admin"]),
  async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return res.status(200).send(product);
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  }
);

router.get("", async (req, res) => {
  try {
    const product = await Product.find();
    return res.status(200).send(product);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

module.exports = router;
