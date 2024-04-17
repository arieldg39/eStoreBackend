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
productsController.getProductById = async (req, res) => {
    try {
        const { id } = req.params; // Obtiene el idarticulo de los parámetros de la solicitud
        req.getConnection((err, conm) => {

            if (err) {
                return res.status(500).json({ message: "Error en la conexión a la base de datos" });
            }

            conm.query("SELECT tbart.idarticulo, tbart.articulo, tbma.descripcion as marca, tbart.preciocosto, tbart.precioventa1, tbart.porcentaje, tbart.stock, tbart.stockminimo, tbart.imagen FROM articulos as tbart, marca as tbma WHERE tbart.idmarca = tbma.codmarca AND tbart.idarticulo = ?", [id], (err, produ) => {
                if (err) {
                    console.log("Error SQL:", err);
                    return res.status(500).json({ message: "Error al ejecutar la consulta SQL" });
                }

                if (produ.length === 0) {
                    return res.status(404).json({ message: "No se encontró el artículo con el idarticulo proporcionado" });
                }

                const product = produ[0]; // Tomar el primer resultado ya que debería haber solo un artículo con ese id
                if(produ)
                {                
                    return res.status(200).json({ message: "Ok", icon: "success", dataProducts: produ});
                }
                /* return res.status(200).json({ message: "Ok", dataProduct: product }); */
            });
        });
    } catch (error) {
        console.error("Error en getProductById:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};
productsController.deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;

        req.getConnection((err, conm) => {
        if (err) {
            return res.status(500).json({ message: "Error en la conexión a la base de datos" });
        }

        // Elimina los registros relacionados en la tabla `detalles` antes de eliminar el artículo
        conm.query("DELETE FROM detalles WHERE idarticulo = ?", [id], (err, detalles) => {
            if (err) {
            console.log("Error SQL:", err);
            return res.status(500).json({ message: "Error al eliminar los detalles relacionados" });
            }

            // Elimina el artículo de la tabla `articulos`
            conm.query("DELETE FROM articulos WHERE idarticulo = ?", [id], (err, articulos) => {
            if (err) {
                console.log("Error SQL:", err);
                return res.status(500).json({ message: "Error al eliminar el artículo" });
            }

            return res.status(200).json({ message: "Artículo eliminado exitosamente" });
            });
        });
        });
    } catch (error) {
        console.error("Error en deleteProductById:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};
productsController.productsSearchDescribe =async (req, res) => {
    let {Buscar} = req.body; 
    Buscar=Buscar+"%";
    console.log(Buscar);
    try {
        req.getConnection((err, conm)=> {    
        //conm es la conexion y utiliza el metodo query para enviar la consulta
        conm.query ("select tbart.idarticulo, tbart.articulo, tbma.descripcion as marca, tbart.preciocosto, tbart.precioventa1,tbart.porcentaje, tbart.stock, tbart.stockminimo, tbart.imagen from articulos as tbart, marca as tbma where tbart.idmarca = tbma.codmarca and tbart.articulo like ? limit 200",[Buscar],(err, produ)=>{ 
            if(err){
                //en caso que exista un error va a mandar al navegador
                    res.json(err);
                    res.json ("ERROR EN SQL"); 
                    console.log("error SQL->" + err)
            }             
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