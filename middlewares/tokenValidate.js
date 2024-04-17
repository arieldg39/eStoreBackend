const jwt = require('jsonwebtoken');
const { use } = require('../routes/users');
require("dotenv").config();

const tokenValidate = {};

tokenValidate.VerificarJwt = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        //console.log("Token "+ JSON.stringify(token));
        if (!token) return res.status(401).json({ message: "Token no encontrado, usuario no autorizado", tipoerror: "error", tipoerror: "tokenno" });
        const { user } = jwt.verify(token, `process.env.SECRET_WORD`);        
        req.userId = user.id;
        next();
    } catch (error) {
        if (!token) return res.status(401).json({ message: "Token expirado, por favor logearse nuevamente", icon: "error", tipoerror: "tokenexp" });
    }
};

module.exports = tokenValidate;