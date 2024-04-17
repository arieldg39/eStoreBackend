var express = require('express');
const ordersController = require('../controllers/OrdersController');
const tokenValidate = require('../middlewares/tokenValidate');
var router = express.Router();

router.post('/getState',tokenValidate.VerificarJwt,  ordersController.ordersState);


module.exports = router;