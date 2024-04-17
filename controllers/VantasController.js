const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
require("dotenv").config();
const ventasController = {};

ventasController.registerVentas = async(req, res) => {
    const { cart, total } = req.body;   

    const currentDate= new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
    const time = currentDate.toLocaleTimeString();  
    let idpedido;  

    let sql="insert into pedidos (idusuario, fecha, hora, total,estado) values ('"+req.userId+"', '"+year+"-"+month+"-"+day+"','"+time+"','"+total+"','1')";
    console.log(sql);
    
    //return res.status(201).json({ message: 'Usuario registrado exitosamente'});
     try {
        req.getConnection((err, conm) => {
            if (err) {
                log(err)
                return res.status(500).json({ message: 'Error en la conexión a la base de datos' });    
            }
            conm.query(sql, (err, result) => { //Tabla pedidos
                if (err) {
                    return res.status(500).json({ message: 'Error al insertar el usuario en la base de datos', err });
                }
                //return res.status(201).json({ message: 'Usuario registrado exitosamente', usuario});
                //-----------------------------------------------------------------
                sql="select Max(id)as Id from pedidos";
                req.getConnection((err, conm) => {
                    if (err) {
                        log(err)
                        return res.status(500).json({ message: 'Error en la conexión a la base de datos' });    
                    }
                    conm.query(sql, (err, result) => {
                        if (err) {
                            return res.status(500).json({ message: 'Error al insertar el usuario en la base de datos', err });
                        }
                        if(result) {
                            //-----------------------------------------------------------------
                            console.log("Id Max "+result[0].Id);
                            let grabo=true;
                            let id=result[0].Id;
                            req.getConnection((err, conm) => {
                                if (err) {
                                    log(err)
                                    return res.status(500).json({ message: 'Error en la conexión a la base de datos' });    
                                }
                                for (let i = 0; i < cart.length; i++) {
                                    const element = cart[i];
                                    sql="insert into pedidos_detalle (idventa, idarticulo, descuento, cantidad, subtotal) values ("+id+", "+element.id+", '0','"+element.qty+"','"+element.subTotal+"')";
                                    console.log(sql);
                                    conm.query(sql, (err, result) => {
                                        if (err) {
                                            return res.status(500).json({ message: 'Error al insertar el usuario en la base de datos', err });
                                        }
                                        if(!result) {
                                            grabo=false;
                                            throw(err);
                                        }                     
                                    }); 
                                }                          
                                if(grabo) return res.status(201).json({ message: 'okpedido'});  
                            });
                        }                     
                    }); 
                });
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error interno del servidor', error });
    }  
};

module.exports = ventasController;