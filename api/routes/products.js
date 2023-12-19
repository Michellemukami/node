const express = require("express");
const router = express.Router();
const Product = require("../models/products");
const mongoose = require("mongoose");
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET request to /products",
  });
});
router.post("/", (req, res, next) => {
  // const product = {
  //   name: req.body.name,
  //   price: req.body.price,
  // };
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
  res.status(200).json({
    message: "Handling POST request to /products",
    createdProduct: product,
  });
});
router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  if (id === "special") {
    res.status(200).json({ message: "You have found special ID", id: id });
  } else {
    res.status(200).json({
      message: "You passed an ID",
    });
  }
});
router.patch("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "updated product",
  });
});
router.delete("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "deleted product",
  });
});
module.exports = router;
