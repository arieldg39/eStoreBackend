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
   
  const upload = multer({ storage: storage })  

  const UserController = require('../controllers/userController');
  const userValidate = require('../middlewares/userValidate');

  router.post('/login', userValidate.ValidarDatos, userValidate.ValidarUserName , UserController.login);//usuardo login

module.exports = router;
