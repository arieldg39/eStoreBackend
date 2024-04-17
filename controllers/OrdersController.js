const ordersController = {};

ordersController.ordersState = async(req, res)=>{
    //const {idusuario} = req.userId    
    try {
        req.getConnection((err, conm)=> {    
        //conm es la conexion y utiliza el metodo query para enviar la consulta
        conm.query ("select count(*) as Pedidos from pedidos  where  estado<>'3' and idusuario=?",[ req.userId],(err, orders)=>{ 
            if(err){
                //en caso que exista un error va a mandar al navegador
                    res.json(err);
                    res.json ("ERROR EN SQL"); 
                    console.log("error SQL->" + err)
            } 
            //Validamos si la clave es correcta
            if(orders)
            {
                return res.status(200).json({ message: "Ok", dataState: orders[0].Pedidos});
            }
                
            });        
        });        
    } catch (error) {
        return res.status(400).json({ message: "error ejecutar SQL-Login" + error , coderror: "ErrorSQL"});
    }
};

module.exports = ordersController