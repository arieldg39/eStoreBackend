const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
require("dotenv").config();

const productsController={};

productsController.productsGetAll =async (req, res) => {
    try {
        req.getConnection((err, conm)=> {    
        //conm es la conexion y utiliza el metodo query para enviar la consulta
        conm.query ("select tbart.idarticulo, tbart.articulo, tbma.descripcion as marca, tbart.preciocosto, tbart.precioventa1,tbart.porcentaje, tbart.stock, tbart.stockminimo, tbart.imagen from articulos as tbart, marca as tbma where tbart.idmarca = tbma.codmarca limit 200",(err, produ)=>{ 
            if(err){
                //en caso que exista un error va a mandar al navegador
                    res.json(err);
                    res.json ("ERROR EN SQL"); 
                    console.log("error SQL->" + err)
            } 
            //Validamos si la clave es correcta
            if(produ)
            {
                return res.status(200).json({ message: "Ok", icon: "success", dataProducts: produ});
            }
                
            });        
        });        
    } catch (error) {
        return res.status(400).json({ message: "error ejecutar SQL-Login" + error , coderror: "ErrorSQL"});
    }
}

productsController.productsList =async (req, res) => {
    try {
        req.getConnection((err, conm)=> {    
        //conm es la conexion y utiliza el metodo query para enviar la consulta
        conm.query ("select tbart.idarticulo, tbart.articulo, tbma.descripcion as marca, tbart.preciocosto, tbart.precioventa1,tbart.porcentaje, tbart.stock, tbart.stockminimo, tbart.imagen from articulos as tbart, marca as tbma where tbart.idmarca = tbma.codmarca limit 50",(err, produ)=>{ 
            if(err){
                //en caso que exista un error va a mandar al navegador
                    res.json(err);
                    res.json ("ERROR EN SQL"); 
                    console.log("error SQL->" + err)
            } 
            //Validamos si la clave es correcta
            if(produ)
            {                
                return res.status(200).json({ message: "Ok", icon: "success", dataProducts: produ});
            }
                
            });        
        });        
    } catch (error) {
        return res.status(400).json({ message: "error ejecutar SQL-Login" + error , coderror: "ErrorSQL"});
    }
}

module.exports = productsController;