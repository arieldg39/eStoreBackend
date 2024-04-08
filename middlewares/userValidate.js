const jwt = require('jsonwebtoken');

const userValidate = {}

userValidate.ValidarDatos = (req, res, next) => {
    const {username, password} = req.body;
    if (!username || !password){
        return res.status(400).json({ message: "Ingresar los datos solicitados, para poder Realizar Login!!!", tipoerror: "errorDatos" });
    } 
    next();
};

userValidate.ValidarUserName = async(req, res, next) =>{
    try {
        const {username} = req.body;
        //console.log(usuario);
        //Valida que el usuario no se en la tabla usuario
        req.getConnection((erorSlq, conm)=>{
            conm.query ('select * from usuarios where usuario=?',[username],(err, user)=>{
                if(err){
                    //en caso que exista un error va a mandar al navegador
                        res.json(err);
                        res.json ("ERROR EN SQL"); 
                }
                //Valida si encuentra el usuario
                //console.log(user[0])
                if(user[0]){                         
                    next();
                }else{
                    res.status(400).json({ message: "El usuario no se encuentra registrado, favor de realizar el registro!!!", tipoerror: "NoRegistra" });
                }
            });
        });      
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
//----------------------------------------------------------------

module.exports = userValidate;