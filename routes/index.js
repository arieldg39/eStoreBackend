var express = require('express');
var router = express.Router();
const userRouter = require('./users');
const userProducts = require('./products');


router.use("/auth", userRouter);
router.use("/products", userProducts);

module.exports = router;
