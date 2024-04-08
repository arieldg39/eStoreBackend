const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
require("dotenv").config();


const UserController={};

UserController.login = async (req, res) => {
    const {username , password } = req.body;
    let loginSuccess ;        
    try {
        req.getConnection((err, conm)=> {    
        //conm es la conexion y utiliza el metodo query para enviar la consulta
        conm.query ("select idusuario, nombre ,usuario, acceso, avatar, clave from usuarios where usuario=?",[username],(err, user)=>{ 
            if(err){
                //en caso que exista un error va a mandar al navegador
                    res.json(err);
                    res.json ("ERROR EN SQL"); 
                    console.log("error SQL->" + err)
            } 
            //Validamos si la clave es correcta
            console.log(user[0].clave);
            loginSuccess = bcryptjs.compareSync(password,user[0].clave);
            //console.log(loginSuccess);
            if(loginSuccess){
                try {
                    //path completo de la img del usuaro
                    const avatarImg = process.env.PATH_AVATAR+user[0].avatar;
                    //Si encuentra el usuario     
                    const userLogged = {
                        "idusuario": user[0].idusuario,
                        "nombre": user[0].nombre,
                        "usuario": user[0].usuario,
                        "tipouser": user[0].acceso,                        
                        "avatar": avatarImg
                    }             
                    const payload = {
                        user: {
                            id: user[0].idusuario,                            
                        }
                    }
                    jwt.sign(payload, `process.env.SECRET_WORD`, { expiresIn: '1h' }, (error, token) => {
                        if (error) {
                            throw (error);
                        }
                        return res.status(200).json({ message: "Usuario Logeado", icon: "success", dataUser: userLogged, token });
                    });                
                } catch (error) {
                    return res.status(400).json({ message: "error " + error +" - " +`process.env.SECRET_WORD`});
                }
                //return res.status(200).json({ message: "OK", dataUser: userLogged});
            }else{
                res.status(401).json({ icono: 'error', message: 'Los Datos ingresados son incorrectos, favor de verificar!!!', tipoerror:'maldatos'});
            }
                
            });        
        });        
    } catch (error) {
        return res.status(400).json({ message: "error ejecutar SQL-Login" + error , coderror: "ErrorSQL"});
    }
};

module.exports = UserController;