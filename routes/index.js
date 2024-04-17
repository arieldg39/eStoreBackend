var express = require('express');
var router = express.Router();
const userRouter = require('./users');
const userProducts = require('./products');
const userVentas = require('./userVentas');
const orders = require('./orders');


router.use("/auth", userRouter);
router.use("/products", userProducts);
router.use("/ventas", userVentas);
router.use("/orders", orders);

module.exports = router;
