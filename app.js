const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const productRouters = require("./api/routes/products");

const orderRouters = require("./api/routes/orders");

mongoose.connect(
  "mongodb+srv://mitchellemukamig:" +
    process.env.MONGO_ATLAS_PW +
    "@cluster0.5derd4j.mongodb.net/?retryWrites=true&w=majority"
);
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

//Routes which handle request
app.use("/products", productRouters);
app.use("/orders", orderRouters);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status(404);
  next(error);
});
app.use((error, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: { message: error.message },
  });
});

module.exports = app;
