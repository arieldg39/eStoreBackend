var express = require('express');
var router = express.Router();
const ventasController = require('../controllers/VantasController');
const tokenValidate = require('../middlewares/tokenValidate');

router.post("/register", tokenValidate.VerificarJwt, ventasController.registerVentas);

module.exports = router;
