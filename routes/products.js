var express = require('express');
var router = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //console.log('file', file);
        cb(null, './imagenes/avatar')  //acá define el destino donde voy a guardar las imagenes
    },
    filename: function (req, file, cb) {
       // console.log('file', file);
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const productsController = require('../controllers/productsController');

router.get("/all", productsController.productsGetAll);
router.get("/list", productsController.productsList);
router.post('/search', productsController.productsSearchDescribe);
router.get('/:id', productsController.getProductById);
router.delete('/:id', productsController.deleteProductById);

module.exports = router;

